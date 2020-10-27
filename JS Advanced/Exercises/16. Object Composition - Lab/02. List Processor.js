function solve(input) {

    let output = [];   

    let commands = (function() {
        return {
            add: (element) => output.push(element),
            remove: (element) => output = output.filter(item => item !== element),
            print: () => console.log(output.join(','))
        }
    })();

    for (const item of input) {

        let [command, word] = item.split(' ');
        commands[command](word !== undefined ? word : undefined)
    }
}

solve(['add hello', 'add again', 'remove hello', 'add again', 'print'])