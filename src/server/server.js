const http = require('http');
const port = process.env.PORT || 3001;
const app = require('../app');

const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('../swagger/swagger_output.json');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile))

const server = http.createServer(app);
app.set('port', port);

// Habilita o CORS
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, x-access-token');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
});

server.listen(port, () => {
    console.log('API rodando no endereço: http://localhost:' + port);
});

