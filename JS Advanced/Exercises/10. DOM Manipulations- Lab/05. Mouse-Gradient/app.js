function attachGradientEvents() {
    let gradient = document.querySelector('#gradient');
    gradient.addEventListener('mousemove', move);
    gradient.addEventListener('mouseout', out);

    function move(e) {
        let percent = e.offsetX / (e.target.clientWidth - 1);
        percent = Math.trunc(percent * 100);
        document.querySelector('#result').innerHTML = percent + '%'
    }

    function out() {
        document.querySelector('#result').innerHTML = '';
    }
}