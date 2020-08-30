function toggle() {
    const div = document.getElementById('extra');
    const button = document.getElementsByClassName('button')[0];
    button.style.textTransform = 'capitalize';

    const currentDisplay = div.style.display;

    if (currentDisplay === '' || currentDisplay ==='none') {

        div.style.display = 'block';
        button.textContent = 'Less';
    }else{
        div.style.display = 'none';
        button.textContent = 'More';
    }    
}