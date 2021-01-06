function loadRepos() {
   let divElement = document.querySelector('#res');
   let url = 'https://api.github.com/users/testnakov/repos';

   const httpRequest = new XMLHttpRequest();
   httpRequest.addEventListener("loadend", load => {
      if (httpRequest.readyState == 4 && httpRequest.status == 200) {
         divElement.textContent = httpRequest.responseText;
      }
   });

   httpRequest.open('GET', url);
   httpRequest.send();
}