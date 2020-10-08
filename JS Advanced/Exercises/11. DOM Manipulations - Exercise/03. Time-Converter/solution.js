function attachEventsListeners() {
    const daysButton = document.querySelector('#daysBtn').addEventListener('click', convertDays);
    const hoursButton = document.querySelector('#hoursBtn').addEventListener('click', convertHouts);
    const minutesButton = document.querySelector('#minutesBtn').addEventListener('click', convertMinutes);
    const secondsButton = document.querySelector('#secondsBtn').addEventListener('click', convertSeconds);

    const days = document.querySelector('#days');
    const hours = document.querySelector('#hours');
    const minutes = document.querySelector('#minutes');
    const seconds = document.querySelector('#seconds');

    const time = {
        days: 1,
        hours: 24,
        minutes: 60,
        seconds: 3600
    }

    function convertDays(e) {
        const currentDays = Number(days.value);
        hours.value = currentDays * time.hours;
        minutes.value = currentDays * time.hours * time.minutes;
        seconds.value = currentDays * time.hours * time.seconds;
    }

    function convertHouts(e) {
        const currentHours = Number(hours.value);
        days.value = currentHours / time.hours;
        minutes.value = currentHours * time.minutes;
        seconds.value = currentHours * time.seconds;
    }

    function convertMinutes(e) {
        const currentMinutes = Number(minutes.value);
        days.value = currentMinutes / time.hours / time.minutes;
        hours.value = currentMinutes / time.minutes;
        seconds.value = currentMinutes * time.minutes;
    }

    function convertSeconds(e) {
        const currentSeconds = Number(seconds.value);
        days.value = currentSeconds / time.hours / time.seconds;
        hours.value = currentSeconds / time.seconds;
        minutes.value = currentSeconds / time.minutes;
    }
}