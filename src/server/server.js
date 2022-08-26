const http = require('http');
const port = process.env.PORT || 3001;
const app = require('../app');

const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('../swagger/swagger_output.json');

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerFile))

const server = http.createServer(app);
app.set('port', port);

server.listen(port, () => {
    console.log('API rodando no endereço: http://localhost:' + port);
});

