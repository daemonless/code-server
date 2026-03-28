// Patch vscode ptyHostMain.js: config dir switch has no FreeBSD case, throws
// "Platform not supported". Treat FreeBSD same as Linux (XDG_CONFIG_HOME).
// Uses regex to match the minified variable name which changes across versions.
const fs = require('fs');
const f = '/usr/local/lib/node_modules/code-server/lib/vscode/out/vs/platform/terminal/node/ptyHostMain.js';
let s = fs.readFileSync(f, 'utf8');
const orig = /(case"linux":\w+=process\.env\.XDG_CONFIG_HOME)/;
if (!orig.test(s)) { console.error('PATCH FAILED: target string not found in ptyHostMain.js'); process.exit(1); }
s = s.replace(orig, 'case"freebsd":$1');
fs.writeFileSync(f, s);
console.log('Patched ptyHostMain.js: FreeBSD treated as Linux for config dir');
