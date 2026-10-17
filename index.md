---
layout: home
title: Inicio
---

<div class="hero">
  <div class="container hero-inner">
    <div class="hero-copy">
      <span class="eyebrow">Desarrollador • Investigador • Profesor</span>
      <h1>{{ site.author.name }}</h1>
      <p class="hero-description">{{ site.author.bio | default: site.description }}</p>

      <div class="hero-actions">
        <a class="btn btn-primary" href="#featured">Proyectos destacados</a>
        <a class="btn btn-secondary" href="{{ '/posts/' | relative_url }}">Leer el blog</a>
      </div>

      {% include social-links.html %}
    </div>

    <div class="hero-panel">
      <!-- Inline SVG avatar (reemplaza por assets/images/profile.jpg si lo deseas) -->
      <div class="info-card" style="text-align:center;">
        <svg width="96" height="96" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" style="border-radius:12px;">
          <rect width="24" height="24" rx="4" fill="#0f172a" />
          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zM4 20c0-2.21 3.58-4 8-4s8 1.79 8 4v1H4v-1z" fill="#38bdf8"/>
        </svg>
        <div style="height:12px"></div>
        <div class="info-label">Contacto</div>
        <strong><a href="mailto:{{ site.author.email }}">{{ site.author.email }}</a></strong>
      </div>

      <div class="info-card">
        <div class="info-label">Especialidad</div>
        <strong>Jekyll · GitHub Pages · Documentación técnica</strong>
      </div>

      <div class="info-card info-card-accent">
        <div class="info-label">Disponibilidad</div>
        <strong>Proyectos académicos y colaboraciones</strong>
      </div>
    </div>
  </div>
</div>

<div class="container home-content">
  <!-- Featured repos from _data/repos.yml (fallback inmediato sin depender de la API) -->
  {% assign featured = site.data.repos | where: "featured", true %}
  {% if featured and featured.size > 0 %}
    <section id="featured" class="section">
      <h2>Proyectos destacados</h2>
      <div class="repos-container">
        {% for repo in featured %}
          {% include repo-card.html repo=repo %}
        {% endfor %}
      </div>
      <div style="text-align:center; margin-top:1rem;">
        <a href="{{ '/repos/' | relative_url }}" class="btn btn-secondary">Ver más proyectos</a>
      </div>
    </section>
  {% endif %}

  <!-- Dynamic list populated by JS (API) -->
  <section id="projects" class="section">
    <h2 id="repos">Más proyectos</h2>
    <div class="filters">
      <input id="repo-search" type="search" placeholder="Buscar repositorios…" aria-label="Buscar repositorios">
      <select id="language-filter" aria-label="Filtrar por lenguaje"></select>
      <select id="sort-filter" aria-label="Ordenar por">
        <option value="updated">Más recientes</option>
        <option value="stars">Más estrellas</option>
      </select>
    </div>

    <div class="repos-container" id="repos-container">
      <!-- Los repos se cargarán aquí -->
    </div>
  </section>

  <!-- Latest posts editorial section -->
  <section class="section">
    <h2>Últimos artículos</h2>
    <div class="posts-container">
      {% for post in site.posts limit:3 %}
        <article class="post-card">
          <h3><a href="{{ post.url | relative_url }}">{{ post.title }}</a></h3>
          <div class="post-meta">
            <span><i class="fas fa-calendar-alt"></i> {{ post.date | date: "%d %b %Y" }}</span>
            {% if post.categories %}
              <span>
                <i class="fas fa-folder"></i>
                {% for category in post.categories %}
                  <a href="#">{{ category }}</a>{% unless forloop.last %}, {% endunless %}
                {% endfor %}
              </span>
            {% endif %}
          </div>
          <p>{{ post.excerpt | strip_html | truncatewords: 36 }}</p>
          <a href="{{ post.url | relative_url }}" class="btn btn-primary btn-small">Leer</a>
        </article>
      {% endfor %}
    </div>

    <div style="text-align:center; margin-top: 1.5rem;">
      <a href="{{ '/posts/' | relative_url }}" class="btn btn-secondary">Ver todos los posts</a>
    </div>
  </section>

  <!-- About / skills -->
  <section class="section">
    <h2>Sobre mí</h2>
    <div class="page-content">
      <p>Soy <strong>{{ site.author.name }}</strong>, Profesor Asociado en la Universidad de Córdoba. Me centro en la intersección entre desarrollo de software, documentación técnica y enseñanza. Comparto proyectos, guías y artículos técnicos aquí.</p>

      <h3>Habilidades</h3>
      <p>
        <span class="topic-tag">Jekyll</span>
        <span class="topic-tag">GitHub Pages</span>
        <span class="topic-tag">Markdown</span>
        <span class="topic-tag">Documentación</span>
        <span class="topic-tag">HTML/CSS</span>
      </p>

      <h3>¿Quieres colaborar?</h3>
      <p>Si te interesa colaborar en investigación o proyectos docentes, escríbeme a <a href="mailto:{{ site.author.email }}">{{ site.author.email }}</a>.</p>
    </div>
  </section>
</div>
