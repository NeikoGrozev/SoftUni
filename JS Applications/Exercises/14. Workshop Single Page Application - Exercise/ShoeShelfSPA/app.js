const UserModel = firebase.auth();
const Db = firebase.firestore();

const app = Sammy('#main', function () {

    this.use('Handlebars', 'hbs');

    this.get('/home', function (context) {

        Db.collection('shoes')
            .get()
            .then(res => {
                context.shoes = res.docs.map((offer) => { return { id: offer.id, ...offer.data() } })
                
                if (context.shoes) {
                    context.allShoes = true;

                    context.shoes.sort((a, b) => b.usersBought.length - a.usersBought.length);
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
                this.partial('./templates/register.hbs');
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
                this.redirect('/home')
            })
            .catch(errorHandler)

    });

    this.get('/create-offer', function (context) {
        extendContext(context)
            .then(function () {
                this.partial('../templates/create-offer.hbs');
            })
    });

    this.post('/create-offer', function (context) {
        let { name, price, imageUrl, description, brand } = context.params;
        let { uid, email } = getUser();

        if (!name || !price || !imageUrl || !description || !brand) {
            return;
        }
        console.log(context.params);

        Db.collection("shoes")
            .add({
                name,
                price,
                imageUrl,
                description,
                brand,
                userId: uid,
                usersBought: []
            })
            .then(
                this.redirect('/home')
            )
            .catch(errorHandler)

    });


    this.get('/edit-offer/:id', function (context) {

        let { id } = context.params;

        Db.collection('shoes')
            .doc(id)
            .get()
            .then(res => {

                context.offer = res.data();
                context.offer.id = id;

                extendContext(context)
                    .then(function () {
                        this.partial('../templates/edit-offer.hbs');
                    })
            })
            .catch(errorHandler)
    });

    this.post('/edit-offer/:id', function (context) {

        let { id: offerId, name, price, imageUrl, description, brand } = context.params;
        console.log(context);

        Db.collection("shoes")
            .doc(offerId)
            .update({
                name,
                price,
                imageUrl,
                description,
                brand,
            })
            .then(() => {
                this.redirect(`/detail/${offerId}`)
            })
            .catch(errorHandler);
    });


    this.get('/detail/:id', function (context) {

        let { id } = context.params;

        Db.collection('shoes')
            .doc(id)
            .get()
            .then(res => {

                context.offer = res.data();
                let { uid } = getUser();
                context.isTheSalesman = context.offer.userId == uid ? true : false;
                context.bought = context.offer.usersBought.includes(uid) ? false : true;

                extendContext(context)
                    .then(function () {
                        this.partial('../templates/detail.hbs');
                    })
            })
            .catch(errorHandler)
    });

    this.get('/buy/:id', function (context) {

        let { id: offerId } = context.params;
        let { uid } = getUser();

        Db.collection('shoes')
            .doc(offerId)
            .get()
            .then(res => {
                console.log('test');
                let offerData = {...res.data()};
                offerData.usersBought.push(uid);

                Db.collection('shoes')
                    .doc(offerId)
                    .set(offerData);
            })
            .then(() => {
                this.redirect(`/detail/${offerId}`)
            })
            .catch(errorHandler);
    })

    this.get('/delete/:id', function (context) {

        let { id } = context.params;
        Db.collection('shoes')
            .doc(id)
            .delete()
            .then(() => {
                this.redirect('/home')
            })
            .catch(errorHandler);
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

(() => {
    app.run('/home');
})()

function extendContext(context) {

    let user = getUser();
    context.isLoggedIn = Boolean(user)
    context.userEmail = user ? user.email : ''

    return context.loadPartials({
        'header': './partials/header.hbs',
        'footer': './partials/footer.hbs'
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