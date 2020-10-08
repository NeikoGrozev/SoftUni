function encodeAndDecodeMessages() {
    const firstButton = document.querySelectorAll('button')[0];
    const secondButton = document.querySelectorAll('button')[1];

    let firstTextarea = document.querySelectorAll('textarea')[0];
    let secondTextarea = document.querySelectorAll('textarea')[1]; 

    firstButton.addEventListener('click', () => {

        if (firstTextarea.value === '') {
            return;
        }

        let message = '';
        let inputEncoding = firstTextarea.value;

        for (let i = 0; i < inputEncoding.length; i++) {
            message += String.fromCharCode(inputEncoding.charCodeAt(i) + 1);
        }

        firstTextarea.value = '';
        secondTextarea.value = message;
    });

    secondButton.addEventListener('click', () => {

        if (secondTextarea.value === '') {
            return;
        }

        let decodingMessage = '';

        let inputDecoding = secondTextarea.value;

        for (let i = 0; i < inputDecoding.length; i++) {
            decodingMessage += String.fromCharCode(inputDecoding.charCodeAt(i) - 1);
        }

        secondTextarea.value = decodingMessage;
    });
}