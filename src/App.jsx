import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  FiArrowDownRight,
  FiArrowUpRight,
  FiCode,
  FiDatabase,
  FiGithub,
  FiLinkedin,
  FiMail,
  FiMenu,
  FiX,
} from "react-icons/fi";
import ParticlesCanvas from "./components/ParticlesCanvas";
import ProjectsSection from "./components/ProjectSection";
import "./app.css";

const navigation = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

const skillGroups = [
  {
    title: "Languages",
    icon: FiCode,
    skills: ["Python", "C", "C++", "Java", "JavaScript", "R", "MATLAB"],
  },
  {
    title: "Frontend",
    icon: FiCode,
    skills: ["React", "Vite", "HTML", "CSS", "Tailwind CSS", "Framer Motion"],
  },
  {
    title: "Backend",
    icon: FiDatabase,
    skills: ["FastAPI", "Flask", "APIs"],
  },
  {
    title: "AI / ML",
    icon: FiCode,
    skills: [
      "TensorFlow",
      "Keras",
      "Scikit-learn",
      "XGBoost",
      "Whisper",
      "IndicTrans2",
      "Ollama",
      "LLM-based systems",
    ],
  },
  {
    title: "Data",
    icon: FiDatabase,
    skills: [
      "Pandas",
      "NumPy",
      "MySQL",
      "PostgreSQL",
      "Supabase",
      "Apache Spark / Spark MLlib",
    ],
  },
  {
    title: "Tools & Platforms",
    icon: FiCode,
    skills: ["Git", "GitHub", "Vercel"],
  },
];

const contactLinks = [
  {
    label: "Email",
    detail: "joshichandramouli2005@gmail.com",
    href: "mailto:joshichandramouli2005@gmail.com",
    icon: FiMail,
  },
  {
    label: "GitHub",
    detail: "ChandramouliJoshi",
    href: "https://github.com/ChandramouliJoshi",
    icon: FiGithub,
  },
  {
    label: "LinkedIn",
    detail: "Connect with me",
    href: "https://www.linkedin.com/in/chandramouli-joshi-8384a71b3/",
    icon: FiLinkedin,
  },
];

function Reveal({ children, className = "", delay = 0 }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={shouldReduceMotion ? false : { opacity: 0, y: 22 }}
      whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.55, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const sections = navigation
      .map(({ href }) => document.querySelector(href))
      .filter(Boolean);
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveSection(visible.target.id);
      },
      { rootMargin: "-25% 0px -60% 0px", threshold: [0, 0.15, 0.4] },
    );

    sections.forEach((section) => observer.observe(section));
    const onScroll = () => setScrolled(window.scrollY > 18);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className={`site-header${scrolled ? " is-scrolled" : ""}`}>
      <nav className="nav-shell" aria-label="Main navigation">
        <a className="brand" href="#home" onClick={closeMenu} aria-label="Chandramouli Joshi home">
          <span className="brand-mark">CJ</span>
          <span>Chandramouli Joshi</span>
        </a>
        <button
          className="menu-toggle"
          type="button"
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={menuOpen}
          aria-controls="primary-navigation"
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <FiX /> : <FiMenu />}
        </button>
        <div
          className={`nav-links${menuOpen ? " is-open" : ""}`}
          id="primary-navigation"
        >
          {navigation.map(({ label, href }) => (
            <a
              key={href}
              href={href}
              className={activeSection === href.slice(1) ? "active" : ""}
              aria-current={activeSection === href.slice(1) ? "location" : undefined}
              onClick={closeMenu}
            >
              {label}
            </a>
          ))}
        </div>
      </nav>
    </header>
  );
}

function SectionHeading({ eyebrow, title, children }) {
  return (
    <div className="section-heading">
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      {children && <p className="section-intro">{children}</p>}
    </div>
  );
}

function App() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="portfolio">
      <Navbar />
      <main>
        <section className="hero section-anchor" id="home">
          <ParticlesCanvas />
          <div className="hero-grid" aria-hidden="true" />
          <div className="hero-content">
            <motion.p
              className="eyebrow hero-eyebrow"
              initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
              animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Engineering student · DSATM
            </motion.p>
            <motion.h1
              initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
              animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.08 }}
            >
              Hi, I&apos;m <span>Chandramouli Joshi.</span>
              <br />
              I build thoughtful digital experiences.
            </motion.h1>
            <motion.p
              className="hero-copy"
              initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
              animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.2 }}
            >
              An adaptable engineering student passionate about technology,
              continuous learning, and solving real-world challenges through
              software, AI, and data.
            </motion.p>
            <motion.div
              className="hero-actions"
              initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
              animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.32 }}
            >
              <a className="button button-primary" href="#projects">
                Explore my work <FiArrowDownRight aria-hidden="true" />
              </a>
              <a className="button button-quiet" href="#contact">
                Get in touch <FiArrowUpRight aria-hidden="true" />
              </a>
            </motion.div>
            <a className="scroll-cue" href="#about">
              <span className="scroll-line" />
              Scroll to explore
            </a>
          </div>
          <div className="hero-orbit hero-orbit-one" aria-hidden="true" />
          <div className="hero-orbit hero-orbit-two" aria-hidden="true" />
        </section>

        <section className="section section-anchor about-section" id="about">
          <div className="section-wrap">
            <Reveal>
              <SectionHeading eyebrow="A little about me" title="Curious by nature.">
                I enjoy turning ideas into practical, thoughtful solutions.
              </SectionHeading>
            </Reveal>
            <div className="about-layout">
              <Reveal className="about-copy">
                <p>
                  I&apos;m an enthusiastic and adaptable engineering student at
                  DSATM with a passion for technology, continuous learning, and
                  solving real-world challenges.
                </p>
                <p>
                  From software development and full-stack applications to
                  machine learning and data science, I like exploring how
                  technology can make useful ideas work in the real world.
                </p>
                <p>
                  I believe in learning by doing. Collaboration,
                  experimentation, and building real applications help me grow
                  as an engineer.
                </p>
              </Reveal>
              <div className="about-highlights">
                <Reveal className="highlight-card" delay={0.08}>
                  <span className="highlight-index">01</span>
                  <h3>Build</h3>
                  <p>Practical software, APIs, and full-stack experiences.</p>
                </Reveal>
                <Reveal className="highlight-card" delay={0.16}>
                  <span className="highlight-index">02</span>
                  <h3>Explore</h3>
                  <p>AI, machine learning, data, and modern web technologies.</p>
                </Reveal>
                <Reveal className="highlight-card" delay={0.24}>
                  <span className="highlight-index">03</span>
                  <h3>Learn</h3>
                  <p>Experiment, collaborate, and keep improving through practice.</p>
                </Reveal>
              </div>
            </div>
          </div>
        </section>

        <section className="section section-anchor skills-section" id="skills">
          <div className="section-wrap">
            <Reveal>
              <SectionHeading eyebrow="My toolkit" title="Skills & technologies">
                A growing toolkit for building across software, AI, and data.
              </SectionHeading>
            </Reveal>
            <div className="skills-grid">
              {skillGroups.map(({ title, icon: Icon, skills }, index) => (
                <Reveal className="skill-card" key={title} delay={(index % 3) * 0.06}>
                  <div className="skill-card-heading">
                    <span className="skill-icon"><Icon aria-hidden="true" /></span>
                    <h3>{title}</h3>
                  </div>
                  <div className="skill-tags">
                    {skills.map((skill) => <span className="skill-tag" key={skill}>{skill}</span>)}
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <ProjectsSection />

        <section className="section section-anchor contact-section" id="contact">
          <div className="section-wrap">
            <Reveal>
              <SectionHeading eyebrow="Let’s connect" title="Have an idea in mind?">
                I&apos;m always interested in thoughtful projects and conversations
                about technology.
              </SectionHeading>
            </Reveal>
            <div className="contact-grid">
              {contactLinks.map(({ label, detail, href, icon: Icon }, index) => {
                const external = href.startsWith("https:");
                return (
                  <Reveal className="contact-card" key={label} delay={index * 0.08}>
                    <a
                      href={href}
                      target={external ? "_blank" : undefined}
                      rel={external ? "noopener noreferrer" : undefined}
                    >
                      <span className="contact-icon"><Icon aria-hidden="true" /></span>
                      <span className="contact-text">
                        <strong>{label}</strong>
                        <span>{detail}</span>
                      </span>
                      <FiArrowUpRight className="contact-arrow" aria-hidden="true" />
                    </a>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>
      </main>
      <footer className="site-footer">
        <div className="footer-inner">
          <div>
            <a className="footer-name" href="#home">Chandramouli Joshi</a>
            <p>Building, learning, and exploring what&apos;s next.</p>
          </div>
          <div className="footer-socials" aria-label="Social links">
            <a href="mailto:joshichandramouli2005@gmail.com" aria-label="Email">
              <FiMail />
            </a>
            <a href="https://github.com/ChandramouliJoshi" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <FiGithub />
            </a>
            <a href="https://www.linkedin.com/in/chandramouli-joshi-8384a71b3/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <FiLinkedin />
            </a>
          </div>
          <p className="copyright">© {new Date().getFullYear()} Chandramouli Joshi</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
