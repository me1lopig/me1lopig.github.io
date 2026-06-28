// Script principal para la web

document.addEventListener('DOMContentLoaded', function() {
  // Menú móvil
  const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
  const mobileMenu = document.querySelector('.mobile-menu');

  if (mobileMenuToggle && mobileMenu) {
    mobileMenuToggle.addEventListener('click', function() {
      mobileMenu.style.display = mobileMenu.style.display === 'none' ? 'block' : 'none';
    });
  }

  // Cerrar menú móvil al hacer clic en un enlace
  const mobileMenuLinks = document.querySelectorAll('.mobile-menu a');
  mobileMenuLinks.forEach(link => {
    link.addEventListener('click', function() {
      if (mobileMenu) {
        mobileMenu.style.display = 'none';
      }
    });
  });

  // Smooth scroll para anclas
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth'
        });
      }
    });
  });

  // Añadir clase 'active' al enlace del menú según la página actual
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll('.site-nav a');
  
  navLinks.forEach(link => {
    const linkPath = new URL(link.href).pathname;
    if (linkPath === currentPath || (currentPath === '/' && linkPath === '/index.html')) {
      link.classList.add('active');
    }
  });

  // Animaciones al hacer scroll
  const animateOnScroll = function() {
    const elements = document.querySelectorAll('.repo-card, .page-content, .post-content');
    
    elements.forEach(element => {
      const elementPosition = element.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      
      if (elementPosition < windowHeight - 100) {
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
      }
    });
  };

  // Inicializar animaciones
  animateOnScroll();
  window.addEventListener('scroll', animateOnScroll);

  // Inicializar repositorios (si existe el contenedor)
  const reposContainer = document.getElementById('repos-container');
  if (reposContainer) {
    // Si el contenedor está vacío, intentar cargar repositorios desde la API
    if (reposContainer.children.length === 0) {
      loadReposFromAPI();
    }
  }
});

// Función para cargar repositorios desde la API de GitHub
function loadReposFromAPI() {
  const reposContainer = document.getElementById('repos-container');
  if (!reposContainer) return;

  const username = 'me1lopig';
  const apiUrl = `https://api.github.com/users/${username}/repos?sort=updated&direction=desc`;

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
      const filteredRepos = repos.filter(repo => {
        const excludeRepos = ['me1lopig.github.io'];
        return !excludeRepos.includes(repo.name);
      });

      // Mostrar repositorios
      reposContainer.innerHTML = '';
      filteredRepos.forEach(repo => {
        const repoCard = createRepoCard(repo);
        reposContainer.appendChild(repoCard);
      });
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
