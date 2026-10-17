document.addEventListener('DOMContentLoaded', function () {
  const reposContainer = document.getElementById('repos-container');
  const searchInput = document.getElementById('repo-search');
  const languageFilter = document.getElementById('language-filter');
  const sortFilter = document.getElementById('sort-filter');

  if (!reposContainer) return;

  function filterAndSortRepos() {
    const searchTerm = searchInput ? searchInput.value.trim().toLowerCase() : '';
    const selectedLanguage = languageFilter ? languageFilter.value.toLowerCase() : '';
    const sortBy = sortFilter ? sortFilter.value : 'updated';

    const cards = Array.from(reposContainer.querySelectorAll('.repo-card'));

    cards.forEach(card => {
      const name = (card.querySelector('h3 a')?.textContent || '').toLowerCase();
      const description = (card.querySelector('.repo-description')?.textContent || '').toLowerCase();
      const language = (card.getAttribute('data-language') || '').toLowerCase();
      const topics = (card.getAttribute('data-topics') || '').toLowerCase();

      let show = true;

      if (searchTerm && !name.includes(searchTerm) && !description.includes(searchTerm) && !topics.includes(searchTerm)) {
        show = false;
      }

      if (selectedLanguage && language !== selectedLanguage) {
        show = false;
      }

      card.style.display = show ? 'block' : 'none';
    });

    if (sortBy === 'stars') {
      const sorted = cards.sort((a, b) => {
        const aStars = Number(a.getAttribute('data-stars') || 0);
        const bStars = Number(b.getAttribute('data-stars') || 0);
        return bStars - aStars;
      });

      sorted.forEach(card => reposContainer.appendChild(card));
    }
  }

  if (searchInput) searchInput.addEventListener('input', filterAndSortRepos);
  if (languageFilter) languageFilter.addEventListener('change', filterAndSortRepos);
  if (sortFilter) sortFilter.addEventListener('change', filterAndSortRepos);

  async function loadReposFromAPI() {
    const username = 'me1lopig';
    const apiUrl = `https://api.github.com/users/${username}/repos?sort=updated&direction=desc&per_page=100`;

    reposContainer.innerHTML = '<div class="state-card">Cargando repositorios...</div>';

    try {
      const response = await fetch(apiUrl, {
        headers: {
          Accept: 'application/vnd.github+json'
        }
      });

      if (!response.ok) {
        throw new Error('GitHub API no disponible');
      }

      const repos = await response.json();
      const filteredRepos = repos.filter(repo => !['me1lopig.github.io'].includes(repo.name));

      if (!filteredRepos.length) {
        reposContainer.innerHTML = '<div class="state-card">No se encontraron repositorios.</div>';
        return;
      }

      reposContainer.innerHTML = '';
      filteredRepos.forEach(repo => reposContainer.appendChild(createRepoCard(repo)));
      initFilters(filteredRepos);
      filterAndSortRepos();
    } catch (error) {
      console.error(error);
      reposContainer.innerHTML = '<div class="state-card state-card-error">No se pudieron cargar los repositorios en este momento.</div>';
    }
  }

  function createRepoCard(repo) {
    const card = document.createElement('article');
    card.className = 'repo-card';
    card.setAttribute('data-language', repo.language ? repo.language.toLowerCase() : 'unknown');
    card.setAttribute('data-topics', repo.topics ? repo.topics.join(' ').toLowerCase() : '');
    card.setAttribute('data-stars', repo.stargazers_count || 0);
    card.setAttribute('data-updated', repo.updated_at || '');

    const language = repo.language || 'Unknown';
    const stars = repo.stargazers_count || 0;
    const forks = repo.forks_count || 0;
    const updatedAt = repo.updated_at
      ? new Date(repo.updated_at).toLocaleDateString('es-ES', {
          day: 'numeric',
          month: 'short',
          year: 'numeric'
        })
      : 'Sin fecha';

    const topicsHtml = repo.topics && repo.topics.length > 0
      ? repo.topics.map(topic => `<span class="topic-tag">#${topic}</span>`).join('')
      : '';

    const homepageButton = repo.homepage
      ? `<a href="${repo.homepage}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary btn-small"><i class="fas fa-external-link-alt"></i> Demo</a>`
      : '';

    card.innerHTML = `
      <div class="repo-header">
        <h3>
          <a href="${repo.html_url}" target="_blank" rel="noopener noreferrer">
            <i class="fas fa-folder"></i> ${repo.name}
          </a>
        </h3>
      </div>
      <p class="repo-description">${repo.description || 'Sin descripción disponible.'}</p>
      <div class="repo-meta">
        <span class="repo-language"><i class="fas fa-code"></i> ${language}</span>
        <span class="repo-stars"><i class="fas fa-star"></i> ${stars}</span>
        <span class="repo-forks"><i class="fas fa-code-branch"></i> ${forks}</span>
        <span class="repo-updated"><i class="fas fa-calendar-day"></i> ${updatedAt}</span>
      </div>
      ${topicsHtml ? `<div class="repo-topics">${topicsHtml}</div>` : ''}
      <div class="repo-links">
        <a href="${repo.html_url}" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-small">
          <i class="fab fa-github"></i> Ver repositorio
        </a>
        ${homepageButton}
      </div>
    `;

    return card;
  }

  function initFilters(repos) {
    const languageFilter = document.getElementById('language-filter');
    if (!languageFilter) return;

    const languages = [...new Set(repos.map(repo => repo.language).filter(Boolean))];
    languageFilter.innerHTML = '<option value="">Todos los lenguajes</option>';

    languages.forEach(lang => {
      const option = document.createElement('option');
      option.value = lang;
      option.textContent = lang;
      languageFilter.appendChild(option);
    });
  }

  if (reposContainer.children.length === 0) {
    loadReposFromAPI();
  }
});
