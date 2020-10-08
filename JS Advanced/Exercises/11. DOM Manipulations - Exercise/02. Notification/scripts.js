function notify(message) {
    const divContainer = document.querySelector('#notification');
    divContainer.textContent = message;
    divContainer.style.display = 'block';

    setTimeout(() => {
    divContainer.style.display = 'none';

    }, 2000);
}