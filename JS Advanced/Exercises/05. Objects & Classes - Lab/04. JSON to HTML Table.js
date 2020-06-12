function solve(input) {
 
    function replaceSymbol(str) {
        const string = str.replace(/&/g, '&amp;')
            .replace(/>/g, '&gt;')
            .replace(/</g, '&lt;')
            .replace(/'/g, '&#39;')
            .replace(/"/g, '&quot;');
        return string;
    }

    let arr = JSON.parse(input);

    let html = '<table>\n';

    html += '\t<tr>';

    for (let item of Object.keys(arr[0])) {
        html += `<th>${item}</th>`;
    }

    html += '</tr>\n';

    for (let obj of arr) {
        html += '\t<tr>';

        for (let key in obj) {

            let value = String(obj[key]);
            html += `<td>${replaceSymbol(value)}</td>`;
        }

        html += '</tr>\n';
    }

    html += '</table>';

    return html;
}

console.log(solve(['[{"Name":"Tomatoes & Chips","Price":2.35},{"Name":"J&B Chocolate","Price":0.96}]']))

console.log(solve(
    ['[{"Name":"Pesho <div>-a","Age":20,"City":"Sofia"},{"Name":"Gosho","Age":18,"City":"Plovdiv"},{"Name":"Angel","Age":18,"City":"Veliko Tarnovo"}]']
))