function validate() {
    document.querySelector('#email').addEventListener('change', isChange);
    let regex = /^[a-z\.]+[a-z]*@[a-z]+\.[a-z]{2,4}/;

    function isChange(e) {
        if (!regex.test(e.target.value)){
            e.target.className = 'error';
        }else{
            e.target.removeAttribute('class');
        }
    }
}