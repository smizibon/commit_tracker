import './Hub.css';
import { Link } from 'react-router-dom';
import { projects } from '../projects/projects.js';

function Hub() {
  return (
    <div className="hub">
      <section className="hub__hero">
        <h1 className="hub__title">Project Hub</h1>
        <p className="hub__subtitle">Central entry point for tools and utilities.</p>
      </section>

      <section className="hub__grid">
        {projects.map((project) => (
          <article key={project.id} className="hub__card">
            <h2 className="hub__card-title">{project.name}</h2>
            <p className="hub__card-desc">{project.description}</p>
            <Link className="hub__link" to={project.path} data-testid={`project-link-${project.id}`}>
              Open Project →
            </Link>
          </article>
        ))}
      </section>

      <footer className="hub__footer">
        <div>Routes are explicit and isolated per project.</div>
        <div className="hub__tagline">Add new projects by appending entries to the projects list.</div>
      </footer>
    </div>
  );
}

export default Hub;