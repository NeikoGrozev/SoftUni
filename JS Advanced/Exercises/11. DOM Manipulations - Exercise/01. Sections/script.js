function create(words) {
   const divContainer = document.querySelector('#content');

   for (const word of words) {

      const divElement = document.createElement('div');
      const pElement = document.createElement('p');

      pElement.textContent = word;
      pElement.style.display = 'none';

      divElement.appendChild(pElement);
      divElement.addEventListener('click', () => {
         pElement.style.display = 'block';
      });

      divContainer.appendChild(divElement);
   }
}