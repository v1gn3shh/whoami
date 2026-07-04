// ---------------------------------------------------------
// Edit everything in this file with your real info/links.
// This is the only file you should need to touch for content.
// ---------------------------------------------------------

const PROJECTS = [
  {
    file: "tech-guess.game",
    desc: "Real-time multiplayer tech-term guessing game with live scoring.",
    tags: ["Firebase RTDB", "JavaScript"],
    link: "https://v1gn3shh.github.io/tech-guess/"
  },
  {
    file: "local-ai-stack.sh",
    desc: "Full local coding assistant on a CPU-only laptop — Ollama + Qwen2.5-Coder, wired into VS Code via Codex CLI and Continue.dev.",
    tags: ["Ollama", "Qwen2.5", "VS Code"],
    link: "#"
  },
  {
    file: "birthday-card.html",
    desc: "Interactive animated birthday page — Spotify-style music player, animated petals, 3D cake.",
    tags: ["CSS 3D", "Web Audio"],
    link: "https://github.com/v1gn3shh/a16"
  },
  {
    file: "mindease/",
    desc: "AI wellbeing companion for students — full design-thinking process, see the case study below.",
    tags: ["AI Capstone", "SDG 3"],
    link: "#mindease-block"
  }
];

// Case study content for the MindEase section
const MINDEASE = {
  title: "MindEase — an AI-powered student wellbeing companion",
  sections: [
    {
      h: "problem",
      body: `Grade 11 students under academic and social pressure, with few
      low-friction ways to check in on their own wellbeing. Framed around SDG 3
      (Good Health & Wellbeing) for the school AI Capstone.`
    },
    {
      h: "research",
      body: `Ran a real survey of 11 peers rather than relying on assumptions.
      Average self-reported stress came out to 4.0 out of 5, and exams were
      cited as the cause by 91% of respondents (10 of 11) — sleep issues were
      the only other cause mentioned. Respondents were split almost evenly on
      self-awareness: some notice stress building before it peaks, most only
      recognize it afterward or aren't sure. Just over half hadn't talked to
      anyone about academic stress at all.`
    },
    {
      h: "validation",
      body: `82% of respondents (9 of 11) said they would use or might use an
      app that checks in on their stress — only 2 said no. Built an empathy
      map from these responses to separate what students said from what they
      actually needed, which surfaced a clear signal: students wanted
      something private and low-effort, not another app demanding daily
      logging.`
    },
    {
      h: "design",
      body: `Used the Design Thinking framework end to end: define, ideate,
      prototype. Produced app mockups and a full written deliverable, with
      the build decisions coming directly out of the survey data rather than
      assumptions about what students "should" want.`
    },
    {
      h: "what I'd change",
      body: `The sample is small (11 responses) and self-selected from one
      friend group, so I'd want a larger, more varied sample before trusting
      the numbers too far. I'd also user-test the mockups directly with
      students before finalizing flows, and instrument the eventual app to
      see which check-in format actually gets used, not just which one
      tests well on paper.`
    }
  ]
};

// ---------------------------------------------------------
// CHAT KNOWLEDGE BASE (static fallback — works with zero backend)
// Add {keywords: [...], answer: "..."} pairs. First match wins.
// To upgrade to a real LLM later, see the note at the bottom of script.js
// ---------------------------------------------------------
const CHAT_KB = [
  {
    keywords: ["mindease", "wellbeing", "sdg"],
    answer: "MindEase is Vignesh's AI Capstone — a wellbeing companion for students. It's built on a real 11-person peer survey (91% cited exams as their top stress cause, 82% said they'd use a check-in app) plus an empathy map, not just assumptions. Scroll up to the case study for the full breakdown."
  },
  {
    keywords: ["local", "ollama", "llm", "qwen"],
    answer: "Vignesh runs a full local AI coding setup on a CPU-only Windows laptop — Ollama serving Qwen2.5-Coder, wired into VS Code through Codex CLI and Continue.dev. No cloud API needed for day-to-day coding."
  },
  {
    keywords: ["game", "multiplayer", "tech-guess"],
    answer: "tech-guess is a real-time multiplayer game where players race to guess tech terms, built on Firebase Realtime Database. Check the projects list above for the live link."
  },
  {
    keywords: ["who", "about", "you"],
    answer: "Vignesh is a Grade 11 student who builds real, working things — games, local AI tooling, and this site. He's currently prepping for university applications."
  },
  {
    keywords: ["contact", "email", "reach", "hire"],
    answer: "Best way to reach Vignesh is through the links in the footer of this page — add your real contact info in data.js."
  }
];

const FALLBACK_ANSWER = "I don't have an answer for that yet — try asking about MindEase, the local AI setup, or the tech-guess game.";
