function solve(input) {

    let html = '<table>';

    for (const iterator of input) {

        html += '\n\t<tr>'
        let obj = JSON.parse(iterator);

        for (const key in obj) {

            html += `\n\t\t<td>${obj[key]}</td>`;
        }

        html += '\n\t</tr>';
    }

    html += '\n</table>';

    return html;
}

console.log(solve(['{"name":"Pesho","position":"Promenliva","salary":100000}',
    '{"name":"Teo","position":"Lecturer","salary":1000}',
    '{"name":"Georgi","position":"Lecturer","salary":1000}']
))