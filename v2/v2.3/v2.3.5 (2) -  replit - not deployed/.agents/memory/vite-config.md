---
name: Vite config quirks
description: Port must be 5000 for webview preview; motion-dom has a corrupted source map that breaks esbuild pre-bundling
---

**Port:** Always use port 5000 with `outputType: "webview"` in workflow config. The default Vite port (5173) does not work with Replit's preview pane.

**motion-dom source map bug:** The installed version of `motion-dom` (framer-motion dependency) ships a malformed `.js.map` file that esbuild chokes on during `optimizeDeps` pre-bundling. Fix:

```js
optimizeDeps: {
  esbuildOptions: { sourcemap: false }
},
build: { sourcemap: false }
```

**Why:** esbuild reads source maps inline during dep pre-bundling; the corrupted map triggers "Unterminated string literal" and crashes Vite startup before it can open the port.

**How to apply:** Keep both `optimizeDeps.esbuildOptions.sourcemap: false` and `build.sourcemap: false` in `vite.config.js` until framer-motion updates its bundled source maps.
