// Terminal boot sequence
const lines = [
  { text: "$ dotnet run --project Portfolio.csproj", type: "cmd" },
  { text: "Restoring packages...", type: "muted" },
  { text: "Build succeeded.", type: "ok" },
  { text: "", type: "muted" },
  { text: "> Loading developer profile", type: "muted" },
  { text: "  name:  Shoaib Akhtar", type: "key" },
  { text: "  role:  Full Stack .NET Developer", type: "key" },
  { text: "  base:  Rawalpindi, Pakistan", type: "key" },
  { text: "  focus: ASP.NET Core MVC · C# · SQL Server", type: "key" },
  { text: "", type: "muted" },
  { text: "Now listening on https://portfolio.local", type: "ok" },
];

const body = document.getElementById("terminalBody");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function renderStatic() {
  body.innerHTML = "";
  lines.forEach(line => {
    const p = document.createElement("p");
    p.textContent = line.text || "\u00A0";
    if (line.type === "ok") p.classList.add("ok");
    if (line.type === "key") p.classList.add("key");
    body.appendChild(p);
  });
}

async function typeSequence() {
  body.innerHTML = "";
  for (const line of lines) {
    const p = document.createElement("p");
    if (line.type === "ok") p.classList.add("ok");
    if (line.type === "key") p.classList.add("key");
    body.appendChild(p);

    const text = line.text;
    if (!text) { p.textContent = "\u00A0"; await wait(120); continue; }

    for (let i = 0; i <= text.length; i++) {
      p.textContent = text.slice(0, i);
      await wait(line.type === "cmd" ? 28 : 10);
    }
    await wait(120);
  }
  const caret = document.createElement("span");
  caret.className = "term-caret";
  body.appendChild(caret);
}

function wait(ms) { return new Promise(res => setTimeout(res, ms)); }

if (reduceMotion) {
  renderStatic();
} else {
  typeSequence();
}

// Active section highlight (subtle, no external libs)
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-links a");

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute("id");
      navLinks.forEach(link => {
        link.style.color = link.getAttribute("href") === `#${id}` ? "var(--accent-2)" : "";
      });
    }
  });
}, { rootMargin: "-40% 0px -50% 0px" });

sections.forEach(s => observer.observe(s));
