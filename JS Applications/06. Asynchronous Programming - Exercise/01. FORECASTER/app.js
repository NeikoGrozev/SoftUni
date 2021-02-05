function attachEvents() {
    let input = document.querySelector('#location');
    let button = document.querySelector('#submit')
    let errorDiv = '';

    button.addEventListener('click', submit);

    let baseUrl = 'https://judgetests.firebaseio.com/';

    let contentDiv = document.querySelector('#content');
    let forecastDiv = document.querySelector('#forecast');
    let currentDiv = document.querySelector('#current');
    let upcomingDiv = document.querySelector('#upcoming');

    let symbols = {
        Sunny: '&#x2600', // ☀
        'Partly sunny': '&#x26C5', // ⛅
        Overcast: '&#x2601', // ☁
        Rain: '&#x2614', // ☂
        Degrees: '&#176',   // °

    }

    function submit() {
        removeError();
        removeForecast();

        if (!input.value) {
            forecastDiv.style.display = 'none';

            return;
        }

        fetch(`${baseUrl}locations.json`)
            .then(res => res.json())
            .then(date => {
                let city = date.find(x => x.name == input.value);

                createError();

                if (!city) {
                    input.value = '';
                    getError();
                    errorDiv.style.display = 'block';
                    forecastDiv.style.display = 'none';

                    return;
                }

                let today = fetch(`${baseUrl}forecast/today/${city.code}.json `)
                    .then(res => res.json());

                let upcoming = fetch(`${baseUrl}forecast/upcoming/${city.code}.json`)
                    .then(res => res.json());

                Promise.all([today, upcoming])
                    .then(([todayDate, upcomingDate]) => {
                        createToday(todayDate);
                        createUpcoming(upcomingDate);

                        input.value = '';
                        removeError();
                        forecastDiv.style.display = 'block';
                    });
            });

    }

    function createToday(date) {
        let forecasts = createElement('div', 'forecasts');

        let currentSymbol = symbols[date.forecast.condition];
        let conditionSymbolSpan = createElement('span', 'condition symbol', currentSymbol)
        let conditionSpan = createElement('span', 'condition');
        let forecastCitySpan = createElement('span', 'forecast-data', date.name);
        let currentHighLowText = `${date.forecast.low}${symbols.Degrees}/${date.forecast.high}${symbols.Degrees}`;
        let forecastHighLowSpan = createElement('span', 'forecast-data', currentHighLowText);
        let forecastConditionSpan = createElement('span', 'forecast-data', `${date.forecast.condition}`);

        forecasts.appendChild(conditionSymbolSpan);
        conditionSpan.appendChild(forecastCitySpan);
        conditionSpan.appendChild(forecastHighLowSpan);
        conditionSpan.appendChild(forecastConditionSpan);
        forecasts.appendChild(conditionSpan);

        currentDiv.appendChild(forecasts);
    }

    function createUpcoming(date) {
        let forecastInfo = createElement('div', 'forecast-info');
        date.forecast.map(x => {
            let upcomingSpan = createElement('span', 'upcoming');
            let symbolSpan = createElement('span', 'symbol', symbols[x.condition]);
            let currentHighLowText = `${x.low}${symbols.Degrees}/${x.high}${symbols.Degrees}`;
            let currentForecastHighLowSpan = createElement('span', 'forecast-data', currentHighLowText);
            let currentForecastConditionSpan = createElement('span', 'forecast-data', x.condition);

            upcomingSpan.appendChild(symbolSpan);
            upcomingSpan.appendChild(currentForecastHighLowSpan);
            upcomingSpan.appendChild(currentForecastConditionSpan);

            forecastInfo.appendChild(upcomingSpan);
        });

        upcomingDiv.appendChild(forecastInfo);
    }

    function createError() {
        let tempErrorDiv = createElement('div');
        tempErrorDiv.setAttribute('id', 'error');
        tempErrorDiv.setAttribute('style', 'display: none');
        tempErrorDiv.style.fontSize = '2em';
        tempErrorDiv.style.textAlign = 'center';
        let labelDiv = createElement('div', 'label', 'ERROR');

        tempErrorDiv.appendChild(labelDiv);
        contentDiv.appendChild(tempErrorDiv);
    }

    function getError() {
        errorDiv = document.querySelector('#error');
    }

    function removeError() {
        getError();

        if (errorDiv) {
            errorDiv.remove();
        }
    }

    function removeForecast() {
        let forecasts = document.querySelector('#current .forecasts');
        let forecastInfo = document.querySelector('#upcoming .forecast-info')

        if (forecasts && forecastInfo) {
            forecasts.remove();
            forecastInfo.remove();
        }
    }

    function createElement(type, classes, content) {
        let element = document.createElement(type);

        if (classes) {
            element.setAttribute('class', classes)
        }

        if (content) {
            element.innerHTML = content;
        }

        return element;
    }
}

attachEvents();