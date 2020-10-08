function solve() {
  let [input, output] = document.querySelectorAll('textarea');
  let [generate, buy] = document.querySelectorAll('button');
  let tbody = document.querySelector('tbody');

  document.querySelector('tr > td > input').disabled = false;

  generate.addEventListener('click', onGenerate);
  buy.addEventListener('click', onBuy);

  function onGenerate(e) {

    let data = JSON.parse(input.value);

    for (const item of data) {

      let row = document.createElement('tr');
      let html = `<td><img src="${item.img}"></td><td><p>${item.name}</p></td><td><p>${item.price}</p></td><td><p>${item.decFactor}</p></td><td><input type="checkbox" /></td>`
      row.innerHTML = html;
      tbody.appendChild(row);
    }

    input.value = '';
  }

  function onBuy(e) {

    let boughtItems = [...tbody.querySelectorAll('input')]
      .filter(x => x.checked)
      .map(x => x.parentNode.parentNode)
      .map(row => ({
        name: row.children[1].textContent.trim(),
        totalPrice: Number(row.children[2].textContent),
        decFactor: Number(row.children[3].textContent)
      }));

    const result = [
      `Bought furniture: ${boughtItems.map(x => x.name).join(', ')}`,
      `Total price: ${boughtItems.reduce((acc, c) => acc + c.totalPrice, 0).toFixed(2)}`,
      `Average decoration factor: ${boughtItems.reduce((acc, c) => acc + c.decFactor, 0) / boughtItems.length}`
    ]

    output.value = result.join('\n');
  }
}