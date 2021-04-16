const UserModel = firebase.auth();
const Db = firebase.firestore();

const app = Sammy('#container', function () {

    this.use('Handlebars', 'hbs');

    this.get('/home', function (context) {

        Db.collection('movies')
            .get()
            .then(res => {
                context.movies = res.docs.map((movie) => { return { id: movie.id, ...movie.data() } })

                if (context.movies.length != 0) {
                    context.isHasMovies = true;
                }

                extendContext(context)
                    .then(function () {
                        this.partial('./templates/home.hbs');
                    })
            });
    });

    this.get('/register', function (context) {

        extendContext(context)
            .then(function () {
                this.partial('./templates/register.hbs')
            })
    });

    this.post('/register', function (context) {
        let { email, password, rePassword } = context.params;

        if (!email || password != rePassword || password.length < 6) {
            return;
        }

        UserModel.createUserWithEmailAndPassword(email, password)
            .then(data => {
                saveUser(data);
                successMassage('Successful registration!');

                setTimeout(() => {
                    this.redirect('/home')
                }, 2000);
            })
            .catch(errorHandler);
    });

    this.get('/login', function (context) {
        extendContext(context)
            .then(function () {
                this.partial('./templates/login.hbs');
            })
    });

    this.post('/login', function (context) {
        let { email, password } = context.params;

        if (!email || !password || password.length < 6) {
            return;
        }

        UserModel.signInWithEmailAndPassword(email, password)
            .then((data) => {
                saveUser(data);
                successMassage('Login successful.');
                this.redirect('/home');
            })
            .catch(errorHandler);
    });

    this.get('/add', function (context) {

        extendContext(context)
            .then(function () {
                this.partial('./templates/add.hbs');
            });
    });

    this.post('/add', function (context) {

        let { title, description, imageUrl } = context.params;

        if (!title || !description || !imageUrl) {
            errorMassage('Invalid Inputs');
            return;
        }

        let { uid } = getUser();

        Db.collection('movies')
            .add({
                title,
                description,
                imageUrl,
                uid,
                likes: []
            })
            .then(() => {
                successMassage('Created successfully!');
                this.redirect('/home');
            })
            .catch(errorHandler);
    });

    this.get('/details/:id', function (context) {

        let { id } = context.params;

        Db.collection('movies')
            .doc(id)
            .get()
            .then(res => {

                context.movie = res.data();
                let { uid } = getUser();
                context.isTheCreator = context.movie.uid == uid ? true : false;
                context.isLike = context.movie.likes.includes(uid) ? false : true;
                context.counter = context.movie.likes.length;

                extendContext(context)
                    .then(function () {
                        this.partial('../templates/details.hbs');
                    });
            })
            .catch(errorHandler);

    });

    this.get('/edit/:id', function (context) {

        let { id } = context.params;

        Db.collection('movies')
            .doc(id)
            .get()
            .then(res => {

                let { title, description, imageUrl } = res.data();

                context.movie = {
                    title,
                    description,
                    imageUrl
                };

                extendContext(context)
                    .then(function () {
                        this.partial('../templates/edit.hbs')
                    })
            })
    })

    this.post('/edit/:id', function (context) {

        let { id, title, description, imageUrl } = context.params;

        if (!title || !description || !imageUrl) {
            return;
        }

        Db.collection('movies')
            .doc(id)
            .update({
                title,
                description,
                imageUrl
            })
            .then(() => {
                successMassage('Eddited successfully');
                this.redirect(`/details/${id}`);
            })
            .catch(errorHandler);
    })

    this.get('/like/:id', function (context) {

        let { id } = context.params;
        let { uid } = getUser();
        let arr = [];

        Db.collection('movies')
            .doc(id)
            .get()
            .then(res => {
                let movie = { ...res.data() };
                let isLike = movie.likes.includes(id) ? true : false;
                movie.likes.push(uid);

                if (!isLike) {
                    Db.collection('movies')
                        .doc(id)
                        .set(movie)
                }
            })
            .then(() => {
                this.redirect(`/details/${id}`)
            })
            .catch(errorHandler);
    })

    this.get('/delete/:id', function (context) {

        let { id } = context.params;

        Db.collection('movies')
            .doc(id)
            .delete()
            .then(() => {
                successMassage('Deleted successfully');
                this.redirect('/home');
            })
            .catch(errorHandler);
    })

    this.get('/logout', function () {

        UserModel.signOut()
            .then(() => {
                removeUser();
                successMassage('Successful logout');
                this.redirect('/home');
            })
            .catch(errorHandler);
    });

});

(() => app.run('/home'))()

function extendContext(context) {

    let user = getUser();
    context.isLoggedIn = Boolean(user);
    context.userEmail = user ? user.email : '';

    return context.loadPartials({
        'header': './partials/header.hbs',
        'footer': './partials/footer.hbs'
    });
}

function getUser() {
    return JSON.parse(localStorage.getItem('user'));
}

function saveUser(data) {
    let { email, uid } = data.user;

    localStorage.setItem('user', JSON.stringify({ uid, email }));
}

function removeUser() {
    localStorage.removeItem('user');
}

function errorHandler(error) {
    console.error(error);
}

function successMassage(message) {
    setTimeout(() => {
        let successBox = document.querySelector('#successBox');
        successBox.innerHTML = message;
        successBox.parentNode.style.display = 'block';

        setTimeout(function () {
            successBox.parentNode.style.display = 'none';
            successBox.innerHTML = '';
        }, 1000)

    }, 1000)
}

function errorMassage(message) {
    let successBox = document.querySelector('#errorBox');
    successBox.innerHTML = message;
    successBox.parentNode.style.display = 'block';

    setTimeout(function () {
        successBox.parentNode.style.display = 'none';
        successBox.innerHTML = '';
    }, 1000)
}