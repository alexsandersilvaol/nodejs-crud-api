const swaggerAutogen = require('swagger-autogen')()

const outputFile = './src/swagger/swagger_output.json'
const endpointsFiles = ['./src/routes/produtos.js']

swaggerAutogen(outputFile, endpointsFiles)