const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const obatRoutes = require('./routes/obat_route');

const app = express();

app.use('/images', express.static('images')); // Serve static images from the 'images' directory

app.use(cors());
app.use(bodyParser.json());

app.use('/api/obat', obatRoutes);

app.get('/', (req, res) => {
    res.send('Welcome to the Farmasi API');
});

module.exports = app;