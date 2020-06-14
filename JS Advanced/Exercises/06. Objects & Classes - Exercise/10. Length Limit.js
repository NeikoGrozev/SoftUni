class Stringer {
    constructor(innerString, innerLength) {
        this.innerString = innerString,
            this.innerLength = innerLength
    }

    increase(length) {
        this.innerLength += length;
    }

    decrease(length) {
        this.innerLength -= length;
        
        if (this.innerLength < 0) {
            this.innerLength = 0;
        }
    }

    toString() {
        if (this.innerLength === 0) {
            return '...';
        } else if (this.innerString.length <= this.innerLength) {
            return this.innerString;
        }else{
            let str = this.innerString.slice(0, this.innerLength) + '...';
            return str;
        }
    }
}


let test = new Stringer("Test", 5);
console.log(test.toString()); // Test

test.decrease(3);
console.log(test.toString()); // Te...

test.decrease(5);
console.log(test.toString()); // ...

test.increase(4);
console.log(test.toString()); // Test
