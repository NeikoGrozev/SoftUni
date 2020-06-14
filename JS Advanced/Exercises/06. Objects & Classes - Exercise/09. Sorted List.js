class List {
    constructor() {
        this.array = [];
        this.size = 0;
    }

    add(item) {
        this.array.push(item);
        this.array.sort((a, b) => a - b);
        this.size++;
    }

    remove(index) {
        if (index >= 0 && index < this.size) {
            this.array.splice(index, 1);
            this.size--;
        }
    }

    get(index){
        if (index >= 0 && index < this.size){
            return this.array[index];
        }
    }
}

let list = new List();
list.add(5);
list.add(6);
list.add(7);
list.add(3);
console.log(list.get(1));
list.remove(1);
console.log(list.get(1));

console.log(list.array)
