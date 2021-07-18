class Box<T>{
    private _boxes = [];

    public add(element: T){
        this._boxes.push(element);
    }

    public remove(){
        this._boxes.shift();
    }

    count(): number{
        return this._boxes.length;
    }
}

let boxNumber = new Box<Number>();
boxNumber.add(1);
boxNumber.add(2);
boxNumber.add(3);
console.log(boxNumber.count());

let boxString = new Box<String>();
boxString.add("Pesho");
boxString.add("Gosho");
console.log(boxString.count());
boxString.remove();
console.log(boxString.count());
