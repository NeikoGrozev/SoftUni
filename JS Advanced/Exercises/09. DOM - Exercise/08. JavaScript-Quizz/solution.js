function solve() {

  let rightAnswers = 0;
  let index = 1;
  const rightAnswersList = ["onclick", "JSON.stringify()", "A programming API for HTML and XML documents"];

  Array.from(document.querySelectorAll('section'))
    .forEach(x => x.addEventListener('click', (e) => {

      const answer = e.target.innerText;
      if (rightAnswersList.includes(answer)) {
        rightAnswers++;
      }

      x.style.display = 'none';
      x.nextElementSibling.style.display = 'block';

      if (index === 3) {
        showResult()
      }

      index++;
    }));

  function showResult() {

    const result = document.querySelector('#results > li > h1');

    if (rightAnswers === 3) {
      result.innerHTML = "You are recognized as top JavaScript fan!";
    }else{
      result.innerHTML = `You have ${rightAnswers} right answers`;
    }
  }
}
