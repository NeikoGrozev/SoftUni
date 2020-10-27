function classHierarchy() {
    class Figure {
        constructor(unit = 'cm') {
            this.defaultUnit = unit;
        };

        units = {
            m: 0.1,
            cm: 1,
            mm: 10
        };

        changeUnits(x) {
            this.defaultUnit = x;
        }

        area() {
            return NaN;
        }

        toString() {
            return `Figures units: ${this.defaultUnit} Area: ${this.area}`
        }
    }

    class Circle extends Figure {
        constructor(r, unit) {
            super(unit);
            this.radius = r;
        }

        get area() {
            return Math.PI * this.r ** 2
        }

        get r() {
            return this.radius * this.units[this.defaultUnit];
        }

        toString() {
            return `${super.toString()} - radius: ${this.r}`
        }
    }

    class Rectangle extends Figure {
        constructor(width, height, unit) {
            super(unit);
            this._width = width;
            this._height = height;
        }

        get width() {
            return this._width * this.units[this.defaultUnit];
        }

        set width(value) {
            this._width = value;
        }

        get height() {
            return this._height * this.units[this.defaultUnit];
        }

        set height(value) {
            this._height = value;
        }

        get area() {
            return this.width * this.height
        }

        toString() {
            return `${super.toString()} - width: ${this.width}, height: ${this.height}`
        }
    }

    return { Figure, Circle, Rectangle };
}

let classes = classHierarchy();
let Figure = classes.Figure;
let Rectangle = classes.Rectangle;
let Circle = classes.Circle;

let c = new Circle(5);
console.log(c.area); // 78.53981633974483
console.log(c.toString()); // Figures units: cm Area: 78.53981633974483 - radius: 5

let r = new Rectangle(3, 4, 'mm');
console.log(r.area); // 1200 
console.log(r.toString()); //Figures units: mm Area: 1200 - width: 30, height: 40

r.changeUnits('cm');
console.log(r.area); // 12
console.log(r.toString()); // Figures units: cm Area: 12 - width: 3, height: 4

c.changeUnits('mm');
console.log(c.area); // 7853.981633974483
console.log(c.toString()) // Figures units: mm Area: 7853.981633974483 - radius: 50