const clientBase = require('../db/db');

exports.obterTodosProdutos = async ()  => {
    return clientBase.query(`SELECT * FROM produtos ORDER BY id`);
};

exports.cadastrarProduto = async (produto)  => {
    return clientBase.query(`INSERT INTO produtos (nome, preco) VALUES($1, $2) RETURNING *`, 
    [produto.nome, produto.preco]);
};


exports.alterarProduto = async ( produto, id ) => {
    return clientBase.query(`UPDATE produtos SET nome=$1, preco=$2 WHERE id = $3 RETURNING *`, 
        [produto.nome, produto.preco, id]);
}

exports.obterProduto = async (id)  => {
    return clientBase.query(`SELECT * FROM produtos WHERE id = $1`, [id]);
};

exports.excluirProduto = async (id)  => {
    return clientBase.query(`DELETE FROM produtos WHERE id = $1 RETURNING *`, 
        [id]);
};