#!/usr/bin/env python3
"""Check a Kwik-Brain day page for structure and correctness.

Usage: python check_day.py PAGE.html [--days-js assets/days.js] [--weekend]

Checks: page attributes, legend, two recap boxes with three points, why-ladder cards,
quiz JSON (4 questions, 4 options, valid answer index), memory palace emoji count,
SVG step diagram, revision tracker, teach box, runnable code (the solution in the page
is executed against the page's own tests), and the card counts in days.js.
Exit code 1 if any check fails.
"""
import argparse, html, json, re, sys

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("page")
    ap.add_argument("--days-js")
    ap.add_argument("--weekend", action="store_true", help="project day: coding question may be a project function")
    a = ap.parse_args()
    h = open(a.page, encoding="utf-8").read()
    bad, ok = [], []

    def need(cond, msg):
        (ok if cond else bad).append(msg)

    m = re.search(r'<body[^>]*data-day="(d\d+)"[^>]*data-date="(\d{4}-\d{2}-\d{2})"', h)
    need(bool(m), "body has data-day and data-date")
    day_id = m.group(1) if m else None
    need('class="legend"' in h, "colour legend present")
    recaps = re.findall(r'<div class="box key recap">(.*?)</div>', h, re.S)
    need(len(recaps) == 2, "two recap boxes (top and bottom), found %d" % len(recaps))
    for i, r in enumerate(recaps):
        need(len(re.findall(r"<li>", r)) == 3, "recap box %d has exactly 3 points" % (i + 1))

    fl = re.search(r'<div data-flash>(.*?)\n</div>\n', h, re.S)
    whys = re.findall(r'<div class="box why"><b>(.*?)</b><br>(.*?)</div>', fl.group(1), re.S) if fl else []
    need(4 <= len(whys) <= 5, "why-ladder has 4 to 5 flip cards, found %d" % len(whys))
    need('class="box warn"' in h, "pitfall box present")

    q = re.search(r"class=\"quiz\" data-q='(.*?)'></div>", h, re.S)
    nq = 0
    if q:
        try:
            Q = json.loads(html.unescape(q.group(1)))
            nq = len(Q)
            need(nq == 4, "quiz has exactly 4 questions, found %d" % nq)
            for i, x in enumerate(Q):
                need(len(x.get("o", [])) == 4 and 0 <= x.get("a", -1) < 4 and x.get("e") and x.get("q"),
                     "quiz question %d well formed" % (i + 1))
        except Exception as e:
            need(False, "quiz JSON valid (%s)" % e)
    else:
        need(False, "quiz present")

    pal = re.search(r'data-palace data-e="([^"]*)"[^>]*>(.*?)</div>', h, re.S)
    if pal:
        stops = len(re.findall(r"<li>", pal.group(2)))
        emojis = len([e for e in pal.group(1).split(",") if e])
        need(stops in (4, 5) and stops == emojis, "memory palace: %d stops, %d emojis (4 or 5, equal)" % (stops, emojis))
    else:
        need(False, "memory palace present")

    sv = re.search(r"<svg data-steps[^>]*>(.*?)</svg>", h, re.S)
    need(bool(sv) and len(re.findall(r"<rect", sv.group(1))) >= 4, "main SVG step diagram with at least 4 boxes")
    need("data-rev" in h, "revision tracker present")
    need("data-teach" in h, "teach-it box present")
    need("Tomorrow" in h, "'Tomorrow' line present")
    need("write what you remember" not in h.lower(), "no descriptive 'write what you remember' revision")

    st = re.search(r'class="starter">(.*?)</script>', h, re.S)
    ts = re.search(r'class="tests">(.*?)</script>', h, re.S)
    sol = re.search(r"Solution \+ explanation.*?<pre><code>(.*?)</code></pre>", h, re.S)
    if st and ts and sol:
        code = html.unescape(sol.group(1))
        pre = html.unescape(st.group(1))
        # keep helper definitions from the starter that the solution relies on
        helpers = re.sub(r"def (\w+)\([^)]*\):\n\s+pass\s*$", "", pre.strip(), flags=re.M)
        try:
            exec(compile(helpers + "\n" + code + "\n" + html.unescape(ts.group(1)), "page", "exec"), {})
            ok.append("solution passes the page's own tests")
        except Exception as e:
            bad.append("solution fails the page's tests: %r" % (e,))
        need("cost" in sol.group(1).lower() or "Cost" in h, "solution explanation mentions cost/complexity")
    else:
        need(False, "runnable coding question (starter, tests and a solution block)")

    if a.days_js and day_id:
        d = open(a.days_js, encoding="utf-8").read()
        e = re.search(r"\{id:'%s'[^}]*?cards:\{q:(\d+),f:(\d+)\}" % day_id, d)
        if e:
            need(int(e.group(1)) == nq and int(e.group(2)) == len(whys),
                 "days.js card counts match page (q=%s f=%s vs q=%d f=%d)" % (e.group(1), e.group(2), nq, len(whys)))
        else:
            bad.append("%s not registered in days.js with card counts (run register_day.py)" % day_id)

    for x in ok: print("  ok   ", x)
    for x in bad: print("  FAIL ", x)
    print("\n%d passed, %d failed" % (len(ok), len(bad)))
    sys.exit(1 if bad else 0)

if __name__ == "__main__":
    main()
