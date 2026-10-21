import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { FiArrowUpRight } from "react-icons/fi";

const categories = ["All", "Hackathon", "Personal", "Educational"];

const projects = [
  {
    title: "GAMECRAFT 2026",
    category: "Hackathon",
    technologies: ["React", "TypeScript", "Vite", "Supabase", "PostgreSQL", "Vercel"],
    description:
      "Full-stack hackathon management and registration platform supporting team registration, member management, payment proof submission, automated confirmations, admin management, protected APIs, Supabase RLS, rate limiting, Google Drive/Gmail API integrations, and Vercel Cron.",
    live: "https://gamecraft-website.vercel.app/",
  },
  {
    title: "F1 Telemetry & Race Analysis Dashboard",
    category: "Personal",
    technologies: ["React", "TypeScript", "FastAPI", "FastF1"],
    description:
      "Full-stack F1 telemetry and race analysis platform with lap analysis, driver comparisons, sector performance, tyre stint analysis, and telemetry visualization.",
    live: "https://apex-engineer-ai.vercel.app/",
  },
  {
    title: "JanVaani AI",
    category: "Educational",
    technologies: [
      "Python",
      "FastAPI",
      "React",
      "TensorFlow",
      "Keras",
      "Whisper",
      "IndicTrans2",
      "Ollama",
    ],
    description:
      "Multilingual voice-based agricultural assistant integrating crop disease detection, soil analysis, government scheme recommendations, multilingual processing, and LLM-based reasoning.",
  },
  {
    title: "AI Chat Application",
    category: "Personal",
    technologies: ["React", "FastAPI", "LLM APIs"],
    description:
      "Full-stack AI chat platform featuring dynamic session management, project organization, automatic chat naming, Markdown rendering, syntax-highlighted code rendering, and backend-integrated LLM responses.",
  },
  {
    title: "Semantic Dataset Recommendation System",
    category: "Educational",
    technologies: ["Phi-3", "SentenceTransformers", "Flask", "React", "MySQL"],
    description:
      "Semantic dataset discovery platform using natural-language query understanding, LLM-based query refinement, and cosine similarity for intelligent dataset ranking.",
  },
  {
    title: "Water Quality & Pollution Analysis",
    category: "Hackathon",
    technologies: ["Python", "Pandas", "Scikit-learn", "Logistic Regression", "Random Forest"],
    description:
      "ML-based water potability prediction system involving data preprocessing, exploratory data analysis, and classification.",
  },
  {
    title: "Vidhatha Insights",
    category: "Educational",
    technologies: ["Genkit", "Next.js", "TypeScript"],
    description:
      "AI-powered legal awareness platform providing law identification, simplified legal summaries, actionable guidance, and contextual case insights.",
  },
  {
    title: "Jira-Style Task Management Platform",
    category: "Educational",
    technologies: ["Next.js", "React", "TypeScript"],
    description:
      "Jira-style task management platform featuring Kanban boards, sprint planning, backlog management, and role-based collaboration.",
  },
  {
    title: "Personal Portfolio Website",
    category: "Personal",
    technologies: ["React", "Framer Motion", "Canvas", "Tailwind CSS"],
    description:
      "Responsive personal portfolio featuring interactive canvas animations, Framer Motion interactions, and custom UI effects.",
  },
];

function ProjectCard({ project, index, reduceMotion }) {
  const handlePointerMove = (event) => {
    if (reduceMotion || event.pointerType === "touch") return;
    const bounds = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty("--pointer-x", `${event.clientX - bounds.left}px`);
    event.currentTarget.style.setProperty("--pointer-y", `${event.clientY - bounds.top}px`);
  };

  return (
    <motion.article
      className="project-card"
      onPointerMove={handlePointerMove}
      initial={reduceMotion ? false : { opacity: 0, y: 22 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      exit={reduceMotion ? undefined : { opacity: 0, y: 10, scale: 0.97 }}
      layout
      viewport={{ once: true, amount: 0.12 }}
      transition={{
        duration: reduceMotion ? 0 : 0.35,
        delay: reduceMotion ? 0 : (index % 3) * 0.04,
        ease: "easeOut",
        layout: { duration: reduceMotion ? 0 : 0.35, ease: "easeOut" },
      }}
    >
      <div className="project-card-content">
        <div className="project-topline">
          <span className="project-number">{String(index + 1).padStart(2, "0")}</span>
        </div>
        <h3>{project.title}</h3>
        <div className="project-metadata">
          <span className={`category-badge category-${project.category.toLowerCase()}`}>
            {project.category}
          </span>
          {project.live && <span className="project-status">Live project</span>}
        </div>
        <div className="project-tech" aria-label="Technologies used">
          {project.technologies.map((technology) => (
            <span key={technology}>{technology}</span>
          ))}
        </div>
        <p className="project-description">{project.description}</p>
        {project.live && (
          <a
            className="project-link"
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Open ${project.title} live demo in a new tab`}
          >
            View live project <FiArrowUpRight aria-hidden="true" />
          </a>
        )}
      </div>
    </motion.article>
  );
}

export default function ProjectsSection() {
  const reduceMotion = useReducedMotion();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const visibleProjects = projects.filter(
    (project) => selectedCategory === "All" || project.category === selectedCategory,
  );

  return (
    <section className="section section-anchor projects-section" id="projects">
      <div className="section-wrap">
        <motion.div
          className="section-heading"
          initial={reduceMotion ? false : { opacity: 0, y: 22 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
        >
          <p className="eyebrow">Selected work</p>
          <h2>Projects in practice.</h2>
          <p className="section-intro">
            A selection of projects exploring useful ideas across web
            development, AI, and data.
          </p>
        </motion.div>
        <div className="project-filters" role="group" aria-label="Filter projects by category">
          {categories.map((category) => (
            <button
              key={category}
              className={`project-filter${selectedCategory === category ? " is-active" : ""}`}
              type="button"
              aria-pressed={selectedCategory === category}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
        <motion.div className="projects-grid" layout>
          <AnimatePresence initial={false} mode="sync">
            {visibleProjects.map((project) => (
              <ProjectCard
                key={project.title}
                project={project}
                index={projects.indexOf(project)}
                reduceMotion={reduceMotion}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
