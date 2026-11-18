import { useEffect, useMemo, useRef, useState } from 'react'
import { ArrowDown, ArrowDownRight, ArrowUpRight, Search, X } from 'lucide-react'
import projects from './data/projects.json'
import experience from './data/experience.json'
import archive from './data/archive.json'

const archiveTypes = ['All', ...new Set(archive.map((entry) => entry.type))]

function formatDate(date) {
  return new Intl.DateTimeFormat('en', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(`${date}T00:00:00Z`))
}

function CaseStudyDialog({ project, onClose }) {
  const dialogRef = useRef(null)

  useEffect(() => {
    const dialog = dialogRef.current
    if (project && dialog && !dialog.open) dialog.showModal()
    if (!project && dialog?.open) dialog.close()
  }, [project])

  return (
    <dialog
      ref={dialogRef}
      className="case-dialog"
      aria-labelledby="case-study-title"
      onClose={onClose}
      onClick={(event) => {
        if (event.target === dialogRef.current) dialogRef.current.close()
      }}
    >
      {project && (
        <article className="case-content">
          <div className="case-topline">
            <p className="eyebrow">{project.type} <span>·</span> {project.year}</p>
            <button className="icon-button" type="button" onClick={() => dialogRef.current.close()} aria-label="Close case study">
              <X size={18} />
            </button>
          </div>
          <h2 id="case-study-title" className="case-title">{project.title}</h2>
          <p className="case-subtitle">{project.subtitle}</p>
          <div className="case-meta">
            <div><span>Role</span><strong>{project.role}</strong></div>
            <div><span>Timeline</span><strong>{project.duration}</strong></div>
          </div>
          {[
            ['The question', project.problem],
            ['What I did', project.approach],
            ['What changed', project.outcome],
          ].map(([heading, copy]) => (
            <section className="case-section" key={heading}>
              <h3>{heading}</h3>
              <p>{copy}</p>
            </section>
          ))}
          <div className="tag-list">
            {project.tags.map((tag) => <span className="tag" key={tag}>{tag}</span>)}
          </div>
        </article>
      )}
    </dialog>
  )
}

function App() {
  const [selectedProject, setSelectedProject] = useState(null)
  const [query, setQuery] = useState('')
  const [activeType, setActiveType] = useState('All')

  const filteredArchive = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()
    return [...archive]
      .sort((a, b) => b.date.localeCompare(a.date))
      .filter((entry) => {
        const matchesType = activeType === 'All' || entry.type === activeType
        const searchableText = [entry.title, entry.type, entry.description, ...entry.tags].join(' ').toLowerCase()
        return matchesType && (!normalizedQuery || searchableText.includes(normalizedQuery))
      })
  }, [activeType, query])

  return (
    <>
      <header className="site-header">
        <a className="wordmark" href="#home" aria-label="Your Name, home">
          <span className="wordmark-mark">YN</span>
          <span>Your Name<span className="wordmark-period">.</span></span>
        </a>
        <nav className="main-nav" aria-label="Main navigation">
          <a href="#work">Work</a>
          <a href="#about">About</a>
          <a href="#archive">Archive</a>
        </nav>
        <a className="availability" href="mailto:your.email@example.com">
          <span className="availability-dot" /> Open to opportunities <ArrowUpRight size={14} />
        </a>
      </header>

      <main>
        <section className="hero page-wrap" id="home">
          <div className="hero-copy">
            <p className="eyebrow"><span className="eyebrow-line" /> Engineering student &amp; curious builder</p>
            <h1>Making useful things,<br /><em>one question at a time.</em></h1>
            <p className="hero-description">
              I’m Your Name — an engineer in the making, interested in thoughtful tools,
              hands-on problem solving, and the details that make things work.
            </p>
            <div className="hero-actions">
              <a className="button button-dark" href="#work">Explore selected work <ArrowDownRight size={16} /></a>
              <a className="text-link" href="mailto:your.email@example.com">Say hello <ArrowUpRight size={15} /></a>
            </div>
          </div>
          <div className="hero-aside" aria-label="Portfolio introduction">
            <div className="orbit orbit-one" />
            <div className="orbit orbit-two" />
            <div className="orbit-core"><span>YN</span></div>
            <span className="orbit-label orbit-label-top">CURIOUS BY DEFAULT</span>
            <span className="orbit-label orbit-label-bottom">BUILT WITH INTENTION</span>
            <span className="orbit-dot" />
          </div>
          <a className="scroll-cue" href="#work"><ArrowDown size={14} /> Scroll to explore</a>
          <div className="hero-index">PORTFOLIO / 2025—26</div>
        </section>

        <section className="work-section section-wrap" id="work">
          <div className="section-heading">
            <div>
              <p className="eyebrow">01 / Selected work</p>
              <h2>Things I’ve <em>worked on.</em></h2>
            </div>
            <p className="section-note">A few projects, experiments, and lessons<br className="desktop-break" /> from the workbench.</p>
          </div>
          <div className="project-grid">
            {projects.map((project, index) => (
              <button className={`project-card project-card-${index + 1}`} key={project.id} onClick={() => setSelectedProject(project)}>
                <span className="project-art" aria-hidden="true">
                  <span className="art-index">0{index + 1}</span>
                  <span className="art-shape" />
                  <span className="art-caption">{project.type}</span>
                  <span className="project-open"><ArrowUpRight size={17} /></span>
                </span>
                <span className="project-info">
                  <span className="project-title">{project.title}<span>{project.year}</span></span>
                  <span className="project-subtitle">{project.subtitle}</span>
                  <span className="project-tags">{project.tags.slice(0, 3).map((tag) => <span key={tag}>{tag}</span>)}</span>
                </span>
              </button>
            ))}
          </div>
        </section>

        <section className="about-section" id="about">
          <div className="section-wrap about-inner">
            <div className="about-intro">
              <p className="eyebrow">02 / A little about me</p>
              <h2>Good work starts<br />with <em>good questions.</em></h2>
              <p className="about-copy">
                I like getting close to a problem: sketching, testing, asking for feedback,
                and learning just enough to make the next version better. I’m currently
                looking for a team where I can contribute, keep learning, and make things
                that matter.
              </p>
              <a className="text-link" href="mailto:your.email@example.com">Let’s work together <ArrowUpRight size={15} /></a>
            </div>
            <div className="timeline">
              <p className="eyebrow">The path so far</p>
              {experience.map((item, index) => (
                <article className="timeline-item" key={`${item.period}-${item.title}`}>
                  <div className="timeline-marker">{String(index + 1).padStart(2, '0')}</div>
                  <div className="timeline-content">
                    <div className="timeline-meta"><span>{item.period}</span><span>{item.kind}</span></div>
                    <h3>{item.title}</h3>
                    <p className="timeline-org">{item.organization}</p>
                    <p className="timeline-description">{item.description}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="archive-section section-wrap" id="archive">
          <div className="section-heading archive-heading">
            <div>
              <p className="eyebrow">03 / The running log</p>
              <h2>Notes from <em>along the way.</em></h2>
            </div>
            <p className="section-note">A chronological record of builds, ideas,<br className="desktop-break" /> small wins, and what I learned.</p>
          </div>
          <div className="archive-controls">
            <label className="search-field">
              <Search size={16} aria-hidden="true" />
              <span className="sr-only">Search archive</span>
              <input
                type="search"
                placeholder="Search the archive..."
                value={query}
                onChange={(event) => setQuery(event.target.value)}
              />
              {query && <button type="button" className="clear-search" onClick={() => setQuery('')} aria-label="Clear search"><X size={14} /></button>}
            </label>
            <div className="filter-list" aria-label="Filter archive by type">
              {archiveTypes.map((type) => (
                <button
                  className={activeType === type ? 'filter-chip active' : 'filter-chip'}
                  key={type}
                  type="button"
                  aria-pressed={activeType === type}
                  onClick={() => setActiveType(type)}
                >{type}</button>
              ))}
            </div>
          </div>
          <div className="archive-table-wrap">
            <table className="archive-table">
              <thead>
                <tr><th scope="col">Date</th><th scope="col">Entry</th><th scope="col">Type</th><th scope="col" className="archive-tags-heading">Tags</th></tr>
              </thead>
              <tbody>
                {filteredArchive.map((entry) => (
                  <tr key={`${entry.date}-${entry.title}`}>
                    <td className="archive-date">{formatDate(entry.date)}</td>
                    <td className="archive-entry"><strong>{entry.title}</strong><span>{entry.description}</span></td>
                    <td><span className="archive-type">{entry.type}</span></td>
                    <td className="archive-tags">{entry.tags.map((tag) => <span key={tag}>{tag}</span>)}</td>
                  </tr>
                ))}
                {filteredArchive.length === 0 && (
                  <tr><td className="empty-state" colSpan="4">No entries match that search. Try another word or filter.</td></tr>
                )}
              </tbody>
            </table>
          </div>
          <p className="archive-count">{filteredArchive.length} {filteredArchive.length === 1 ? 'entry' : 'entries'} <span>·</span> Updated as I go</p>
        </section>

        <section className="contact-section">
          <div className="section-wrap contact-inner">
            <p className="eyebrow">Have a good problem?</p>
            <h2>Let’s make<br /><em>something matter.</em></h2>
            <a className="button button-light" href="mailto:your.email@example.com">Get in touch <ArrowUpRight size={16} /></a>
            <span className="contact-scribble" aria-hidden="true">↗</span>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <a className="wordmark" href="#home"><span className="wordmark-mark">YN</span><span>Your Name<span className="wordmark-period">.</span></span></a>
        <p>Designed with intention. Built to keep growing.</p>
        <a className="back-top" href="#home">Back to top <ArrowDown size={14} /></a>
        <span className="footer-year">© 2025—26</span>
      </footer>

      <CaseStudyDialog project={selectedProject} onClose={() => setSelectedProject(null)} />
    </>
  )
}

export default App
