module.exports = {
    edit: async (req, res) => {
        const cube = await req.storage.getById(req.params.id);
        cube[`select${cube.difficulty}`] = true;

        if (!cube) {
            res.redirect('404');
        } else {
            const context = {
                title: 'Edit Cube',
                cube,
                _id: req.params.id
            }

            res.render('edit', context);
        }

    },
    editPost: async (req, res) => {
        const cube = {
            name: req.body.name,
            description: req.body.description,
            imageUrl: req.body.imageUrl,
            difficulty: Number(req.body.difficulty)
        };

        console.log(cube);
        console.log(req.params);

        try {
            await req.storage.edit(req.params.id, cube);
            res.redirect('/');
        } catch (err) {
            if (err.name == 'ValidationError') {

                cube[`select${cube.difficulty}`] = true;
                cube._id = req.params.id;
                cube.error = 'All fields must be required!';

                return res.render('edit', { title: 'Edit Cube', cube });
            }

            res.redirect('404');
        }
    }
}