function solve() {

  const input = document.getElementById('input');
  const output = document.getElementById('output');
  let arr = input.innerHTML.split('. ');
  let str = '';

  for (let i = 1; i <= arr.length; i++) {

    str += arr[i - 1] + '. ';

    if (i % 3 === 0) {
      addP();
    }
  }

  if (str !== '') {
    addP();
  }

  function addP() {
    let p = document.createElement('p');
    p.textContent = str;
    str = '';

    output.appendChild(p);
  }
}