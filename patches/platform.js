// Patch server-main.js platform detection: FreeBSD has no OS enum case, falls to
// OS=0 (Web), which prevents linux-x64 extension variants from installing
// (e.g. ms-python.debugpy). Treat FreeBSD as Linux for extension marketplace
// target platform resolution.
const fs = require('fs');
const f = '/usr/local/lib/node_modules/code-server/lib/vscode/out/server-main.js';
let s = fs.readFileSync(f, 'utf8');
// Use regex to match the minified variable name which changes across versions.
const orig = /(\w+=vs\.platform==="linux")(?!\|\|)/;
if (!orig.test(s)) { console.error('PATCH FAILED: target string not found in server-main.js'); process.exit(1); }
s = s.replace(orig, '$1||vs.platform==="freebsd"');
fs.writeFileSync(f, s);
console.log('Patched server-main.js: FreeBSD treated as Linux for extension platform detection');
