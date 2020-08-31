function stopwatch() {
    const startButton = document.querySelector('#startBtn');
    const stopButton = document.querySelector('#stopBtn');

    startButton.addEventListener('click', start);
    stopButton.addEventListener('click', stop);
    let sec = 1;
    let interval = '';
    
    function start() {
        startButton.disabled = true;
        stopButton.disabled = false;
        document.getElementById('time').textContent = '00:00';

        interval = setInterval(() => {
            let minutes = Math.floor(sec / 60);
            if (minutes < 10) {
                minutes = '0' + minutes;
            }
            let seconds = sec % 60;
            if (seconds < 10) {
                seconds = '0' + seconds;
            }
            document.getElementById('time').innerHTML = minutes + ":" + seconds;
            sec++;
        }, 1000);
    }

    function stop() {
        startButton.disabled = false;
        stopButton.disabled = true;

        clearInterval(interval);
        sec = 0;
    }
}