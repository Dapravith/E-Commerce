const express = require('express');
const cors = require('cors');
const app = express();
const fs = require('fs');
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    try {
        const data = JSON.parse(fs.readFileSync('db.json', 'utf8'));
        let output = '[\n';
        data.forEach((product, index) => {
            output += `  {\n`;
            output += `    "pictureUrl": "${product.pictureUrl}",\n`;
            output += `    "name": "${product.name}",\n`;
            output += `    "detail": "${product.detail}",\n`;
            output += `    "price": "${product.price}"\n`;
            output += `  }`;
            if (index < data.length - 1) {
                output += ',';
            }
            output += '\n';
        });
        output += ']';
        res.send(output);
    } catch (err) {
        res.send({ message: 'Error reading db.json file!', error: err.message });
    }
});

app.post('/products', (req, res) => {
    const product = {
        pictureUrl: req.body.pictureUrl,
        name: req.body.name,
        detail: req.body.detail,
        price: req.body.price
    };
    try {
        let products = [];
        try {
            products = JSON.parse(fs.readFileSync('db.json', 'utf8'));
        } catch (err) {}
        products.push(product);
        fs.writeFileSync('db.json', JSON.stringify(products));
        res.send({ message: 'Data added successfully!', product });
    } catch (err) {
        res.send({ message: 'Data added unsuccessfully!', error: err.message });
    }
});

app.listen(3000, () => console.log('Listening on port 3000...'));