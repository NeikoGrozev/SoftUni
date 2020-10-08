function solve() {
   document.querySelector('.cards').addEventListener('click', pushCard);

   function pushCard(e) {

      let card;

      if (e.target.nodeName == 'IMG' && e.target.src.endsWith('images/card.jpg')) {
         card = e.target;
      } else {
         return;
      }

      let resultSpans = document.querySelector('#result').children;
      let parent = card.parentNode.id;

      if (resultSpans[0].textContent != '' && parent == 'player1Div'
         || resultSpans[2].textContent != '' && parent == 'player2Div') {
         return;
      }

      card.src = "images/whiteCard.jpg";

      if (parent == 'player1Div') {
         resultSpans[0].textContent = card.name;
      } else if (parent = 'player2Div') {
         resultSpans[2].textContent = card.name;
      }

      if (resultSpans[0].textContent != '' && resultSpans[2].textContent != '') {

         let win;
         let lost;

         let firstPlayer = Number(resultSpans[0].textContent);
         let secondPlayer = Number(resultSpans[2].textContent);

         if (firstPlayer > secondPlayer) {
            win = document.querySelector(`#player1Div img[name="${firstPlayer}"]`)
            lost = document.querySelector(`#player2Div img[name="${secondPlayer}"]`)
         } else {
            win = document.querySelector(`#player2Div img[name="${secondPlayer}"]`)
            lost = document.querySelector(`#player1Div img[name="${firstPlayer}"]`)
         }

         win.style.border = '2px solid green';
         lost.style.border = '2px solid red';

         let history = document.querySelector('#history')
         history.textContent += `[${firstPlayer} vs ${secondPlayer}] `;

         resultSpans[0].textContent = '';
         resultSpans[2].textContent = '';
      }
   }
}