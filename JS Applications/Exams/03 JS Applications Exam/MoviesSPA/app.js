const UserModel = firebase.auth();
const Db = firebase.firestore().collection('movies2');

const app = Sammy('#container', function () {

    this.use('Handlebars', 'hbs');

    this.get('/home', function (context) {

        Db
            .get()
            .then(res => {
                context.movies = res.docs.map((movie) => { return { id: movie.id, ...movie.data() } })


                if (context.params.search != '' && context.params.search != undefined) {
                    context.movies = context.movies.filter(x => x.title == context.params.search);
                } else {
                    context.params.search = '';
                }

                if (context.movies.length != 0) {
                    context.isHaveMovies = true;
                    context.movies.sort((a, b) => b.tickets - a.tickets);
                }



                extendContext(context)
                    .then(function () {
                        this.partial('./views/home.hbs');
                    })
            });
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
                this.redirect('/home');
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
                this.redirect('/home');
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
        let { title, imageUrl, description, genres, tickets } = context.params;
        let { uid } = getUser();
        genres = genres.split(' ');

        if (title.length < 6 || description.length < 10 ||
            !(/^(http|https):\/\//g.test(imageUrl)) ||
            !(/[\d]+/g.test(tickets)) ||
            !(/([A-Z][a-z]+)+/g.test(genres))) {
            return;
        }

        Db
            .add({
                title,
                imageUrl,
                description,
                genres,
                tickets,
                userId: uid
            })
            .then(
                this.redirect('/home')
            )
            .catch(errorHandler);
    });

    this.get('/details/:id', function (context) {

        let { id } = context.params;

        Db
            .doc(id)
            .get()
            .then(res => {
                context.movie = res.data();
                context.movie.genres = context.movie.genres.toString().replaceAll(',', ', ');
                context.isHaveTickets = context.movie.tickets > 0 ? true : false;

                extendContext(context)
                    .then(function () {
                        this.partial('../views/events/details.hbs');
                    })
                    .catch(errorHandler);
            })
            .catch(errorHandler);
    });

    this.get('/buy/:id', function (context) {

        let { id } = context.params;
        let { uid } = getUser();

        Db
            .doc(id)
            .get()
            .then(res => {

                let { tickets } = { ...res.data() };

                if (tickets > 0) {
                    tickets--;
                }

                Db
                    .doc(id)
                    .update({
                        tickets
                    });
            })
            .then(() => {
                this.redirect(`/details/${id}`)
            })
            .catch(errorHandler);
    });

    this.get('/myMovies', function (context) {

        Db
            .get()
            .then(res => {
                let { uid } = getUser();
                context.movies = res.docs.map((movie) => { return { id: movie.id, ...movie.data() } }).filter(x => x.userId == uid);

                if (context.movies.length != 0) {
                    context.isHaveMovies = true;
                }

                extendContext(context)
                    .then(function () {
                        this.partial('./views/user/myMovies.hbs');
                    })
            });
    });

    this.get('/edit/:id', function (context) {
        let { id } = context.params;

        Db
            .doc(id)
            .get()
            .then(res => {

                context.movie = res.data();
                context.movie.genres = context.movie.genres.toString().replaceAll(',', ', ');

                extendContext(context)
                    .then(function () {
                        this.partial('../views/events/edit.hbs');
                    });
            });
    });

    this.post('/edit/:id', function (context) {

        let { id, title, imageUrl, description, genres, tickets } = context.params;
        genres = genres.split(', ');

        if (title.length < 6 || description.length < 10 ||
            !(/^(http|https):\/\//g.test(imageUrl)) ||
            !(/[\d]+/g.test(tickets)) ||
            !(/([A-Z][a-z]+)+/g.test(genres))) {
            return;
        }

        Db
            .doc(id)
            .update({
                title,
                imageUrl,
                description,
                genres,
                tickets,
            })
            .then(
                this.redirect('../views/events/myMovies')
            )
            .catch(errorHandler);
    });

    this.get('/delete/:id', function (context) {
        let { id } = context.params;

        Db
            .doc(id)
            .get()
            .then(res => {
                context.movie = res.data();
                context.movie.genres = context.movie.genres.toString().replaceAll(',', ', ');

                extendContext(context)
                    .then(function () {
                        this.partial('../views/events/delete.hbs');
                    })
                    .catch(errorHandler);
            })
            .catch(errorHandler);
    });

    this.post('/delete/:id', function (context) {
        let { id } = context.params;

        Db
            .doc(id)
            .delete()
            .then(
                this.redirect('/home')
            )
            .catch(errorHandler);
    })

    this.get('/logout', function () {
        UserModel.signOut()
            .then(() => {
                removeUser()
                this.redirect('/home');
            })
            .catch(errorHandler);
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

function errorHandler(error) {
    console.error(error);
}
