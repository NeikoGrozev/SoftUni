function growingWord() {

  const currentP = document.querySelector('#exercise > p');
  let px = 2;
  let color = {
    "blue": 'green',
    "green": 'red',
    "red": 'blue'
  };

  if (!currentP.hasAttribute('style')) {
    currentP.setAttribute('style', `color: blue; font-size: ${px}px`);
  } else {

    let currentPx = currentP.style["font-size"];
    px = currentPx.substr(0, currentPx.length - 2) * 2;
    let currentColor = currentP.style.color;
    currentP.setAttribute("style", `color:${color[currentColor]}; font-size: ${px}px`)
  }
}