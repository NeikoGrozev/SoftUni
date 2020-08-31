function deleteByEmail() {
    const input = document.querySelector('input').value.trim();
    const emails = document.querySelectorAll('tr td:nth-child(2)');
    const result = document.querySelector('#result');
    let isDelete = false;

    for (const email of emails) {
        let currentEmail = email.innerHTML;

        if (currentEmail == input) {
            email.parentElement.remove();
            isDelete = true;
        }
    }

    (isDelete === true) ? result.innerText = 'Deleted.' : result.innerText = 'Not found.';
}