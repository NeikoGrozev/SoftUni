const Db = firebase.firestore();

const app = Sammy('#container', function () {

    this.use('Handlebars', 'hbs');

    this.get('home', function (context) {

        Db.collection('furnitures')
            .get()
            .then(res => {
                // console.log(res.docs.map((furniture) => { return { id : furniture.id, ...furniture.data() } }));
                context.furnitures = res.docs.map((furniture) => { return { id: furniture.id, ...furniture.data() } })

                extendContext(context)
                    .then(function () {
                        this.partial('./templates/home.hbs')
                    });
            })

    });

    this.get('create', function (context) {
        extendContext(context)
            .then(function () {
                this.partial('./templates/create.hbs')
            });
    });

    this.post('create', function (context) {

        let { make, model, year, description, price, imageUrl, material } = context.params;

        if(make.length < 3 || model.length < 3 || 
            year < 1950 || year > 2050 || 
            description.length < 9 ||
            price < 0 || imageUrl == '' ){
            return;
        }

        Db.collection('furnitures')
            .add({
                make,
                model,
                year,
                description,
                price,
                imageUrl,
                material
            })
            .then(
                this.redirect('home')
            )
    })

    this.get('details/:id', function (context) {

        let { id } = context.params;

        Db.collection('furnitures')
            .doc(id)
            .get()
            .then(res => {
                context.furniture = res.data();
                context.id = id;

                extendContext(context)
                    .then(function () {
                        this.partial('./templates/details.hbs');
                    });
            })
    });

    this.get('delete/:id', function(context){

        let { id } = context.params;
        Db.collection('furnitures')
            .doc(id)
            .delete()
            .then(() => {
                this.redirect('home')
            })
    })
}).run('home')

function extendContext(context) {

    return context.loadPartials({
        'header': './partials/header.hbs'
    })
}