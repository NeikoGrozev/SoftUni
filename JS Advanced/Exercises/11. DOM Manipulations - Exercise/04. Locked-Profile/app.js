function lockedProfile() {
    const profileDivs = document.querySelectorAll('.profile');

    for (const profileDiv of profileDivs) {
        
        const hiddenField = profileDiv.querySelector('div');
        const button = profileDiv.querySelector('button');
        const inputElements = profileDiv.querySelectorAll('input[type="radio"]');

        button.addEventListener('click', () => {
            let buttonText = button.textContent;

            if(inputElements[1].checked === true){
                if(buttonText === 'Show more'){
                    hiddenField.style.display = 'block';
                    button.textContent = 'Hide it';
                }else{
                    hiddenField.style.display = 'none';
                    button.textContent = 'Show more';
                }

            }
        });
    }
}