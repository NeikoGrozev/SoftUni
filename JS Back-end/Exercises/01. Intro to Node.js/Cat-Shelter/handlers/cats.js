const url = require('url');
const fs = require('fs');
const qs = require('querystring');
const path = require('path');
const formidable = require('formidable');
const cats = require('../data/cats.json');
const breeds = require('../data/breeds.json');

function nextId() {
    let id = ('00000000' + (Math.random() * 99999999 | 0).toString(16)).slice(-8);

    return id;
}

module.exports = (req, res) => {

    const pathname = url.parse(req.url).pathname;
    //const url = new URL(req.url, 'http://localhost:3000');
    // const pathname = url.pathname;

    if (pathname == '/cats/add-cat' && req.method == 'GET') {
        const filePath = path.normalize(path.join(__dirname, '../views/addCat.html'));

        fs.readFile(filePath, (err, data) => {
            if (err) {
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                res.write('File NotFound');
                res.end();
                return;
            }
            const breedsPlaceholder = breeds.map(breed => `<option value="${breed}">${breed}</option>`)
            const modifiedData = data.toString().replace('{{breeds}}', breedsPlaceholder)
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.write(modifiedData);
            res.end();
        });
    } else if (pathname == '/cats/add-cat' && req.method == 'POST') {
        let form = new formidable.IncomingForm();

        form.parse(req, (err, fields, file) => {
            if (err) {
                throw err;
            }

            let oldPathFile = file.upload.path;
            let newPathFile = path.join(__dirname.replace('handlers', ''), '\\content\\images\\' + file.upload.name);

            // fs.rename(oldPathFile, newPathFile, () => {
            //     if (err) {
            //         throw err;
            //     }
            //     console.log(`Image succesfully uploaded to: ${newPathFile}`);
            // });
            // TODO: Not workin with different disc partial!!!

            fs.copyFile(oldPathFile, newPathFile, () => {
                if (err) {
                    throw err;
                }
                console.log(`Image succesfully uploaded to: ${newPathFile}`);
            });

            fs.readFile('./data/cats.json', 'utf8', (err, data) => {
                if (err) {
                    throw err;
                }

                let allCats = JSON.parse(data);
                let currentCat = { id: nextId(), ...fields, image: file.upload.name }
                allCats.push(currentCat);
                let json = JSON.stringify(allCats, null, "\t");

                fs.writeFile('./data/cats.json', json, (err) => {
                    if (err) {
                        throw err;
                    }

                    console.log('Cat succesfully added!');
                });
            });

            res.writeHead(301, { 'Location': '/' });
            res.end();
        });

    } else if (pathname == '/cats/add-breed' && req.method == 'GET') {
        const filePath = path.normalize(path.join(__dirname, '../views/addBreed.html'));

        fs.readFile(filePath, (err, data) => {
            if (err) {
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                res.write('File NotFound');
                res.end();
                return;
            }

            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.write(data);
            res.end();
        });
    } else if (pathname == '/cats/add-breed' && req.method == 'POST') {
        let formData = '';
        req.on('data', data => { formData += data });
        req.on('end', () => {
            formData = qs.parse(formData);

            fs.readFile('./data/breeds.json', (err, data) => {
                if (err) {
                    throw err;
                }

                let breeds = JSON.parse(data);
                breeds.push(formData.breed);

                fs.writeFile('./data/breeds.json', JSON.stringify(breeds, null, "\t"), () => {
                    console.log(`${formData.breed} was added successfully to the breeds.`);
                });
            });

            res.writeHead(301, { 'Location': '/' });
            res.end();
        });
    } else if (pathname.includes('/cats/edit') && req.method == 'GET') {
        const filePath = path.normalize(path.join(__dirname, '../views/editCat.html'));

        fs.readFile(filePath, (err, data) => {
            if (err) {
                res.writeHead(404, 'File NotFound');
                res.write('File NotFound');
                res.end();
            }

            const id = pathname.split('/').pop();
            const cat = cats.find(cat => cat.id == id)

            let htmlPart = `  <form action="/cats/edit/${id}" method="POST" class="cat-form" enctype="multipart/form-data">
            <h2>Edit Cat</h2>
            <label for="name">Name</label>
            <input type="text" id="name" name="name" value="${cat.name}">
            <label for="description">Description</label>
            <textarea id="description" name="description">${cat.description}</textarea>
            <label for="image">Image</label>
            <input type="file" id="image" name="upload">
            <label for="group">Breed</label>
            <select id="group" name="breed">
                {{catBreeds}}
            </select>
            <button type="submit">Edit Cat</button>
        </form>`

            let catBreeds = breeds.map(b => `<option value="${b}">${b}</option>`)
            htmlPart = htmlPart.replace('{{catBreeds}}', catBreeds);

            data = data.toString().replace('{{edit}}', htmlPart);

            res.writeHead(200, { 'Content-Type': "text/html" });
            res.write(data);
            res.end();

        });
    } else if (pathname.includes('/cats/edit') && req.method == "POST") {
        let form = new formidable.IncomingForm();
        const id = pathname.split('/').pop();

        form.parse(req, (err, fields, file) => {
            if (err) {
                throw err;
            }

            fs.readFile('./data/cats.json', (err, data) => {
                if (err) {
                    throw err;
                }

                let allCats = JSON.parse(data);

                for (const cat of allCats) {
                    if (cat.id == id) {
                        cat.name = fields.name;
                        cat.description = fields.description;
                        cat.breed = fields.breed;

                        if (file.upload.name != '') {
                            let oldPathFile = file.upload.path;
                            let newPathFile = path.join(__dirname.replace('handlers', ''), '\\content\\images', file.upload.name);

                            fs.copyFile(oldPathFile, newPathFile, () => {
                                if (err) {
                                    throw err;
                                }
                                console.log(`Image succesfully uploaded to: ${newPathFile}`);
                            });

                            cat.image = file.upload.name;
                        }
                    }
                }

                let json = JSON.stringify(allCats, null, "\t");

                fs.writeFile('./data/cats.json', json, (err) => {
                    if (err) {
                        throw err;
                    }

                    console.log('Cat succesfully edit!');
                });
            });

            res.writeHead(301, { 'Location': '/' });
            res.end();
        });
    } else if (pathname.includes('/cats-find-new-home') && req.method === 'GET') {
        const id = pathname.split('/').pop();
        const cat = cats.find((cat) => cat.id === id);
        const filePath = path.join(__dirname, '../views/catShelter.html');

        fs.readFile(filePath, (err, data) => {
            if (err) {
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                res.write('404 File Not Found');
                res.end();
                return;
            }

            const catShelter = `   <form action="/cats-find-new-home/${id}" method="POST" class="cat-form">
                    <h2>Shelter the cat</h2>
                    <img src="${path.join('../content/images/' + cat.image)}" alt="${cat.name}">
                    <label for="name">Name</label>
                    <input type="text" id="name" value="${cat.name}" disabled>
                    <label for="description">Description</label>
                    <textarea id="description" disabled>${cat.description}</textarea>
                    <label for="group">Breed</label>
                    <select id="group" disabled>
                        <option value="${cat.breed}">${cat.breed}</option>
                    </select>
                    <button>SHELTER THE CAT</button>
                </form>`;

                const modifiedData = data.toString().replace('{{catShelter}}', catShelter);
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.write(modifiedData);
                res.end();

        });
    } else if (pathname.includes('/cats-find-new-home') && req.method == 'POST') {
        const id = pathname.split('/').pop();

        fs.readFile('./data/cats.json', (err, data) => {
            if (err) {
                throw err;
            }

            let allCats = JSON.parse(data).filter(cat => cat.id != id);
            const json = JSON.stringify(allCats, null, "\t");

            fs.writeFile('./data/cats.json', json, (err) => {
                if (err) {
                    throw err;
                }

                console.log('Cat succesfully deleted!');
            });
        })

        res.writeHead(301, { 'Location': '/' });
        res.end();
    } else {
        return true;
    }
}