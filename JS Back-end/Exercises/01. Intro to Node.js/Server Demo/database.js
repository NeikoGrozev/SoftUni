let peoples = {};

function nextId() {
    let id;
    do {
        id = ('00000000' + (Math.random() * 99999999 | 0).toString(16)).slice(-8);
    }
    while (peoples[id] != undefined);

    return id;
}

function addItem(item) {
    peoples[nextId()] = item;
}

function deleteItem(id) {
    delete peoples[id];
}

module.exports = { peoples, addItem, deleteItem };