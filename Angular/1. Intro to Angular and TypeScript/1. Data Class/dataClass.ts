class Requestt {

    public response: string = undefined;
    public fulfiled: boolean = false;

    constructor(public methotd: string, public url: string, public version: string, public message: string) {

    }
}

let myData = new Requestt('GET', 'http://google.com', 'HTTP/1.1', '');
console.log(myData);
