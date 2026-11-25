# Components: data-attribute API

Contents: page attributes, palace, flash, quiz, run, todo, teach, rev, recap, revise/review, visuals specs, registry.

All behaviour comes from `assets/site/app.js` (loaded with `defer`) and `assets/site/visuals.js` (loaded by app.js on day pages). Pages need only markup.

## Page attributes
`<body data-day="d7" data-date="2026-11-23">`. `data-day` is `d` plus the day number; `data-date` is ISO. The script adds the HUD, the focus timer, the pre-study check (before `.legend`), the "Revise earlier days" section (after the first `.recap`), and rewrites the bottom nav from the track page.

## Memory palace
`<div class="box ana" data-palace data-e="🚪,👟,🛋️,🍛,🎡"><b>Title</b><ol><li>...</li></ol></div>`. The list is hidden and replaced by a stepper with a big emoji, Back/Next buttons, and a textarea for the learner's own image (saved in the browser). Emoji count equals the number of list items.

## Flip cards
`<div data-flash>` containing direct children `div.box.why` with `<b>Question</b><br>Answer`. Each becomes a card with Got it and Missed buttons; ratings feed the spaced-review boxes. Card ids are `dN:fI` by order.

## Quiz
`<div class="quiz" data-q='[{"q":"...","o":["A","B","C","D"],"a":1,"e":"explanation"}]'></div>`. `a` is the index of the correct option. Avoid apostrophes inside the JSON (use typographic ones). Card ids are `dN:qI` by order.

## Runnable code
`<div data-run><script type="text/plain" class="starter">...</script><script type="text/plain" class="tests">...</script></div>`. Python runs in the browser (Pyodide, loaded on first use). The tests are assert lines; on success the page prints a pass line and awards XP.

## To-do list
`<ul class="todo" data-todo style="list-style:none;padding-left:0"><li>Step (20 min)</li>...</ul>`. Each tick gives XP; finishing all gives a bonus.

## Teach box
`<div data-teach data-prompt="Explain to someone ..."></div>`.

## Revision tracker
`<div data-rev></div>` renders +1, +3, +7, +21 day checkboxes from `data-date`.

## Recap pages
`<div data-recap data-from="2026-11-17" data-to="2026-11-20" data-n="8"></div>` builds a mixed quiz and flip cards from all days whose date falls in the range. The page must also load `assets/days.js` first. Used on Saturdays (Mon to Fri) and on the month recap page.

## Review page
`<div data-review></div>` on its own page; serves up to 20 due cards and shows the Leitner box counts.

## Visuals spec (visuals.js)
`SP[dayId]` is a list of specs. Each has `at` (a heading prefix such as `'4 ·'`; the figure is inserted before the next heading) or `top:1` (insert right after that heading), plus a type:
- `flow`: `s:[[title, sub], ...]`, optional `loop`. Vertical numbered steps with a Play animation.
- `chips`: `rows:[{l:label, i:[[text, id?], ...]}]`. Token or item chips.
- `cmp`: `cols:[{h:header, s:[[title, sub], ...]}]`. Side-by-side step columns.
- `seg`: `s:[[label, value text, weight, 'c1'..'c5']]`. Proportional bar with legend.
- `bars`: `rows:[[label, value, 'k'|'d']]` or `cols:[{h, rows}]`, optional `max`, `unit`. 'k' kept (green), 'd' dropped (grey).
- `tbars`: `logits`, `labels`, `T:[...]`. Softmax bars at several temperatures.
- `lanes`: `rows:[[[title, sub], ...], ...]`. Boxes in rows with arrows down.
- `patches`: `r`, `c`. A coloured grid turning into tokens.
All figures are SVG, 420 wide, shown at up to 483px.

## Registry
`assets/days.js` holds `window.DAYS=[{id,n,title,url,date,cards:{q,f}}]`. `cards` counts the quiz questions and flip cards on that day; keep it in sync with the page.
