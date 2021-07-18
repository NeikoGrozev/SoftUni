abstract class Melon {
    public element: string;

    constructor(public weight: number, public melonSort: string) {

        let constructorString: string = this.constructor.toString();
        let className: string = constructorString.match(/\w+/g)[1];

        if (className == 'Melon') {
            throw new Error('Cannot instantiate directly.')
        }
        
        this.element = className.split('melon').toString();
    }

    public elementIndex(): number {
        return this.weight * this.melonSort.length;
    }

    public toString(): string {
   
        let result = `Element: ${this.element}`;
        result += '\n';
        result += `Sort: ${this.melonSort}`;
        result += '\n';
        result += `Element Index: ${this.elementIndex()}`

        return result;
    }
}

class Watermelon extends Melon {
    constructor(public weight: number, public melonSort: string) {
        super(weight, melonSort);
    }
}

class Firemelon extends Melon {
    constructor(public weight: number, public melonSort: string) {
        super(weight, melonSort);
    }
}

class Earthmelon extends Melon {
    constructor(public weight: number, public melonSort: string) {
        super(weight, melonSort);
    }
}

class Airmelon extends Melon {  
    constructor(public weight: number, public melonSort: string) {
        super(weight, melonSort);
    }
}

class Melolemonmelon extends Watermelon {
    public counter: number;
    public elements: any[];

    constructor(public weight: number, public melonSort: string) {
        super(weight, melonSort);
        this.counter = 0;
        this.elements = [Watermelon, Firemelon, Earthmelon, Airmelon];
    }

    morph(): void{
        this.counter++;
    }

    toString(): string{
        
        return new this.elements[this.counter % 4](this.weight, this.melonSort).toString();
    }
}

//let test : Melon = new Melon(100, "Test");
//Throws error

let melolemonmelon: Melolemonmelon = new Melolemonmelon(12.5, "Kingsize");
console.log(melolemonmelon.toString());