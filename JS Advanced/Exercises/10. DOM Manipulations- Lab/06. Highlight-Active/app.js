function focus() {
    let input = document.getElementsByTagName('input');
    Array.from(input).forEach(x =>
        x.addEventListener('focus', (e) => {
            e.target.parentElement.className = 'focused';

            x.addEventListener('blur', (e) => {
                e.target.parentElement.removeAttribute('class')
            })
        }));
}