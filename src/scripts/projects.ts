/**
 * Projects Data & Rendering
 * Contains project rendering functions — data is loaded from /data/projects.json
 */

import PROJECTS_DATA from "../data/projects.json";

interface Project {
  id: number;
  slug: string;
  title: string;
  category: string;
  year: number;
  description: string;
  shortDescription: string;
  problem: string;
  solution: string;
  image: string;
  imageAlt: string;
  stack: string[];
  impact: string;
  testimonial: string;
  testimonialAuthor: string;
  testimonialRole: string;
  featured: boolean;
  color: string;
}

const PROJECTS: Project[] = PROJECTS_DATA as Project[];

/**
 * Get all projects
 */
function getAllProjects(): Project[] {
  return PROJECTS;
}

/**
 * Get featured projects (first 3)
 */
function getFeaturedProjects(): Project[] {
  return PROJECTS.filter((p) => p.featured).slice(0, 3);
}

/**
 * Get project by ID
 */
function getProjectById(id: number | string): Project | undefined {
  return PROJECTS.find((p) => p.id === parseInt(String(id)));
}

/**
 * Get project by slug
 */
function getProjectBySlug(slug: string): Project | undefined {
  return PROJECTS.find((p) => p.slug === slug);
}

/**
 * Get adjacent projects for navigation
 */
function getAdjacentProjects(currentId: number): {
  prev: Project;
  next: Project;
} {
  const currentIndex = PROJECTS.findIndex((p) => p.id === currentId);
  return {
    prev:
      currentIndex > 0
        ? PROJECTS[currentIndex - 1]
        : PROJECTS[PROJECTS.length - 1],
    next:
      currentIndex < PROJECTS.length - 1
        ? PROJECTS[currentIndex + 1]
        : PROJECTS[0],
  };
}

/**
 * Render project grid
 */
function renderProjectGrid(
  container: HTMLElement | null,
  projects: Project[],
): void {
  if (!container) return;

  container.innerHTML = projects
    .map(
      (project) => `
    <article class="card reveal">
      <div style="aspect-ratio: 16/9; overflow: hidden; border-radius: var(--radius-lg); margin-bottom: var(--space-lg);">
        <img src="${project.image}" fetchpriority="high" title="${project.title}" alt="${project.imageAlt}" style="width: 100%; height: 100%; object-fit: cover;">
      </div>
      <div class="pill mb-md">${project.category}</div>
      <h3 class="mb-md">${project.title}</h3>
      <p class="mb-lg text-sm">${project.shortDescription}</p>
      <a href="/project-detail.html?id=${project.id}" class="btn btn-secondary btn-sm">View Project</a>
    </article>
  `,
    )
    .join("");

  setTimeout(() => {
    container.querySelectorAll(".reveal").forEach((el) => {
      el.classList.add("visible");
    });
  }, 100);
}

/**
 * Render project detail
 */
function renderProjectDetail(
  container: HTMLElement | null,
  project: Project,
): void {
  if (!container) return;

  const { prev, next } = getAdjacentProjects(project.id);

  container.innerHTML = `
    <nav class="mb-2xl project-title" aria-label="Breadcrumb">
      <ol class="flex gap-sm text-sm" style="color: var(--color-text-secondary);">
        <li><a href="/projects.html" style="color: inherit;">Projects</a></li>
        <li aria-current="page" style="color: var(--color-text);">${project.title}</li>
      </ol>
    </nav>

    <header class="mb-3xl">
      <h1 class="mb-md">${project.title}</h1>
      <p style="font-size: var(--font-size-lg); color: var(--color-text-secondary); max-width: 600px;">
        ${project.description}
      </p>
    </header>

    <figure class="mb-3xl reveal" style="aspect-ratio: 16/9; overflow: hidden; border-radius: var(--radius-lg);">
      <img src="${project.image}" fetchpriority="high" title="${project.title}" alt="${project.imageAlt}" style="width: 100%; height: 100%; object-fit: cover;">
    </figure>

    <section class="grid-2 gap-3xl mb-3xl">
      <div class="reveal">
        <h3 class="mb-lg">The Problem</h3>
        <p>${project.problem}</p>
      </div>
      <div class="reveal">
        <h3 class="mb-lg">The Solution</h3>
        <p>${project.solution}</p>
      </div>
    </section>

    <section class="mb-3xl">
      <h3 class="mb-lg">Technical Stack</h3>
      <div class="flex-row gap-md flex-wrap reveal">
        ${project.stack.map((tech) => `<div class="pill">${tech}</div>`).join("")}
      </div>
    </section>

    <section class="mb-3xl reveal" style="background: var(--color-surface-secondary); padding: var(--space-2xl); border-radius: var(--radius-lg); border-left: 4px solid var(--color-primary);">
      <h3 class="mb-md">Impact</h3>
      <p style="font-size: var(--font-size-lg); color: var(--color-text); font-weight: var(--font-weight-semibold);">
        ${project.impact}
      </p>
    </section>

    <section class="mb-3xl reveal" style="background: var(--color-surface); border: 2px solid var(--color-border); padding: var(--space-2xl); border-radius: var(--radius-lg); text-align: center;">
      <p style="font-size: var(--font-size-lg); line-height: var(--line-height-relaxed); margin-bottom: var(--space-lg); font-style: italic;">
        "${project.testimonial}"
      </p>
      <p style="font-weight: var(--font-weight-semibold); color: var(--color-text);">
        ${project.testimonialAuthor}
      </p>
      <p style="color: var(--color-text-secondary); font-size: var(--font-size-sm);">
        ${project.testimonialRole}
      </p>
    </section>

    <nav class="flex gap-md mt-3xl flex-wrap" aria-label="Project navigation">
      <a href="/project-detail.html?id=${prev.id}" class="btn btn-secondary" style="flex: 1; min-width: 200px;">
        ← ${prev.title}
      </a>
      <a href="/projects.html" class="btn btn-secondary" style="flex: 1; min-width: 200px;">
        All Projects
      </a>
      <a href="/project-detail.html?id=${next.id}" class="btn btn-secondary" style="flex: 1; min-width: 200px;">
        ${next.title} →
      </a>
    </nav>
  `;

  setTimeout(() => {
    container.querySelectorAll(".reveal").forEach((el) => {
      el.classList.add("visible");
    });
  }, 100);
}

export type { Project };
export {
  getAllProjects,
  getFeaturedProjects,
  getProjectById,
  getProjectBySlug,
  getAdjacentProjects,
  renderProjectGrid,
  renderProjectDetail,
};
