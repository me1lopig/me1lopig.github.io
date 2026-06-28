---
layout: home
title: Inicio
---

## 📌 Repositorios Destacados

<div class="repos-container" id="repos-container">
  <!-- Los repositorios se cargarán aquí dinámicamente desde la API de GitHub -->
</div>

<div style="text-align: center; margin-top: 2rem;">
  <a href="{{ '/repos/' | relative_url }}" class="btn">Ver todos los repositorios</a>
</div>

---

## 📝 Últimos Posts

<div class="posts-container">
  {% for post in site.posts limit:3 %}
    <div class="post-card">
      <h3><a href="{{ post.url | relative_url }}">{{ post.title }}</a></h3>
      <div class="post-meta">
        <span><i class="fas fa-calendar-alt"></i> {{ post.date | date: "%d %b %Y" }}</span>
        {% if post.categories %}
          <span>
            <i class="fas fa-folder"></i>
            {% for category in post.categories %}
              <a href="#">{{ category }}</a>
              {% unless forloop.last %}, {% endunless %}
            {% endfor %}
          </span>
        {% endif %}
      </div>
      <p>{{ post.excerpt | strip_html | truncatewords: 30 }}</p>
      <a href="{{ post.url | relative_url }}" class="btn btn-small">Leer más</a>
    </div>
  {% endfor %}
</div>

<div style="text-align: center; margin-top: 2rem;">
  <a href="{{ '/posts/' | relative_url }}" class="btn">Ver todos los posts</a>
</div>
