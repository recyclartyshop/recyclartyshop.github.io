fetch('../articles.json')
  .then(response => response.json())
  .then(data => {
    const categoriesSection = document.getElementById('categories');

    // Parcours des catégories
    data.categories.forEach(category => {
      const categoryDiv = document.createElement('div');
      categoryDiv.classList.add('category');

      // Parcours des articles dans chaque catégorie
      category.articles.forEach(article => {
        const articleLink = document.createElement('a');
        articleLink.classList.add('category-link');
        articleLink.href = `./pages/${article.dossier}.html`;

        const imagesPath = `../images/ceramiques/${article.dossier}/`;
        const images = getImagesInFolder(imagesPath);

        images.forEach(image => {
          const articleImage = document.createElement('img');
          articleImage.classList.add('category-image');
          articleImage.src = imagesPath + image;
          articleImage.alt = article.nom;

          articleLink.appendChild(articleImage);
          categoryDiv.appendChild(articleLink);
        });
      });

      categoriesSection.appendChild(categoryDiv);
    });
  });

function getImagesInFolder(folderPath) {
  const images = [];
  const imageExtensions = ['.JPG', '.jpeg', '.png', '.gif'];

  const files = fetch(folderPath)
    .then(response => response.text())
    .then(data => {
      const parser = new DOMParser();
      const html = parser.parseFromString(data, 'text/html');
      const links = html.getElementsByTagName('a');

      for (let i = 0; i < links.length; i++) {
        const filename = links[i].href.split('/').pop().toLowerCase();
        if (imageExtensions.some(ext => filename.endsWith(ext))) {
          images.push(filename);
        }
      }
    });

  return images;
}

