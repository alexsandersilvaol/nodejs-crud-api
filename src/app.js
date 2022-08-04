const express = require('express');
const app = express();
const produtosRoutes = require('./routes/produtos');

app.use(express.urlencoded({extended: true})); 
app.use(express.json());

// Habilita o CORS
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, x-access-token');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
});

app.use('/api/produtos', produtosRoutes);

module.exports = app;