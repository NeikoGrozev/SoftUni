function solve(arr) {

    const methods = {
        counter: 1,
        add: 'push',
        remove: 'pop',
    };

    let result = arr.reduce((acc, item) => {
        acc[methods[item]](methods.counter++);
        return acc;
    }, []);

    return result.join('\n') || 'Empty';
}

console.log(solve(['add',
    'add',
    'add',
    'add']
));

console.log(solve([ 'add', 
    'add', 
    'remove', 
    'add', 
    'add' ]));

console.log(solve([
    'remove',
    'remove',
    'remove' ]));