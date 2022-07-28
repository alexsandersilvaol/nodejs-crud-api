const express = require('express');
const app = express();
const produtosRoutes = require('./routes/produtos');

app.use(express.urlencoded({extended: true})); 
app.use(express.json());

app.use('/api/produtos', produtosRoutes);

module.exports = app;