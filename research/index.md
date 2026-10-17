---
layout: page
title: Investigación
permalink: /research/
---

<div class="container">
  <section class="section">
    <h1>Investigación</h1>
    <p class="lead">Líneas, proyectos y publicaciones seleccionadas en las que participo. Ponte en contacto para colaboraciones o solicitudes de datos y materiales.</p>

    <div class="research-actions" style="margin:1rem 0 2rem;">
      <a class="btn btn-primary" href="/assets/files/CV_German_Lopez_Pineda.pdf">Descargar CV (PDF)</a>
      <a class="btn btn-secondary" href="#publications">Ver publicaciones</a>
    </div>
  </section>

  <section id="publications" class="section">
    <h2>Publicaciones seleccionadas</h2>
    <div class="publications-grid">
      {% for pub in site.data.research.publications %}
        {% include research-card.html publication=pub %}
      {% endfor %}
    </div>
  </section>

  <section id="talks" class="section">
    <h2>Charlas y seminarios</h2>
    <ul class="talks-list">
      {% for talk in site.data.research.talks %}
        <li>
          <strong>{{ talk.title }}</strong> — {{ talk.event }} <span class="muted">({{ talk.date }})</span>
          {% if talk.slides and talk.slides != "" %}
            • <a href="{{ talk.slides }}" target="_blank" rel="noopener noreferrer">Diapositivas</a>
          {% endif %}
        </li>
      {% endfor %}
    </ul>
  </section>

  <section id="research-projects" class="section">
    <h2>Proyectos de investigación</h2>
    <div class="repos-container">
      {% for p in site.data.research.projects %}
        <div class="repo-card">
          <div class="repo-header"><h3><a href="{{ p.url }}" target="_blank">{{ p.title }}</a></h3></div>
          <p class="repo-description">{{ p.description }}</p>
          <div class="repo-links"><a href="{{ p.url }}" class="btn btn-primary btn-small" target="_blank">Ver repositorio</a></div>
        </div>
      {% endfor %}
    </div>
  </section>
</div>
