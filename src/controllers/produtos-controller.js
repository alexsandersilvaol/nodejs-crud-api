var validator = require('fluent-validator');
var produtoRepository = require('../repositories/produto-repository');

const verificaValorVazio = (nome) => {
    return nome != null && nome != "" && nome != undefined;
};

const adicionaErroNoResponse = (validation, res) => {
    return res.status(400).send({
        result: {
            success: false,
            errors: validation.getErrors()
        }
    });
}

exports.get = async (req, res) => {

    const resultSelect = await produtoRepository.obterTodosProdutos();

    res.status(200).send(
        { data: resultSelect.rows }
    );
};

exports.getById = async (req, res) => {

    var validation = validator()
        .validate(req.params.id).isNumber().and.isPositive();


    if( validation.hasErrors() ) {
        return adicionaErroNoResponse(validation, res);
    }

    const resultSelect = await produtoRepository.obterProduto(req.params.id);

    res.status(200).send(
        { data: resultSelect.rows[0] }
    );
};

exports.put = async (req, res) => {
    var validation = validator()
        .validate(req.body.nome).passes(verificaValorVazio, "O campo nome é obrigatório!");

    validation.validate(req.body.preco).isNumber().and.isPositive();


    if( validation.hasErrors() ) {
        return adicionaErroNoResponse(validation, res);
    }

    const resultUpdate = await produtoRepository.alterarProduto(req.body, req.params.id);

    const result = { produto: resultUpdate.rows[0], result: { success: resultUpdate.rows.length > 0 } };

    res.status(200).send(
        result
    );
};

exports.post = async (req, res) => {
    var validation = validator()
        .validate(req.body.nome).passes(verificaValorVazio, "O campo nome é obrigatório!");

    validation.validate(req.body.preco).isNumber().and.isPositive();


    if( validation.hasErrors() ) {
        return adicionaErroNoResponse(validation, res);
    }

    const resultInsert = await produtoRepository.cadastrarProduto(req.body);
    const result = { result: { success: resultInsert.rows.length > 0 } };

    res.status(200).send(
        result
    );
};

exports.delete = async (req, res) => {

    var validation = validator()
        .validate(req.params.id).isNumber().and.isPositive();

    if( validation.hasErrors() ) {
        return adicionaErroNoResponse(validation, res);
    }

    const resultDelete = await produtoRepository.excluirProduto(req.params.id);
    const result = { result: { success: resultDelete.rows.length > 0 } };

    res.status(200).send(
        result
    );
};