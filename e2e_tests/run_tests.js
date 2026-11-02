const path = require('path');
const { startServer } = require('./server');
const { createTestPage, closeBrowser } = require('./helpers');
const { tier1Tests } = require('./tier1_feature_tests');
const { tier2Tests } = require('./tier2_boundary_tests');
const { tier3Tests } = require('./tier3_pairwise_tests');
const { tier4Tests } = require('./tier4_scenario_tests');

// --- Watchdog Protection (Anti-Hang Watchdog Rule) ---
const WATCHDOG_TIMEOUT_MS = 300000; // 5 minutes total budget
const watchdog = setTimeout(() => {
  console.error('\n[WATCHDOG ERROR] Test execution exceeded max time budget (300s)! Forcing exit.');
  process.exit(1);
}, WATCHDOG_TIMEOUT_MS);
watchdog.unref();

async function runTestSuite() {
  console.log('================================================================================');
  console.log('   VIBE EVENT STUDIO — 4-TIER E2E TEST RUNNER (OPAQUE-BOX SUITE)');
  console.log('================================================================================');

  const args = process.argv.slice(2);
  const tierArg = args.find(a => a.startsWith('--tier='));
  const filterArg = args.find(a => a.startsWith('--filter='));

  const requestedTier = tierArg ? tierArg.split('=')[1] : null;
  const requestedFilter = filterArg ? filterArg.split('=')[1] : null;

  let allTests = [];
  if (!requestedTier || requestedTier === '1') allTests.push(...tier1Tests.map(t => ({ ...t, tier: 'Tier 1' })));
  if (!requestedTier || requestedTier === '2') allTests.push(...tier2Tests.map(t => ({ ...t, tier: 'Tier 2' })));
  if (!requestedTier || requestedTier === '3') allTests.push(...tier3Tests.map(t => ({ ...t, tier: 'Tier 3' })));
  if (!requestedTier || requestedTier === '4') allTests.push(...tier4Tests.map(t => ({ ...t, tier: 'Tier 4' })));

  if (requestedFilter) {
    allTests = allTests.filter(t => t.id.includes(requestedFilter) || t.name.toLowerCase().includes(requestedFilter.toLowerCase()));
  }

  console.log(`Discovered ${allTests.length} tests to execute across requested tiers.`);

  // 1. Start Local HTTP Server for F7 and web testing
  let serverInfo = null;
  try {
    serverInfo = await startServer(3000);
    console.log(`[INFO] Local HTTP server active at: ${serverInfo.url}`);
  } catch (err) {
    console.warn(`[WARN] Could not bind server on port 3000 (${err.message}). Retrying...`);
  }

  const results = [];
  const startTime = Date.now();

  // Create isolated page instance
  let testEnv = null;
  try {
    testEnv = await createTestPage(serverInfo ? serverInfo.url : null);
  } catch (err) {
    console.error('[FATAL] Failed to initialize Playwright browser page:', err);
    if (serverInfo) await serverInfo.close();
    process.exit(1);
  }

  const { page, consoleMessages, pageErrors, cleanup } = testEnv;
  const context = { serverUrl: serverInfo ? serverInfo.url : null };

  let passedCount = 0;
  let failedCount = 0;

  for (const test of allTests) {
    const tStart = Date.now();
    process.stdout.write(`  [${test.tier}] ${test.id} - ${test.name.slice(0, 55).padEnd(55, ' ')} ... `);

    try {
      // Clear console errors buffer before each test
      consoleMessages.length = 0;
      pageErrors.length = 0;

      // Ensure viewport and view mode are reset to standard desktop studio before each test
      await page.setViewportSize({ width: 1280, height: 800 });

      // Ensure any open modals are closed and view mode is split before test execution
      await page.evaluate(() => {
        ['modal-ticket', 'modal-attendees', 'modal-reset', 'modal-deploy', 'modal-ai-settings'].forEach(id => {
          if (typeof closeModal === 'function') closeModal(id);
        });
        if (typeof switchView === 'function') {
          switchView('split');
        }
        const tc = document.getElementById('toast-container');
        if (tc) tc.innerHTML = '';
      });

      await test.fn(page, { consoleMessages, pageErrors }, context);

      const duration = Date.now() - tStart;
      console.log(`\x1b[32mPASS\x1b[0m (${duration}ms)`);
      results.push({ id: test.id, name: test.name, tier: test.tier, status: 'PASS', duration });
      passedCount++;
    } catch (err) {
      const duration = Date.now() - tStart;
      console.log(`\x1b[31mFAIL\x1b[0m (${duration}ms)`);
      console.error(`      -> Error: ${err.message}`);
      results.push({ id: test.id, name: test.name, tier: test.tier, status: 'FAIL', duration, error: err.message });
      failedCount++;
    }
  }

  const totalTime = ((Date.now() - startTime) / 1000).toFixed(2);

  // Clean up
  try {
    await cleanup();
    await closeBrowser();
    if (serverInfo) await serverInfo.close();
  } catch (e) {
    // Ignore cleanup errors
  }

  // --- Print Summary Table ---
  console.log('\n================================================================================');
  console.log('                          E2E TEST EXECUTION SUMMARY                            ');
  console.log('================================================================================');

  const tierSummary = {};
  results.forEach(r => {
    if (!tierSummary[r.tier]) tierSummary[r.tier] = { total: 0, pass: 0, fail: 0 };
    tierSummary[r.tier].total++;
    if (r.status === 'PASS') tierSummary[r.tier].pass++;
    else tierSummary[r.tier].fail++;
  });

  console.log('Tier                     | Total | Passed | Failed | Pass Rate');
  console.log('-------------------------|-------|--------|--------|----------');
  for (const [tier, stat] of Object.entries(tierSummary)) {
    const rate = ((stat.pass / stat.total) * 100).toFixed(1) + '%';
    console.log(`${tier.padEnd(25)} | ${String(stat.total).padEnd(5)} | ${String(stat.pass).padEnd(6)} | ${String(stat.fail).padEnd(6)} | ${rate}`);
  }
  console.log('-------------------------|-------|--------|--------|----------');
  const overallRate = ((passedCount / results.length) * 100).toFixed(1) + '%';
  console.log(`OVERALL TOTAL            | ${String(results.length).padEnd(5)} | ${String(passedCount).padEnd(6)} | ${String(failedCount).padEnd(6)} | ${overallRate}`);
  console.log(`Total Duration: ${totalTime}s\n`);

  if (failedCount > 0) {
    console.log('FAILED TESTS DETAIL:');
    results.filter(r => r.status === 'FAIL').forEach(f => {
      console.log(`  [${f.id}] ${f.name}`);
      console.log(`     Error: ${f.error}`);
    });
    console.log('================================================================================');
    process.exit(1);
  } else {
    console.log('All test cases passed with zero errors!');
    console.log('================================================================================');
    process.exit(0);
  }
}

if (require.main === module) {
  runTestSuite().catch(err => {
    console.error('Unhandled test suite error:', err);
    process.exit(1);
  });
}

module.exports = { runTestSuite };
