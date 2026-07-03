# portfolio-ai

An interactive terminal-styled portfolio. Boots up, prints a bio, lists
projects like `ls`, and ends in a live `./ask-vignesh` chat prompt.

## Quick start

1. Edit `js/data.js` — that's the only file with content in it. Update
   projects, links, and the `CHAT_KB` answers.
2. Open `index.html` directly in a browser to preview, or use a local
   server (`python3 -m http.server`) to avoid any file:// quirks.
3. Push to GitHub, enable **Pages** in repo settings (branch: `main`,
   folder: `/root`), and you're live at `https://<username>.github.io/<repo>`.

## How the chat works right now

`CHAT_KB` in `js/data.js` is a simple keyword-matched Q&A list — no
backend, no API key, works immediately on GitHub Pages. It's honest
about what it is (a small assistant trained on real project data), not
pretending to be a general-purpose LLM.

## Upgrading to a real LLM (optional, see roadmap)

Never put an API key in this repo — it's public. Instead:

1. Deploy a tiny serverless function (Cloudflare Workers free tier is
   easiest) that holds the key and proxies requests to an LLM API.
2. Have it accept `{ question }`, prepend a system prompt built from
   `data.js`'s project list + MindEase writeup, and return `{ answer }`.
3. In `script.js`, replace the `answerFromKB()` call in the submit
   handler with a `fetch()` to your worker's URL.

## Roadmap (45 days)

- **Days 1–5** — this scaffold: design system, terminal shell, static
  content, responsive layout. ✅
- **Days 6–12** — wire up the real LLM backend (see above).
- **Days 13–19** — flesh out the MindEase case study with real
  screenshots from the mockups / empathy map.
- **Days 20–26** — add remaining projects (tech-guess, birthday page,
  local AI stack) with screenshots or short clips.
- **Days 27–33** — polish motion, add a couple of hidden terminal
  "easter egg" commands, accessibility pass (keyboard nav, contrast).
- **Days 34–40** — test on real devices, get feedback from friends and
  teachers, iterate on copy.
- **Days 41–45** — buffer, final deploy, write the short case-study
  summary for your university application.

## Accessibility notes already baked in

- Respects `prefers-reduced-motion` (boot sequence and blinking
  cursor disable themselves).
- All interactive elements have visible focus states.
- Chat log is `aria-live` friendly via semantic markup — extend as
  you add more dynamic content.
