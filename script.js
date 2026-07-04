// ---------- Boot sequence ----------
const BOOT_LINES = [
  "booting portfolio.sh ...",
  "loading profile: vignesh ..... ok",
  "mounting projects/ ..... ok",
  "starting ask-vignesh daemon ..... ok",
  ""
];

const bootLog = document.getElementById("boot-log");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function typeBoot(lines, onDone) {
  if (reduceMotion) {
    bootLog.textContent = lines.join("\n");
    onDone();
    return;
  }
  let i = 0;
  function next() {
    if (i >= lines.length) { onDone(); return; }
    const div = document.createElement("div");
    div.className = "line ok";
    div.textContent = lines[i];
    bootLog.appendChild(div);
    i++;
    setTimeout(next, 220);
  }
  next();
}

function revealBlocks() {
  const ids = ["bio-block", "projects-block", "mindease-block", "chat-block", "closing-line"];
  ids.forEach((id, idx) => {
    setTimeout(() => {
      document.getElementById(id).classList.remove("hidden");
    }, reduceMotion ? 0 : idx * 180);
  });
}

typeBoot(BOOT_LINES, revealBlocks);

// ---------- Render projects ----------
const grid = document.getElementById("project-grid");
PROJECTS.forEach(p => {
  const card = document.createElement("div");
  card.className = "project-card";
  card.innerHTML = `
    <p class="filename">${p.file}</p>
    <p class="desc">${p.desc}</p>
    <div class="tags">${p.tags.map(t => `<span class="tag">${t}</span>`).join("")}</div>
    <a href="${p.link}" target="${p.link.startsWith('#') ? '_self' : '_blank'}" rel="noopener">open →</a>
  `;
  grid.appendChild(card);
});

// ---------- Render MindEase case study ----------
const caseStudy = document.getElementById("case-study");
caseStudy.innerHTML = `
  <h2>${MINDEASE.title}</h2>
  ${MINDEASE.sections.map(s => `<h3>${s.h}</h3><p>${s.body}</p>`).join("")}
`;

// ---------- Chat ----------
const chatForm = document.getElementById("chat-form");
const chatInput = document.getElementById("chat-input");
const chatLog = document.getElementById("chat-log");
chatInput.placeholder = "ask something... (try 'help')";

addMessage("Hey — I'm a small assistant trained on Vignesh's actual projects. Ask me what he's built, what MindEase is, or how he set up local AI on his laptop.", "AI");

function addMessage(text, who) {
  const p = document.createElement("p");
  p.className = `chat-msg ${who === "you" ? "user" : "system"}`;
  p.innerHTML = `<span class="who">${who} &gt;</span><span class="msg-text"></span>`;
  chatLog.appendChild(p);
  const span = p.querySelector(".msg-text");

  if (reduceMotion || who === "you") {
    span.textContent = text;
    chatLog.scrollTop = chatLog.scrollHeight;
    return;
  }

  // Terminal-style character typing for AI responses
  let i = 0;
  function type() {
    if (i >= text.length) return;
    span.textContent += text[i];
    i++;
    chatLog.scrollTop = chatLog.scrollHeight;
    setTimeout(type, 12);
  }
  type();
}

function answerFromKB(question) {
  const q = question.toLowerCase();
  const hit = CHAT_KB.find(entry => entry.keywords.some(k => q.includes(k)));
  return hit ? hit.answer : FALLBACK_ANSWER;
}

// ---------- Easter eggs ----------
// Exact/trimmed matches, checked before the KB or worker. Add more anytime.
const EASTER_EGGS = {
  "whoami": "vignesh — grade 11, builder of things that mostly work on the first try (eventually).",
  "sudo hire me": "permission granted. scroll up for the receipts, then use the contact link in the footer.",
  "ls -la": "total 4\ndrwxr-xr-x  projects/\n-rw-r--r--  about.md\n-rw-------  .secrets  (nice try)",
  "rm -rf /": "this terminal has exactly one job and it isn't that. try 'whoami' instead.",
  "sudo make me a sandwich": "okay.",
  "help": "try: whoami · ls -la · sudo hire me · or just ask a real question about a project."
};

function checkEasterEgg(question) {
  const q = question.trim().toLowerCase();
  return EASTER_EGGS[q] || null;
}

chatForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const value = chatInput.value.trim();
  if (!value) return;
  addMessage(value, "you");
  chatInput.value = "";

  const egg = checkEasterEgg(value);
  if (egg) {
    setTimeout(() => addMessage(egg, "AI"), 300);
    return;
  }

  // ---------------------------------------------------------
  // WORKER_URL: set this once you deploy worker/worker.js (see
  // worker/README.md). Leave it as "" to stay on the local
  // knowledge-base fallback with zero backend.
  // ---------------------------------------------------------
  const WORKER_URL = "https://ask-vignesh.v1gn3shh.workers.dev";

  if (!WORKER_URL) {
    setTimeout(() => addMessage(answerFromKB(value), "AI"), 300);
    return;
  }

  fetch(WORKER_URL, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ question: value })
  })
    .then(r => r.json())
    .then(data => addMessage(data.answer || answerFromKB(value), "AI"))
    .catch(() => addMessage(answerFromKB(value), "AI")); // quiet fallback if the worker is down
});

// ---------- Focus management ----------
// Once everything's revealed, send focus to the chat input — the page
// ends in a live prompt, so that's the natural place for keyboard users
// (and it mirrors an actual shell waiting for input).
setTimeout(() => {
  chatInput.focus({ preventScroll: false });
}, reduceMotion ? 0 : 5 * 180 + 400);
