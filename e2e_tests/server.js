const http = require('http');
const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');
const DEFAULT_PORT = 3000;

function getContentType(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  switch (ext) {
    case '.html': return 'text/html; charset=utf-8';
    case '.js': return 'application/javascript; charset=utf-8';
    case '.css': return 'text/css; charset=utf-8';
    case '.json': return 'application/json; charset=utf-8';
    case '.png': return 'image/png';
    case '.jpg':
    case '.jpeg': return 'image/jpeg';
    case '.svg': return 'image/svg+xml';
    case '.ico': return 'image/x-icon';
    case '.csv': return 'text/csv; charset=utf-8';
    default: return 'application/octet-stream';
  }
}

function createServer() {
  return http.createServer((req, res) => {
    // Enable CORS for testing
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, HEAD, OPTIONS');

    if (req.method === 'OPTIONS') {
      res.writeHead(204);
      res.end();
      return;
    }

    const urlPath = req.url.split('?')[0].split('#')[0];
    let relativePath = urlPath === '/' ? 'index.html' : urlPath.replace(/^\/+/, '');
    const safePath = path.normalize(path.join(ROOT_DIR, relativePath));

    if (!safePath.startsWith(ROOT_DIR)) {
      res.writeHead(403, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('403 Forbidden');
      return;
    }

    fs.stat(safePath, (err, stats) => {
      if (err || !stats.isFile()) {
        res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end('404 Not Found');
        return;
      }

      res.writeHead(200, {
        'Content-Type': getContentType(safePath),
        'Content-Length': stats.size,
        'Cache-Control': 'no-cache, no-store, must-revalidate'
      });

      const readStream = fs.createReadStream(safePath);
      readStream.pipe(res);
    });
  });
}

function startServer(port = DEFAULT_PORT) {
  return new Promise((resolve, reject) => {
    const server = createServer();
    server.on('error', (err) => {
      if (err.code === 'EADDRINUSE') {
        // Try fallback port
        startServer(port + 1).then(resolve).catch(reject);
      } else {
        reject(err);
      }
    });

    server.listen(port, '127.0.0.1', () => {
      const actualPort = server.address().port;
      resolve({
        server,
        port: actualPort,
        url: `http://127.0.0.1:${actualPort}/index.html`,
        close: () => new Promise(cb => {
          if (typeof server.closeAllConnections === 'function') {
            server.closeAllConnections();
          }
          server.close(cb);
        })
      });
    });
  });
}

if (require.main === module) {
  const port = parseInt(process.argv[2], 10) || DEFAULT_PORT;
  startServer(port).then(info => {
    console.log(`Local HTTP Server running at ${info.url}`);
    console.log('Press Ctrl+C to stop.');
  }).catch(err => {
    console.error('Failed to start server:', err);
    process.exit(1);
  });
}

module.exports = { startServer, createServer };
