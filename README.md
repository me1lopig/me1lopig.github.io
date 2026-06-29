# me1lopig.github.io

Página web personal de **Germán López Pineda**, construida con **Jekyll** y alojada en **GitHub Pages**.

## 📜 Descripción

Esta página web sirve como:
- **Portal centralizado** para todos mis repositorios de GitHub.
- **Blog técnico** donde comparto posts sobre desarrollo, mecánica y más.

## 🗂️ Estructura del proyecto

```bash
me1lopig.github.io/
├── _config.yml              # Configuración de Jekyll
├── _data/                   # Datos estáticos (repositorios, redes sociales)
│   ├── repos.yml            # Lista de repositorios (opcional)
│   └── social.yml           # Enlaces a redes sociales
├── _includes/               # Componentes reutilizables
│   ├── header.html          # Encabezado del sitio
│   ├── footer.html          # Pie de página
│   ├── repo-card.html       # Tarjeta de repositorio
│   └── ...
├── _layouts/                # Plantillas
│   ├── default.html         # Plantilla base
│   ├── home.html            # Plantilla para la página principal
│   ├── page.html            # Plantilla para páginas estáticas
│   └── post.html            # Plantilla para posts
├── _posts/                  # Posts del blog
│   └── 2024-06-28-bienvenidos.md
├── assets/                  # Archivos estáticos
│   ├── css/                 # Hojas de estilo
│   │   └── main.css         # Estilos principales
│   ├── js/                  # Scripts
│   │   ├── main.js          # Script principal
│   │   └── repos.js         # Script para repositorios
│   └── images/              # Imágenes
├── repos/                   # Página de repositorios
│   └── index.html
├── posts/                   # Página de blog
│   └── index.html
├── index.md                 # Página principal
├── 404.html                 # Página de error 404
├── Gemfile                  # Dependencias de Ruby
├── Gemfile.lock
└── README.md
```

## 🚀 Cómo ejecutar localmente

1. **Instalar Ruby y Jekyll**:
   ```bash
   # Instalar Ruby (en Linux)
   sudo apt-get install ruby-full build-essential
   
   # Instalar Bundler y Jekyll
   gem install bundler jekyll
   ```

2. **Instalar dependencias**:
   ```bash
   bundle install
   ```

3. **Ejecutar el servidor de desarrollo**:
   ```bash
   bundle exec jekyll serve
   ```

4. **Abrir en el navegador**:
   - [http://localhost:4000](http://localhost:4000)

## 📝 Cómo añadir contenido

### Añadir un nuevo post
1. Crea un archivo en `_posts/` con el formato `AAAA-MM-DD-titulo.md`.
2. Añade el front matter:
   ```markdown
   ---
   layout: post
   title: "Título del post"
   date: 2024-06-28 10:00:00 +0200
   categories: [Categoría]
   tags: [tag1, tag2]
   author: Germán López Pineda
   excerpt: "Resumen del post"
   ---
   ```
3. Escribe el contenido en Markdown.

### Añadir un repositorio
Los repositorios se cargan automáticamente desde la **API de GitHub** en la página principal y en `/repos/`.

Si prefieres usar datos estáticos, edita `_data/repos.yml`:
```yaml
- name: nombre-del-repo
  description: Descripción del repositorio
  html_url: https://github.com/me1lopig/nombre-del-repo
  language: Python
  stargazers_count: 10
  forks_count: 2
  updated_at: 2024-06-28
  homepage: https://demo.example.com
  topics: [tag1, tag2]
  featured: true
```

## ⚙️ Configuración

Edita `_config.yml` para personalizar:
- Título y descripción del sitio.
- Información del autor (nombre, email, redes sociales).
- Configuración de Jekyll (plugins, paginación, etc.).

## 📜 Licencia

Este proyecto está bajo la licencia **MIT**. Consulta el archivo `LICENSE` para más detalles.

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Si encuentras algún error o tienes alguna sugerencia, abre un **issue** o envía un **pull request**.

## 📧 Contacto

- **Email**: [me1lopig@uco.es](mailto:me1lopig@uco.es)
- **GitHub**: [me1lopig](https://github.com/me1lopig)
- **LinkedIn**: [Germán López Pineda](https://linkedin.com/in/germán-lópez-pineda-1a2b3c4)
