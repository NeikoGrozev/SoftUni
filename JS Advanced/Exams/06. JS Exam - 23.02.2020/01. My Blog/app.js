function solve() {

   let articles = document.querySelector('.site-content main section');
   let arhives = document.querySelector('.archive-section ul');
   let createButton = document.querySelector('form button');
   createButton.addEventListener('click', addArticle)

   function addArticle(e) {
      e.preventDefault();

      let creator = document.querySelector('#creator');
      let title = document.querySelector('#title');
      let category = document.querySelector('#category');
      let content = document.querySelector('#content');

      // if (!creator.value.trim() || !title.value.trim() || !category.value.trim() || !content.value.trim()) {
      //    return;
      // }

      let article = createElement('article');
      let h1 = createElement('h1', title.value);
      article.appendChild(h1);

      let p = createElement('p', 'Category: ');
      let strong = createElement('strong', category.value);
      p.appendChild(strong);
      article.appendChild(p);

      let p2 = createElement('p', 'Creator: ');
      let strong2 = createElement('strong', creator.value);
      p2.appendChild(strong2);
      article.appendChild(p2);

      let p3 = createElement('p', content.value);
      article.appendChild(p3);

      let div = createElement('div');
      div.setAttribute('class', 'buttons');

      let deleteButton = createElement('button', 'Delete');
      deleteButton.setAttribute('class', 'btn delete');
      deleteButton.addEventListener('click', deleteArticle)
      div.appendChild(deleteButton);

      let archiveButton = createElement('button', 'Archive');
      archiveButton.setAttribute('class', 'btn archive');
      archiveButton.addEventListener('click', archiveArticle)
      div.appendChild(archiveButton);

      article.appendChild(div);
      articles.appendChild(article);

      creator.value = '';
      title.value = '';
      category.value = '';
      content.value = '';
   }

   function deleteArticle(e) {
      e.target.parentElement.parentElement.remove();
   }

   function archiveArticle(e) {
      let currentArticle = e.target.parentElement.parentElement;
      let currentTitle = currentArticle.firstChild.textContent;
      currentArticle.remove();

      let createLiElement = createElement('li', currentTitle);
      arhives.appendChild(createLiElement);

      let allLiElement = Array.from(arhives.querySelectorAll('li'));
      arhives.innerText = '';
      allLiElement.sort((a, b) => a.textContent.localeCompare(b.textContent))
         .forEach(x => arhives.appendChild(x));
   }

   function createElement(type, text) {
      let element = document.createElement(type);

      if (text) {
         element.textContent = text;
      }

      return element;
   }
}