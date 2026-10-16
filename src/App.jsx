import { useState } from "react";
import "./App.css";

/* ---------- EDIT YOUR DETAILS HERE ---------- */
const PROFILE = {
  name: "Saranya K",
  role: "Full Stack Java Developer (Fresher)",
  location: "Chennai, Tamil Nadu",
  college: "Nellai Nadar College of Engineering and Technology",
  degree: "BE Computer Science and Engineering, 2023 - 2027",
  gpa: "8.2",
  summary:
    "Final-year CSE student with a strong foundation in Java, OOP, Spring Boot and SQL. I build REST APIs and connect them to working frontends.",
  github: "https://github.com/Saranyak449",
  linkedin: "https://linkedin.com/in/saranya-kumaresan",
  email: "saranyakumaresan9944@gmail.com",
  resume: "", // e.g. "/Saranya_K_Resume.pdf" (put the PDF inside the public folder)
};

const SKILLS = {
  languages: ["Java", "SQL", "HTML", "CSS", "JavaScript"],
  backend: ["Spring Boot", "REST APIs", "JWT"],
  database: ["PostgreSQL", "MySQL", "MongoDB"],
  tools: ["Git", "GitHub", "IntelliJ IDEA", "VS Code", "Postman"],
  concepts: ["Object-Oriented Programming"],
};

const PROJECTS = [
  {
    name: "Online Voting System",
    when: "Sep 2026 - Oct 2026",
    stack: ["Java", "Spring Boot", "JWT", "BCrypt", "PostgreSQL", "Postman"],
    text: "Secure backend for online voting built with a layered architecture (Controller, Service, Repository). REST APIs for admin and voter flows, with every endpoint tested in Postman.",
    repo: "", // paste repo link, e.g. https://github.com/Saranyak449/your-repo-name
  },
  {
    name: "Hospital Appointment Management System",
    when: "Jul 2026",
    stack: ["React", "Node.js", "Express.js", "MongoDB", "HTML", "CSS"],
    text: "Full-stack web app where patients search for doctors, book appointments and manage schedules online. Includes secure user authentication and personalized dashboards for patients and doctors.",
    repo: "",
  },
];

const EXPERIENCE = [
  {
    role: "Full Stack Java Intern",
    org: "DvEIN Innovations, Chennai",
    when: "Sep 2026 - Oct 2026",
    note: "Built full stack features with Java, Spring Boot and SQL. Developed and tested REST APIs and integrated them with the frontend.",
  },
  {
    role: "Full Stack Web Development Intern",
    org: "Create Space Lab, Chennai",
    when: "Jun 2026 - Jul 2026",
    note: "Built responsive web applications and completed the Hospital Appointment Management System as the internship project.",
  },
];

const CERTIFICATIONS = [
  { title: "Full Stack Web Development Certification", by: "Create Space Lab" },
  { title: "Full Stack Java Certification", by: "DvEIN Innovations" },
];
/* -------------------------------------------- */

const ENDPOINTS = {
  "/about": {
    name: PROFILE.name,
    role: PROFILE.role,
    location: PROFILE.location,
    education: `${PROFILE.degree}, GPA ${PROFILE.gpa}`,
  },
  "/skills": SKILLS,
  "/projects": PROJECTS.map((p) => ({ name: p.name, stack: p.stack })),
};

function Json({ data }) {
  const text = JSON.stringify(data, null, 2);
  // light syntax colouring: keys vs string values
  const parts = text.split("\n").map((line, i) => {
    const m = line.match(/^(\s*)"([^"]+)": (.*)$/);
    if (m) {
      return (
        <div key={i}>
          {m[1]}
          <span className="k">"{m[2]}"</span>: <span className="s">{m[3]}</span>
        </div>
      );
    }
    return (
      <div key={i}>
        <span className="s">{line}</span>
      </div>
    );
  });
  return <pre className="json">{parts}</pre>;
}

export default function App() {
  const [path, setPath] = useState("/about");

  return (
    <>
      <header className="top">
        <a className="brand" href="#top">{PROFILE.name}</a>
        <nav aria-label="Sections">
          <a href="#projects">Projects</a>
          <a href="#experience">Experience</a>
          <a href="#skills">Skills</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      <main id="top">
        <section className="hero">
          <div className="hero-text">
            <span className="badge">Open to work, Chennai</span>
            <h1>{PROFILE.name}</h1>
            <p className="role">{PROFILE.role}</p>
            <p className="summary">{PROFILE.summary}</p>
            <div className="actions">
              <a className="btn primary" href="#projects">See my projects</a>
              {PROFILE.resume && (
                <a className="btn" href={PROFILE.resume} download>Download resume</a>
              )}
            </div>
          </div>

          <div className="panel" aria-label="Interactive API response about me">
            <div className="req">
              <span className="verb">GET</span>
              <span className="url">api.saranya.dev{path}</span>
              <span className="status">200 OK</span>
            </div>
            <div className="tabs" role="tablist">
              {Object.keys(ENDPOINTS).map((p) => (
                <button
                  key={p}
                  role="tab"
                  aria-selected={p === path}
                  className={p === path ? "tab on" : "tab"}
                  onClick={() => setPath(p)}
                >
                  {p}
                </button>
              ))}
            </div>
            <Json data={ENDPOINTS[path]} />
          </div>
        </section>

        <section id="projects" className="block">
          <h2>Projects</h2>
          <ul className="projects">
            {PROJECTS.map((p) => (
              <li key={p.name}>
                <div className="p-head">
                  <h3>{p.name}</h3>
                  <span className="when">{p.when}</span>
                </div>
                <p>{p.text}</p>
                <ul className="tags">
                  {p.stack.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
                {p.repo && (
                  <a className="link" href={p.repo} target="_blank" rel="noreferrer">
                    View code on GitHub
                  </a>
                )}
              </li>
            ))}
          </ul>
        </section>

        <section id="experience" className="block">
          <h2>Experience and education</h2>
          <ul className="timeline">
            {EXPERIENCE.map((e) => (
              <li key={e.org}>
                <strong>{e.role}</strong>
                <span>{e.org}, {e.when}</span>
                <span>{e.note}</span>
              </li>
            ))}
            <li>
              <strong>{PROFILE.degree}</strong>
              <span>{PROFILE.college}, GPA {PROFILE.gpa}</span>
            </li>
            <li>
              <strong>Higher Secondary Certificate (HSC), 2023</strong>
              <span>Government Higher Secondary School, 78.8%</span>
            </li>
          </ul>
        </section>

        <section className="block">
          <h2>Certifications</h2>
          <ul className="timeline">
            {CERTIFICATIONS.map((c) => (
              <li key={c.title}>
                <strong>{c.title}</strong>
                <span>{c.by}</span>
              </li>
            ))}
          </ul>
        </section>

        <section id="skills" className="block">
          <h2>Skills</h2>
          <div className="skill-groups">
            {Object.entries(SKILLS).map(([group, items]) => (
              <div key={group} className="skill-card">
                <h3>{group[0].toUpperCase() + group.slice(1)}</h3>
                <ul className="chips">
                  {items.map((i) => (
                    <li key={i}>{i}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section id="contact" className="block">
          <h2>Contact</h2>
          <p>Looking for a fresher role as a Java or full stack developer. Send me a message.</p>
          <div className="actions">
            {PROFILE.email && (
              <a className="btn primary" href={`mailto:${PROFILE.email}`}>Email me</a>
            )}
            <a className="btn" href={PROFILE.github} target="_blank" rel="noreferrer">GitHub</a>
            {PROFILE.linkedin && (
              <a className="btn" href={PROFILE.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
            )}
          </div>
        </section>
      </main>

      <footer>{PROFILE.location} - {new Date().getFullYear()}</footer>
    </>
  );
}