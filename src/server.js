const http = require('http');
const express = require('express');
const app = express();
const port = process.env.PORT || 3001;
const clientBase = require('./db');

app.set('port', port);

app.use(express.urlencoded({extended: true})); 
app.use(express.json());

const server = http.createServer(app);
const router = express.Router();

const rotaProdutos = router.get('/', async (req, res) => {

    const resultSelect = await clientBase.query(`SELECT * FROM produtos ORDER BY id`);

    res.status(200).send(
        { data: resultSelect.rows }
    );
});

const rotaGetProduto = router.get('/:id', async (req, res) => {

    const resultSelect = await clientBase.query(`SELECT * FROM produtos WHERE id = $1`, [req.params.id]);

    res.status(200).send(
        { data: resultSelect.rows[0] }
    );
});

const rotaAlterarProduto = router.put('/:id', async (req, res) => {
    const resultUpdate = await clientBase.query(`UPDATE produtos SET nome=$1, preco=$2 WHERE id = $3 RETURNING *`, 
    [req.body.nome, req.body.preco, req.params.id]);

    const result = { produto: resultUpdate.rows[0], result: { success: resultUpdate.rows.length > 0 } };

    res.status(200).send(
        result
    );
});

const rotaIncluirProduto = router.post('/', async (req, res) => {
    const resultInsert = await clientBase.query(`INSERT INTO produtos (nome, preco) VALUES($1, $2) RETURNING *`, 
        [req.body.nome, req.body.preco]);
    const result = { result: { success: resultInsert.rows.length > 0 } };

    res.status(200).send(
        result
    );
});

const rotaExcluirProduto = router.delete('/:id', async (req, res) => {
    const resultDelete = await clientBase.query(`DELETE FROM produtos WHERE id = $1 RETURNING *`, 
        [req.params.id]);
    const result = { result: { success: resultDelete.rows.length > 0 } };

    res.status(200).send(
        result
    );
});





// Habilita o CORS
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, x-access-token');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
});

app.use('/api/produtos', rotaProdutos);
app.use('/api/produtos/:id', rotaGetProduto);
app.use('/api/produtos/:id', rotaAlterarProduto);
app.use('/api/produtos/:id', rotaExcluirProduto);
app.use('/api/produtos', rotaIncluirProduto);

server.listen(port, () => {
    console.log('API rodando no endereço: http://localhost:' + port);
});

