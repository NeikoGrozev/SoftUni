let registerBtnNav = document.querySelector('#registerBtnNav');
let loginBtnNav = document.querySelector('#loginBtnNav')
let logoutBtnNav = document.querySelector('#logoutBtnNav');
let registerBtn = document.querySelector('#registerBtn');
let loginBtn = document.querySelector('#loginBtn');
let registerDiv = document.querySelector('#register');
let loginDiv = document.querySelector('#login');
let loginMessage = document.querySelector('#loginMessage');
let errorMessage = document.querySelector('#errorMessage');
let passwordErrorMessage = document.querySelector('#passwordErrorMessage');


registerBtnNav.addEventListener('click', showRegisterForm)
loginBtnNav.addEventListener('click', showLoginForm);
logoutBtnNav.addEventListener('click', logout);

function showRegisterForm(e) {
    if (loginDiv.style.display = 'block') {
        loginDiv.style.display = 'none'
    }

    registerDiv.style.display = 'block';

    registerBtn.addEventListener('click', register);
}

function showLoginForm(e) {
    if (registerDiv.style.display = 'block') {
        registerDiv.style.display = 'none';
    }

    loginDiv.style.display = 'block';

    loginBtn.addEventListener('click', login);
}

function register(e) {
    let username = document.querySelector('#regUsername').value;
    let email = document.querySelector('#regEmail').value;
    let password = document.querySelector('#regPassword').value;
    let passwordRepeat = document.querySelector('#regPassword-repeat').value;

    if (username && email && password && password == passwordRepeat) {

        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
                // Signed in 
                var user = userCredential.user;

                user.updateProfile({
                    displayName: `${username}`,
                }).then(function () {
                    // Update successful.
                    login();
                }).catch(function (error) {
                    // An error happened.
                });
                // ...
            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                // ..
            });
    } else if (password != passwordRepeat) {
        showPasswordErrorMessage();
    } else {
        showErrorMessage();
    }
}

function login(e) {
    let email = document.querySelector('#logEmail').value;
    let password = document.querySelector('#logPassword').value;

    if (email && password) {

        firebase.auth().signInWithEmailAndPassword(email, password)
            .then((userCredential) => {
                // Signed in
                var user = userCredential.user;
                loginDiv.style.display = 'none';
                let message = document.querySelector('#loginMessage h1').textContent = `Здравей, ${user.displayName}! Ти успешно влезе в системата!`
                loginMessage.style.display = 'block';
                logoutBtnNav.style.display = 'block';
                registerBtnNav.style.display = 'none';
                loginBtnNav.style.display = 'none';
            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
            });
    } else {

        showErrorMessage();
    }
}

function logout(e) {
    firebase.auth().signOut()
        .then(() => {
            // Sign-out successful.
            showLoginForm();
            logoutBtnNav.style.display = 'none';
            loginMessage.style.display = 'none';
            registerBtnNav.style.display = 'inline';
            loginBtnNav.style.display = 'inline';
        }).catch((error) => {
            // An error happened.
        });
}

function showPasswordErrorMessage() {
    passwordErrorMessage.style.display = 'block';

    setTimeout(() => {
        passwordErrorMessage.style.display = 'none';
    }, 3000);
}

function showErrorMessage() {
    errorMessage.style.display = 'block';

    setTimeout(() => {
        errorMessage.style.display = 'none';
    }, 3000);
}