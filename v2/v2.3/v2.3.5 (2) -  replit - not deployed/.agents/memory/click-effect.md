---
name: Click effect system
description: How the global click burst ripple effect works in App.jsx and how to opt-in or suppress it
---

**How it works:** `ClickEffect` component in `App.jsx` listens to `pointerdown` on the document. On each event it walks up the DOM with `closest(CLICKABLE_SELECTOR)` to find a target, then appends a `.click-fx-burst` span sized to the element and removes it after 680ms. The target gets class `.click-fx-host` (which sets `overflow:hidden; position:relative`).

**Opt-in methods (either works):**
- Add `data-click-fx` attribute to any element
- Add `.click-fx` CSS class to any element

**Suppress:** Add `data-click-fx-ignore="true"` to the element itself (not a parent).

**Why ignore must be on the element:** `closest()` walks upward. If a child element (e.g. `.abv-chip` matching `[class*="-chip"]`) is clicked, it becomes the target BEFORE the parent is checked. Putting ignore on the parent doesn't stop the child match — the ignore attr must be on the chip/button itself.

**CLICK_IGNORE_SELECTOR** also always suppresses: `input`, `textarea`, `select`, `option`, `[contenteditable]`, `[data-ripple-managed]`.

**How to apply:** When adding click effects to a container whose children also match the selector (chips, badges inside a card), add `data-click-fx-ignore="true"` to each child element in JSX.
