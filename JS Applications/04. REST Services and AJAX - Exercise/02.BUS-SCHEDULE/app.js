function solve() {

    let btnDepart = document.querySelector('#depart');
    let btnArrive = document.querySelector('#arrive');
    let spanElement = document.querySelector('div span');
    let currentBusStopId = 'depot';
    let currentBusName = 'Depot';

    let baseUrl = 'https://judgetests.firebaseio.com/schedule/';

    function depart() {
        const url = `${baseUrl}${currentBusStopId}.json`;
        fetch(url)
            .then(res => res.json())
            .then(date => {
                spanElement.textContent = `Next stop ${date.name}`;
                currentBusStopId = date.next;
                currentBusName = date.name;
                changeBnt();
            })
            .catch(() => {
                spanElement.textContent = 'Error';
            })
    }

    function arrive() {
        changeBnt();
        spanElement.textContent = `Arriving at ${currentBusName}`
    }

    function changeBnt() {
        if (btnDepart.disabled) {
            btnDepart.disabled = false;
            btnArrive.disabled = true;
        } else {
            btnDepart.disabled = true;
            btnArrive.disabled = false;
        }
    }

    return {
        depart,
        arrive
    };
}

let result = solve();