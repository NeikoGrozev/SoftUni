function attachEventsListeners() {
    document.querySelector('#convert'). addEventListener('click', onBtnClick);

    function onBtnClick(e){
        let value = Number(document.querySelector('#inputDistance').value);
        let inputUnit = document.querySelector('#inputUnits').value;
        let outputUnit = document.querySelector('#outputUnits').value;
        let outputDistance = document.querySelector('#outputDistance');

        let convertToMeter;
        let result;

        switch(inputUnit){
            case 'km' :
                convertToMeter = value * 1000;
                break;
            case 'm' :
                convertToMeter = value * 1;
                break;
            case 'cm' :
                convertToMeter = value * 0.01;
                break;
            case 'mm' :
                convertToMeter = value * 0.001;
                break;
            case 'mi' :
                convertToMeter = value * 1609.34;
                break;
            case 'yrd' :
                convertToMeter = value * 0.9144;
                break;
            case 'ft' :
                convertToMeter = value * 0.3048;
                break;
            case 'in' :
                convertToMeter = value * 0.0254;
                break;
        }

        switch (outputUnit) {
            case 'km' :
                result = convertToMeter / 1000;
                break;
            case 'm' :
                result = convertToMeter / 1;
                break;
            case 'cm' :
                result = convertToMeter / 0.01;
                break;
            case 'mm' :
                result = convertToMeter / 0.001;
                break;
            case 'mi' :
                result = convertToMeter / 1609.344;
                break;
            case 'yrd' :
                result = convertToMeter / 0.9144;
                break;
            case 'ft' :
                result = convertToMeter / 0.3048;
                break;
            case 'in' :
                result = convertToMeter / 0.0254;
                break;
        }

        outputDistance.value = result;
    }
}