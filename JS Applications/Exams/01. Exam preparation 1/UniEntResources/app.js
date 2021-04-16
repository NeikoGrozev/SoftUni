const UserModel = firebase.auth();
const Db = firebase.firestore().collection('uniEnts');

const app = Sammy('body', function () {

    this.use('Handlebars', 'hbs');

    this.get('/home', function (context) {

        Db
            .get()
            .then(res => {
                context.events = res.docs.map((offer) => { return { id: offer.id, ...offer.data() } })

                if (context.events.length != 0) {
                    context.isHasEvents = true;

                    context.events.sort((a, b) => b.joins - a.joins);
                }

                extendContext(context)
                    .then(function () {
                        this.partial('./views/home.hbs');
                    })
                    .catch(errorHandler);
            })
            .catch(errorHandler);
    });

    this.get('/register', function (context) {

        extendContext(context)
            .then(function () {
                this.partial('./views/user/register.hbs');
            })
            .catch(errorHandler);
    });

    this.post('/register', function (context) {
        let { email, password, rePassword } = context.params;

        if (!email || password != rePassword || password.length < 6) {
            return;
        }

        UserModel.createUserWithEmailAndPassword(email, password)
            .then(data => {
                saveUser(data);
                showSuccessMessage("User registration successful.")
                setTimeout(() => {
                    this.redirect('/home');
                }, 4000);
            })
            .catch(errorHandler);
    });

    this.get('/login', function (context) {

        extendContext(context)
            .then(function () {
                this.partial('./views/user/login.hbs');
            })
            .catch(errorHandler);
    });

    this.post('/login', function (context) {
        let { email, password } = context.params;

        if (!email || !password || password.length < 6) {
            return;
        }

        UserModel.signInWithEmailAndPassword(email, password)
            .then((data) => {
                saveUser(data);
                showSuccessMessage("Login successful.")
                setTimeout(() => {
                    this.redirect('/home');
                }, 4000);
            })
            .catch(errorHandler);

    });

    this.get('/create', function (context) {

        extendContext(context)
            .then(function () {
                this.partial('./views/events/create.hbs');
            })
            .catch(errorHandler);
    });

    this.post('/create', function (context) {
        let { name, dateTime, description, imageURL } = context.params;
        let { uid } = getUser();

        let errorStr = '';

        if (name.length < 6) {
            errorStr += 'The name of the event must be at least 6 English letters.';
        }

        if (!(/[0-9]+\s[A-Z]{1}[a-z]+/g.test(dateTime))) {
            errorStr += 'The event date and time should be valid.';
        } //else if (!(/[\d]+\s[A-Z]{1}[a-z]+\s-\s[\d]+\s(PM|AM)/g.test(dateTime))) {
        //     errorStr += 'The event date and time should be valid.';
        // }

        if (description.length < 10) {
            errorStr += 'The event description should be at least 10 characters.';
        }

        if (!(/^(http|https):\/\//g.test(imageURL))) {
            errorStr += 'Image URL should start with http://... or https://';
        }

        if (errorStr.length != 0) {
            showErrorMessage(errorStr);
            return;
        }

        Db
            .add({
                name,
                dateTime,
                description,
                imageURL,
                joins: 0,
                userId: uid
            })
            .then(() => {
                showSuccessMessage("Event created successfully.");
                setTimeout(() => {
                    this.redirect('/home');
                }, 4000);
            })
            .catch(errorHandler)
    });

    this.get('/details/:id', function (context) {

        let { id } = context.params;

        Db
            .doc(id)
            .get()
            .then(res => {
                context.event = res.data();
                let { uid, email } = getUser();
                context.organizer = email;
                context.isTheCreator = context.event.userId == uid ? true : false;

                extendContext(context)
                    .then(function () {
                        this.partial('../views/events/details.hbs');
                    })
                    .catch(errorHandler);
            })
            .catch(errorHandler);
    });

    this.get('/edit/:id', function (context) {
        let { id } = context.params;

        Db
            .doc(id)
            .get()
            .then(res => {

                context.event = res.data();
                context.event.id = id;

                extendContext(context)
                    .then(function () {
                        this.partial('../views/events/edit.hbs');
                    });
            });
    });

    this.post('/edit/:id', function (context) {

        let { id, name, description, dateTime, imageURL, organizer: userId, peopleInterestedIn: joins } = context.params;

        let errorStr = '';

        if (name.length < 6) {
            errorStr += 'The name of the event must be at least 6 English letters.';
        }

        if (!(/[0-9]+\s[A-Z]{1}[a-z]+/g.test(dateTime))) {
            errorStr += 'The event date and time should be valid.';
        } ///else if (!(/[\d]+\s[A-Z]{1}[a-z]+\s-\s[\d]+\s(PM|AM)/g.test(dateTime))) {
        //     errorStr += 'The event date and time should be valid.';
        // }

        if (description.length < 10) {
            errorStr += 'The event description should be at least 10 characters.';
        }

        if (!(/^(http|https):\/\//g.test(imageURL))) {
            errorStr += 'Image URL should start with http://... or https://';
        }

        if (errorStr.length != 0) {
            showErrorMessage(errorStr);
            return;
        }

        Db
            .doc(id)
            .update({
                name,
                description,
                dateTime,
                imageURL
            })
            .then(() => {
                showSuccessMessage("Event edited successfully.");
                setTimeout(() => {
                    this.redirect('/home');
                }, 4000);
            })
            .catch(errorHandler);
    });

    this.get('/join/:id', function (context) {
        let { id } = context.params;

        Db
            .doc(id)
            .get()
            .then(res => {
                let { joins } = { ...res.data() };

                joins++;

                Db
                    .doc(id)
                    .update({
                        joins
                    });

                extendContext(context)
                    .then(() => {
                        showSuccessMessage('You join the event successfully.')
                        setTimeout(() => {
                            this.redirect(`/details/${id}`);
                        }, 4000);
                    })
                    .catch(errorHandler);
            })
            .catch(errorHandler);

    });

    this.get('/delete/:id', function (context) {
        let { id } = context.params;

        Db
            .doc(id)
            .delete()
            .then(() => {
                showSuccessMessage("Event closed successfully.");
                setTimeout(() => {
                    this.redirect('/home');
                }, 4000);
            })
            .catch(errorHandler);
    });

    this.get('/profile', function (context) {

        let { uid, email } = getUser();
        Db
            .get()
            .then(res => {
                context.userEvents = res.docs.map((offer) => { return { id: offer.id, ...offer.data() } }).filter(x => x.userId == uid);
                context.userEmail = email;
                context.count = context.userEvents.length;

                if (context.userEvents.length != 0) {
                    context.isHasEvents = true;
                }

                extendContext(context)
                    .then(function () {
                        this.partial('./views/user/profile.hbs');
                    })
                    .catch(errorHandler);
            })
            .catch(errorHandler);
    })

    this.get('/logout', function () {
        UserModel.signOut()
            .then(() => {
                removeUser()
                showSuccessMessage("Logout successful.")
                setTimeout(() => {
                    this.redirect('/home');
                }, 4000);
            })
            .catch((err) => {
                showSuccessMessage("Invalid credentials. Please retry your request with correct credentials.")
                errorHandler(err);
            });
    });
});

(() => app.run('/home'))()


function extendContext(context) {

    let user = getUser();
    context.isLoggedIn = Boolean(user)
    context.userEmail = user ? user.email : ''

    return context.loadPartials({
        'header': './views/common/header.hbs',
        'footer': './views/common/footer.hbs'
    })
}

function getUser() {
    return JSON.parse(sessionStorage.getItem('user'));
}

function saveUser(data) {
    let { email, uid } = data.user;

    sessionStorage.setItem('user', JSON.stringify({ uid, email }));
}

function removeUser() {
    sessionStorage.removeItem('user');
}

function showSuccessMessage(message) {
    const loading = document.querySelector('#loadingBox');
    const success = document.querySelector('#successBox');

    loading.style.display = 'block';

    setTimeout(() => {
        success.innerHTML = message;
        success.style.display = 'block';
    }, 1000);
}

function showErrorMessage(message) {
    const loading = document.querySelector('#loadingBox');
    const error = document.querySelector('#errorBox');

    loading.style.display = 'block';

    setTimeout(() => {
        error.innerHTML = message;
        error.style.display = 'block';
    }, 1000);

    setTimeout(() => {
        loading.style.display = 'none';
        error.style.display = 'none';
    }, 4000);
}