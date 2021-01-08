function getInfo() {
    let stopId = document.querySelector('#stopId');
    let bnt = document.querySelector('#submit');
    let stopName = document.querySelector('#stopName');
    let ulElement = document.querySelector('#buses');
    let validBuses = ['1287', '1308', '1327', '2334']
    
    bnt.addEventListener('click', () => {
        let url = `https://judgetests.firebaseio.com/businfo/${stopId.value}.json`

        if (!validBuses.includes(stopId.value)) {
            ulElement.innerHTML = '';
            stopName.textContent = 'Error';
        } else {
            fetch(url)
                .then(res => res.json())
                .then(date => {
                    stopName.textContent = date.name;
                    let buses = Object.keys(date.buses).map(key => `<li>Bus ${key} arrives in ${date.buses[key]} minutes</li>`).join();
                    console.log(buses);
                    ulElement.innerHTML = buses;
                });
        }

        stopId.value = '';
    });
}