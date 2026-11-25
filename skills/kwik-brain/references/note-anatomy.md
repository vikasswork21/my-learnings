# Note anatomy: content and wording rules

Contents: header, recap boxes, gist, picture, analogies, definitions, demo, why ladder, hooks, try-it, coding question, quiz, outcome check, revision, tomorrow line.

## Header
- Tag line: `AI Engineer Prep · Day N of 100 · Tue 17 Nov 2026` (add `· Project day` on weekends).
- H1 is the topic. One muted line: unit number, what the note covers, and the day's practice-slot topic.
- Legend with five coloured chips: Definition, Key idea, Analogy, Why?, Pitfall.

## Top 3 box
A `div.box.key.recap` with an ordered list of exactly three points. These are what the weekly recap, the month recap and the review pull out later, so each point must stand alone. Repeat the same three (shortened) in the closing recap box.

## Warm-up (5 min)
One `box why` sentence telling the learner to close everything, redraw yesterday's picture and say yesterday's acronym, then peek. Struggling first is the point.

## The gist
One `box key` sentence with the central idea (use `mark` on two or three words). Under it, a two-column table: Capture (what it says) and Create (a blank prompt for the learner's own words or an example from their work).

## The picture to remember
Inline SVG with `data-steps`. 5 or 6 rounded boxes, each with a bold title and one small line, arrows between them as paths in one group, optional dashed loop arrow. Titles are verbs or nouns of the process, not sentences.

## Analogies
One or two `box ana` blocks. Use the learner's world (food, city, family trades, daily routines) so the picture is instant. State the mapping explicitly: what each part of the analogy stands for.

## Definitions
Grid of `box def` cards, six at most. Format: bold term, line break, one plain sentence. No jargon inside definitions unless it was defined earlier.

## Live demo (when numbers or behaviour matter)
A `div.demo` with sliders or buttons and an inline script that registers on `DOMContentLoaded` and calls `ML.award(key, 3, label)` on first use. Use made-up numbers and label them "illustrative".

## The "why?" ladder
Wrap four or five `box why` blocks in a `div[data-flash]`. Each block: bold question, `<br>`, the answer (two or three sentences). The script turns them into flip cards and cards for spaced review. Follow with one `box warn` listing pitfalls separated by middle dots.

## Memory hooks
- Acronym box (`box key`): the acronym, a silly sentence, and the expansion with the initials in bold.
- Memory palace (`box ana` with `data-palace` and `data-e` listing one emoji per stop): an ordered list, each stop = place + a vivid, silly image + the concept in italics. 4 to 5 stops, locations the learner can picture (home, study room, kitchen, metro, workshop, harbour). Make the images loud and emotional.

## Try it
A 15-minute hands-on task and a small blank table for results. It should expose the idea (for example, send the same prompt five times).

## Coding question
Order: heading, difficulty line (time and skills), task box, worked example in a `pre`, runnable block, hint, solution.
- Task box states inputs, outputs, edge cases and tie rules in one paragraph.
- Example block shows concrete inputs and outputs, including one edge case and one error case.
- Runnable block: `div[data-run]` with two `script type="text/plain"` children: `.starter` (stubs with `pass`) and `.tests` (assert statements with messages; a try/except for expected errors).
- Hint: a collapsed `details`, one or two sentences that point at the technique, not the answer.
- Solution: a collapsed `details` with the code, a numbered "How it works" list (validate, core idea, edge case, cost), and a `box why` about what a real system would do differently.
- HTML-escape `<`, `>`, `&` in displayed code (`&lt;`, `&gt;`, `&amp;`).
- Execute the solution against the tests before showing the page.

## Quiz
Exactly four questions, in the `data-q` JSON attribute. Mix recall and application. Wrong options must be plausible. Each has a one-line explanation `e`.

## Outcome check and teach box
Ask for a spoken two-sentence or 30-second explanation; put a model answer in a collapsed `details`. Add `div[data-teach data-prompt="..."]`.

## Revision and closing
`div[data-rev]` tracker, closing recap box, and a muted "Tomorrow (Day N+1): ..." line. Bottom nav `div.nav` with a previous link and a placeholder "Next day coming soon" span (the script rewrites it).

## Wording rules
- Plain words first, term second. Short sentences.
- Typographic quotes and apostrophes in visible text; straight quotes inside code and attributes.
- Numbers in examples are computed, not guessed.
- No explanation of the memory methods themselves.
- Weekend project days replace the coding question with the project's core function, and replace some sections with a build checklist (`ul[data-todo]`), repo layout and README template.
