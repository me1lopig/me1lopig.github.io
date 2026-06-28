// Script para manejar la lista de repositorios

document.addEventListener('DOMContentLoaded', function() {
  const reposContainer = document.getElementById('repos-container');
  const searchInput = document.getElementById('repo-search');
  const languageFilter = document.getElementById('language-filter');
  const sortFilter = document.getElementById('sort-filter');

  if (!reposContainer) return;

  // Cargar repositorios si el contenedor está vacío
  if (reposContainer.children.length === 0) {
    loadReposFromAPI();
  }

  // Filtrar y ordenar repositorios
  function filterAndSortRepos() {
    const searchTerm = searchInput ? searchInput.value.toLowerCase() : '';
    const selectedLanguage = languageFilter ? languageFilter.value.toLowerCase() : '';
    const sortBy = sortFilter ? sortFilter.value : 'updated';

    const repoCards = reposContainer.querySelectorAll('.repo-card');

    // Filtrar
    repoCards.forEach(card => {
      const name = card.querySelector('h3 a').textContent.toLowerCase().replace('folder', '').trim();
      const description = card.querySelector('.repo-description').textContent.toLowerCase();
      const language = card.getAttribute('data-language');
      const topics = card.getAttribute('data-topics');

      let show = true;
      
      // Filtrar por búsqueda
      if (searchTerm && !name.includes(searchTerm) && !description.includes(searchTerm) && !topics.includes(searchTerm)) {
        show = false;
      }

      // Filtrar por lenguaje
      if (selectedLanguage && language !== selectedLanguage) {
        show = false;
      }

      card.style.display = show ? 'block' : 'none';
    });

    // Ordenar (requiere más lógica, por ahora solo filtramos)
    // Para ordenar, necesitaríamos recrear el DOM, lo cual es más complejo
    // Por ahora, GitHub Pages no soporta Node.js, así que lo dejamos así
  }

  // Event listeners para filtros
  if (searchInput) {
    searchInput.addEventListener('input', filterAndSortRepos);
  }

  if (languageFilter) {
    languageFilter.addEventListener('change', filterAndSortRepos);
  }

  if (sortFilter) {
    sortFilter.addEventListener('change', filterAndSortRepos);
  }
});

// Función para cargar repositorios desde la API de GitHub
function loadReposFromAPI() {
  const reposContainer = document.getElementById('repos-container');
  if (!reposContainer) return;

  const username = 'me1lopig';
  const apiUrl = `https://api.github.com/users/${username}/repos?sort=updated&direction=desc&per_page=100`;

  // Mostrar mensaje de carga
  reposContainer.innerHTML = '<p style="text-align: center; padding: 2rem;">Cargando repositorios...</p>';

  fetch(apiUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error('Error al obtener repositorios');
      }
      return response.json();
    })
    .then(repos => {
      if (repos.length === 0) {
        reposContainer.innerHTML = '<p style="text-align: center; padding: 2rem;">No se encontraron repositorios.</p>';
        return;
      }

      // Filtrar repositorios excluyendo el de GitHub Pages
      const excludeRepos = ['me1lopig.github.io'];
      const filteredRepos = repos.filter(repo => !excludeRepos.includes(repo.name));

      // Mostrar repositorios
      reposContainer.innerHTML = '';
      filteredRepos.forEach(repo => {
        const repoCard = createRepoCard(repo);
        reposContainer.appendChild(repoCard);
      });

      // Inicializar filtros
      initFilters(filteredRepos);
    })
    .catch(error => {
      console.error('Error:', error);
      reposContainer.innerHTML = '<p style="text-align: center; padding: 2rem; color: #e74c3c;">Error al cargar repositorios. Inténtalo más tarde.</p>';
    });
}

// Función para crear una tarjeta de repositorio
function createRepoCard(repo) {
  const card = document.createElement('div');
  card.className = 'repo-card';
  card.setAttribute('data-language', repo.language ? repo.language.toLowerCase() : 'unknown');
  card.setAttribute('data-topics', repo.topics ? repo.topics.join(' ').toLowerCase() : '');
  card.setAttribute('data-stars', repo.stargazers_count || 0);
  card.setAttribute('data-updated', repo.updated_at);

  const language = repo.language || 'Unknown';
  const stars = repo.stargazers_count || 0;
  const forks = repo.forks_count || 0;
  const updatedAt = new Date(repo.updated_at).toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });

  const topicsHtml = repo.topics && repo.topics.length > 0 ?
    repo.topics.map(topic => `<span class="topic-tag">#${topic}</span>`).join('') : '';

  const homepageButton = repo.homepage ? `
    <a href="${repo.homepage}" target="_blank" rel="noopener noreferrer" class="btn btn-small btn-outline">
      <i class="fas fa-external-link-alt"></i> Demo
    </a>
  ` : '';

  card.innerHTML = `
    <div class="repo-header">
      <h3>
        <a href="${repo.html_url}" target="_blank" rel="noopener noreferrer">
          <i class="fas fa-folder"></i> ${repo.name}
        </a>
      </h3>
    </div>
    <p class="repo-description">${repo.description || 'Sin descripción'}</p>
    <div class="repo-meta">
      <span class="repo-language">
        <i class="fas fa-code"></i> ${language}
      </span>
      <span class="repo-stars">
        <i class="fas fa-star"></i> ${stars}
      </span>
      <span class="repo-forks">
        <i class="fas fa-code-branch"></i> ${forks}
      </span>
      <span class="repo-updated">
        <i class="fas fa-sync-alt"></i> ${updatedAt}
      </span>
    </div>
    ${topicsHtml ? `<div class="repo-topics">${topicsHtml}</div>` : ''}
    <div class="repo-links">
      <a href="${repo.html_url}" target="_blank" rel="noopener noreferrer" class="btn btn-small">
        <i class="fab fa-github"></i> Ver repositorio
      </a>
      ${homepageButton}
    </div>
  `;

  return card;
}

// Función para inicializar los filtros
function initFilters(repos) {
  const languageFilter = document.getElementById('language-filter');
  if (!languageFilter) return;

  // Obtener lenguajes únicos de los repositorios
  const languages = [...new Set(repos.map(repo => repo.language).filter(lang => lang))];
  
  // Añadir opciones al select de lenguajes
  languages.forEach(lang => {
    const option = document.createElement('option');
    option.value = lang;
    option.textContent = lang;
    languageFilter.appendChild(option);
  });
}
