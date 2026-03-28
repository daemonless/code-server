// Patch @vscode/deviceid: telemetry module throws on non-win32/darwin/linux platforms.
// index.js uses a !== chain; storage.js uses an if/else if chain — patch both.
const fs = require('fs');
const base = '/usr/local/lib/node_modules/code-server/lib/vscode/node_modules/@vscode/deviceid/dist/';
for (const name of ['index.js', 'storage.js']) {
  const f = base + name;
  if (!fs.existsSync(f)) continue;
  let s = fs.readFileSync(f, 'utf8');
  let p = s.replace(
    /process\.platform !== "linux"\)/g,
    'process.platform !== "linux" && process.platform !== "freebsd")'
  );
  p = p.replace(
    /else if \(process\.platform === "linux"\)/g,
    'else if (process.platform === "linux" || process.platform === "freebsd")'
  );
  if (p !== s) {
    fs.writeFileSync(f, p);
    console.log('Patched @vscode/deviceid/' + name + ': FreeBSD allowed');
  }
}
