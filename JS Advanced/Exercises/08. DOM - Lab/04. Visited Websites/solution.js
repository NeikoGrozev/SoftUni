function solve() {

  const allLinks = document.querySelectorAll('a');
  const visits = document.querySelectorAll('p');

  for (let i = 0; i < allLinks.length; i++) {

    let currentLink = allLinks[i];
    let currentVisit = visits[i];

    currentLink.addEventListener('click', function () {
      let count = Number(currentVisit.innerHTML.split(' ')[1]);
      currentVisit.innerHTML = `visited ${++count} times`;
    })
  }
}