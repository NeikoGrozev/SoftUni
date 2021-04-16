const UserModel = firebase.auth();
const Db = firebase.firestore().collection('cookUni');

const app = Sammy('#rooter', function () {

    this.use('Handlebars', 'hbs');

    this.get('/home', function (context) {

        Db
            .get()
            .then(res => {
                context.recipes = res.docs.map((rec) => { return { id: rec.id, ...rec.data() } })

                if (context.recipes.length != 0) {
                    context.isHaveRecipes = true;
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
            //ERRROR
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
        let { meal, ingredients, prepMethod, description, foodImageURL, category } = context.params;
        let { uid } = getUser();
        ingredients = ingredients.split(',');

        let errorStr = '';

        if (meal.length < 4) {
            errorStr += 'The event meal should be at least 4 characters.';
        }

        if (ingredients.length < 2) {
            errorStr += 'The event ingredients should be at least 2 products.';
        }

        if (prepMethod.length < 10) {
            errorStr += 'The event method of preparation should be at least 10 characters.';
        }

        if (description.length < 10) {
            errorStr += 'The event description should be at least 10 characters.';
        }

        if (!(/^(http|https):\/\//g.test(foodImageURL))) {
            errorStr += 'Image URL should start with http://... or https://';
        }

        if (category == 'Select category...') {
            errorStr += '';
        }

        if (errorStr.length != 0) {
            showErrorMessage(errorStr);
            return;
        }

        categoryImageURL = {
            'Vegetables and legumes/beans': 'https://cdn.pixabay.com/photo/2017/10/09/19/29/eat-2834549__340.jpg',
            'Fruits': 'https://i.pinimg.com/236x/4b/44/30/4b4430a0626805a005a92b3f1102b5a8.jpg',
            'Grain Food': 'https://cdn.pixabay.com/photo/2014/12/11/02/55/corn-syrup-563796__340.jpg',
            'Milk, cheese, eggs and alternatives': 'https://image.shutterstock.com/image-photo/assorted-dairy-products-milk-yogurt-260nw-530162824.jpg',
            'Lean meats and poultry, fish and alternatives': 'https://t3.ftcdn.net/jpg/01/18/84/52/240_F_118845283_n9uWnb81tg8cG7Rf9y3McWT1DT1ZKTDx.jpg'
        };

        Db
            .add({
                meal,
                ingredients,
                prepMethod,
                description,
                foodImageURL,
                categoryImageURL: categoryImageURL[category],
                category,
                likes: [],
                userId: uid
            })
            .then(() => {
                showSuccessMessage("Recipe shared successfully!");
                setTimeout(() => {
                    this.redirect('/home');
                }, 4000);
            })
            .catch(errorHandler)
    });

    this.get('/edit/:id', function (context) {
        let { id } = context.params;

        Db
            .doc(id)
            .get()
            .then(res => {

                context.recipes = res.data();
                context.recipes.ingredients = res.data().ingredients.toString().replaceAll(',', ', ');

                extendContext(context)
                    .then(function () {
                        this.partial('../views/events/edit.hbs');
                    });
            });
    });

    this.post('/edit/:id', function (context) {

        let { id, meal, ingredients, prepMethod, description, foodImageURL, category } = context.params;
        ingredients = ingredients.split(', ');

        let errorStr = '';

        if (meal.length < 4) {
            errorStr += 'The event meal should be at least 4 characters.';
        }

        if (ingredients.length < 2) {
            errorStr += 'The event ingredients should be at least 2 products.';
        }

        if (prepMethod.length < 10) {
            errorStr += 'The event method of preparation should be at least 10 characters.';
        }

        if (description.length < 10) {
            errorStr += 'The event description should be at least 10 characters.';
        }

        if (!(/^(http|https):\/\//g.test(foodImageURL))) {
            errorStr += 'Image URL should start with http://... or https://';
        }

        if (errorStr.length != 0) {
            showErrorMessage(errorStr);
            return;
        }

        Db
            .doc(id)
            .update({
                meal,
                ingredients,
                prepMethod,
                description,
                foodImageURL,
                category
            })
            .then(() => {
                showSuccessMessage("Event edited successfully.");
                setTimeout(() => {
                    this.redirect('/home');
                }, 4000);
            })
            .catch(errorHandler);
    });

    this.get('/details/:id', function (context) {

        let { id } = context.params;

        Db
            .doc(id)
            .get()
            .then(res => {
                context.recipes = res.data();
                let { uid, email } = getUser();
                context.isTheCreator = context.recipes.userId == uid ? true : false;
                let { likes } = { ...res.data() };
                context.counter = likes.length;

                extendContext(context)
                    .then(function () {
                        this.partial('../views/events/details.hbs');
                    })

            })
            .catch(errorHandler);
    });

    this.get('/like/:id', function (context) {
        let { id } = context.params;

        Db
            .doc(id)
            .get()
            .then(res => {
                let recipes = res.data();
                let { uid } = getUser();
                let isLike = recipes.likes.includes(uid) ? true : false;

                if (!isLike) {

                   recipes.likes.push(uid);
                   let likes = recipes.likes;

                    Db
                        .doc(id)
                        .update({
                           likes
                        });

                    extendContext(context)
                        .then(() => {
                            showSuccessMessage('You liked that recipe.')
                            setTimeout(() => {
                                this.redirect(`/details/${id}`);
                            }, 4000);
                        });
                }
            })
            .catch(errorHandler);

    });

    this.get('/delete/:id', function (context) {
        let { id } = context.params;

        Db
            .doc(id)
            .delete()
            .then(() => {
                showSuccessMessage("Your recipe was archived.");
                setTimeout(() => {
                    this.redirect('/home');
                }, 4000);
            })
            .catch(errorHandler);
    });

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

(() => {
    app.run('/home');
})()

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