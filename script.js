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

function addMessage(text, who) {
  const p = document.createElement("p");
  p.className = `chat-msg ${who === "you" ? "user" : "system"}`;
  p.innerHTML = `<span class="who">${who} &gt;</span>${text}`;
  chatLog.appendChild(p);
  chatLog.scrollTop = chatLog.scrollHeight;
}

function answerFromKB(question) {
  const q = question.toLowerCase();
  const hit = CHAT_KB.find(entry => entry.keywords.some(k => q.includes(k)));
  return hit ? hit.answer : FALLBACK_ANSWER;
}

chatForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const value = chatInput.value.trim();
  if (!value) return;
  addMessage(value, "you");
  chatInput.value = "";

  // ---------------------------------------------------------
  // WORKER_URL: set this once you deploy worker/worker.js (see
  // worker/README.md). Leave it as "" to stay on the local
  // knowledge-base fallback with zero backend.
  // ---------------------------------------------------------
  const WORKER_URL = ""; // e.g. "https://ask-vignesh.<your-subdomain>.workers.dev"

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
