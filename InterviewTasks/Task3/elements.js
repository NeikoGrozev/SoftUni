let arr = [];
let mainElement = document.querySelector('ul#bottomMenu');
if (mainElement) {
    arr.push(mainElement.tagName.toLowerCase())
}

if (mainElement.children) {
    getAllChildren(mainElement);
}

function getAllChildren(element) {

    for (let i = 0; i < element.children.length; i++) {
        const currentElement = element.children[i];
        arr.push(currentElement.tagName.toLowerCase());

        if (currentElement.children) {
            getAllChildren(currentElement);
        }
    }
}

console.log(arr);