const UserModel = firebase.auth();
const Db = firebase.firestore().collection('pets');

const app = Sammy('#site-content', function () {

    this.use('Handlebars', 'hbs');

    this.get('/home', function (context) {

        Db
            .get()
            .then(res => {
                context.pets = res.docs.map((pet) => { return { id: pet.id, ...pet.data() } })

                if (context.pets.length != 0) {
                    context.isPets = true;
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
            alert('All fields are required');
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
            .catch((err) => {
                alert("The email address or password is incorrect");
                errorHandler(err);
            });

    });

    this.get('/create', function (context) {

        extendContext(context)
            .then(function () {
                this.partial('./views/events/create.hbs');
            })
            .catch(errorHandler);
    });

    this.post('/create', function (context) {
        let { name, description, imageUrl, type } = context.params;
        let { uid } = getUser();

        if (!name || !description || !imageUrl || !type) {
            return;
        }

        Db
            .add({
                name,
                description,
                imageUrl,
                type,
                userId: uid,
                likes: []
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
                let { uid } = getUser() || '';

                if (uid != undefined) {
                    context.guest = true;
                }

                context.pet = res.data();
                context.isCreator = context.pet.userId == uid ? true : false;
                context.likeCounter = context.pet.likes.length;
                context.isLike = context.pet.likes.includes(uid) ? false : true;

                extendContext(context)
                    .then(function () {
                        this.partial('../views/events/details.hbs');
                    })
                    .catch(errorHandler);
            })
            .catch(errorHandler);
    });

    this.get('/like/:id', function (context) {

        let { id } = context.params;
        let { uid } = getUser();

        Db
            .doc(id)
            .get()
            .then(res => {
                let pet = { ...res.data() };
                let isLike = pet.likes.includes(id) ? true : false;

                if (!isLike) {

                    pet.likes.push(uid);

                    Db
                        .doc(id)
                        .set(pet);

                }
            })
            .then(() => {
                this.redirect(`/details/${id}`)
            })
            .catch(errorHandler);
    })

    this.get('/myPets', function (context) {

        Db
            .get()
            .then(res => {
                let { uid } = getUser();
                context.pets = res.docs.map((pet) => { return { id: pet.id, ...pet.data() } }).filter(x => x.userId == uid);

                if (context.pets.length != 0) {
                    context.isCreator = true;
                }

                extendContext(context)
                    .then(function () {
                        this.partial('./views/user/myPets.hbs');
                    })
            });
    });

    this.get('/edit/:id', function (context) {
        let { id } = context.params;

        Db
            .doc(id)
            .get()
            .then(res => {

                context.pet = res.data();

                extendContext(context)
                    .then(function () {
                        this.partial('../views/events/edit.hbs');
                    });
            });
    });

    this.post('/edit/:id', function (context) {

        let { id, name, description, imageUrl, type } = context.params;

        if (!name || !description || !imageUrl || !type) {
            return;
        }

        Db
            .doc(id)
            .update({
                name,
                description,
                imageUrl,
                type
            })
            .then(
                this.redirect(`/details/${id}`)
            )
            .catch(errorHandler);
    });

    this.get('/delete/:id', function (context) {

        let { id } = context.params;

        Db
            .doc(id)
            .delete()
            .then(
                this.redirect('/home')
            )
            .catch(errorHandler);
    });

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
