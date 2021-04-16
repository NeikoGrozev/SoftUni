const UserModel = firebase.auth();
const Db = firebase.firestore();

const app = Sammy('#main', function () {

    this.use('Handlebars', 'hbs');

    this.get('/home', function (context) {

        extendContext(context)
            .then(function () {
                this.partial('../templates/home/home.hbs')
            })
    });

    this.get('/register', function (context) {

        extendContext(context)
            .then(function () {
                this.loadPartials({
                    'registerForm': '../templates/register/registerForm.hbs'
                });
            })
            .then(function () {
                this.partial('../templates/register/registerPage.hbs');
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
                this.redirect('/home')
            })
            .catch(errorHandler);
    })

    this.get('/login', function (context) {
        extendContext(context)
            .then(function () {
                this.loadPartials({
                    'loginForm': '../templates/login/loginForm.hbs'
                });
            })
            .then(function () {
                this.partial('../templates/login/loginPage.hbs');
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
                this.redirect('/home')
            })
            .catch(errorHandler)

    });

    this.get('/catalog', function (context) {

        Db.collection('teamManagers')
            .get()
            .then(res => {

                context.teams = res.docs.map((team) => { return { id: team.id, ...team.data() } })

                if (context.teams.length != 0) {
                    context.isHasTeam = true;
                }

                extendContext(context)
                    .then(function () {
                        this.loadPartials({
                            'team': '../templates/catalog/team.hbs'
                        });
                    })
                    .then(function () {
                        this.partial('../templates/catalog/teamCatalog.hbs');
                    })
            })
    });

    this.get('/create', function (context) {

        extendContext(context)
            .then(function () {
                this.loadPartials({
                    'createForm': '../templates/create/createForm.hbs'
                });
            })
            .then(function () {
                this.partial('../templates/create/createPage.hbs');
            });
    });

    this.post('/create', function (context) {

        let { name, comment } = context.params;
        let { uid, email } = getUser();
        Db.collection("teamManagers")
            .add({
                name,
                comment,
                userId: uid,
                joins: []
            })
            .then(
                this.redirect('/home')
            )
            .catch(errorHandler)
    });

    this.get('/details/:id', function (context) {

        let { id } = context.params;

        Db.collection('teamManagers')
            .doc(id)
            .get()
            .then(res => {
                context.team = res.data();
                context.team.id = id;
                let { uid, email } = getUser();
                context.isAuthor = context.team.userId == uid ? true : false;
                context.isOnTeam = context.team.joins.includes(uid) ? true : false;
                context.isComment = context.team.comment.length != 0 ? true : false;
                context.members = context.team.joins;

                extendContext(context)
                    .then(function () {
                        this.loadPartials({
                            'teamMember': '../templates/catalog/teamMember.hbs',
                            'teamControls': '../templates/catalog/teamControls.hbs'
                        });
                    })
                    .then(function () {
                        this.partial('../templates/catalog/details.hbs');
                    })
                    .catch(errorHandler);
            })
            .catch(errorHandler);
    });

    this.get('/join/:id', function (context) {

        let { id } = context.params;

        Db.collection("teamManagers")
            .doc(id)
            .get()
            .then(res => {
                let { email } = getUser();
                let { joins } = res.data();
                joins.push(email);

                Db.collection("teamManagers")
                    .doc(id)
                    .update({
                        joins
                    })
                    .then(
                        this.redirect('/home')
                    )
                    .catch(errorHandler);

            })
            .catch(errorHandler);
    })

    this.get('/leave/:id', function (context) {

        let { id } = context.params;

        Db.collection("teamManagers")
            .doc(id)
            .get()
            .then(res => {
                let { email } = getUser();
                let { joins } = res.data();

                let index = joins.indexOf(email); 
                if (index !== -1) {
                    joins.splice(index, 1);
                }

                Db.collection("teamManagers")
                    .doc(id)
                    .update({
                        joins
                    })
                    .then(
                        this.redirect('/home')
                    )
                    .catch(errorHandler);

            })
            .catch(errorHandler);
    })

    this.get('/edit/:id', function (context) {
        let { id } = context.params;

        Db.collection("teamManagers")
            .doc(id)
            .get()
            .then(res => {

                context.team = res.data();
                context.team.id = id;

                extendContext(context)
                    .then(function () {
                        this.loadPartials({
                            'editForm': '../templates/edit/editForm.hbs'
                        });
                    })
                    .then(function () {
                        this.partial('../templates/edit/editPage.hbs');
                    });
            });
    });

    this.post('/edit/:id', function (context) {

        let { id, name, comment } = context.params;

        Db.collection("teamManagers")
            .doc(id)
            .update({
                name,
                comment,
            })
            .then(
                this.redirect('/home')
            )
            .catch(errorHandler);
    });

    this.get('/about', function (context) {

        extendContext(context)
            .then(function () {
                this.partial('../templates/about/about.hbs');
            })
    });

    this.get('/logout', function () {
        UserModel.signOut()
            .then(() => {
                removeUser()
                this.redirect('/home')
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
        'header': '../templates/common/header.hbs',
        'footer': '../templates/common/footer.hbs'
    })
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