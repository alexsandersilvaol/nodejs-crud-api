const express = require('express');
const router = express.Router();

const clientBase = require('../db/db');

router.get('/', async (req, res) => {

    const resultSelect = await clientBase.query(`SELECT * FROM produtos ORDER BY id`);

    res.status(200).send(
        { data: resultSelect.rows }
    );
});

router.get('/:id', async (req, res) => {

    const resultSelect = await clientBase.query(`SELECT * FROM produtos WHERE id = $1`, [req.params.id]);

    res.status(200).send(
        { data: resultSelect.rows[0] }
    );
});


router.put('/:id', async (req, res) => {
    const resultUpdate = await clientBase.query(`UPDATE produtos SET nome=$1, preco=$2 WHERE id = $3 RETURNING *`, 
    [req.body.nome, req.body.preco, req.params.id]);

    const result = { produto: resultUpdate.rows[0], result: { success: resultUpdate.rows.length > 0 } };

    res.status(200).send(
        result
    );
});

router.post('/', async (req, res) => {
    const resultInsert = await clientBase.query(`INSERT INTO produtos (nome, preco) VALUES($1, $2) RETURNING *`, 
        [req.body.nome, req.body.preco]);
    const result = { result: { success: resultInsert.rows.length > 0 } };

    res.status(200).send(
        result
    );
});


router.delete('/:id', async (req, res) => {
    const resultDelete = await clientBase.query(`DELETE FROM produtos WHERE id = $1 RETURNING *`, 
        [req.params.id]);
    const result = { result: { success: resultDelete.rows.length > 0 } };

    res.status(200).send(
        result
    );
});

module.exports = router;

