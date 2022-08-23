var validator = require('fluent-validator');
var usuarioRepository = require('../repositories/usuario-repository');
var md5 = require('md5');
var jwt = require('jsonwebtoken');

require('../config');

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

exports.post = async (req, res) => {
    var validation = validator()
        .validate(req.body.nome)
        .passes(verificaValorVazio, "O campo nome é obrigatório!");

    validation.validate(req.body.email)
        .passes(verificaValorVazio, "O campo email é obrigatório!");

    validation.validate(req.body.senha)
        .passes(verificaValorVazio, "O campo senha é obrigatório!");

    validation.validate(req.body.senhaConfirmacao)
        .passes(verificaValorVazio, "O campo confirmação da senha é obrigatório!");


    if( validation.hasErrors() ) {
        return adicionaErroNoResponse(validation, res);
    }

    var usuarioObj = { 
        nome: req.body.nome,
        email: req.body.email,
        senha: md5(req.body.senha + HASH_SEGURO)
    };

    

    const resultInsert = await usuarioRepository.cadastrarUsuario(usuarioObj);
    const result = { result: { success: resultInsert.rows.length > 0 } };

    res.status(200).send(
        result
    );
};

exports.login = async (req, res) => {
    var validation = validator()
        .validate(req.body.email)
        .passes(verificaValorVazio, "O campo email é obrigatório!");

    validation.validate(req.body.senha)
        .passes(verificaValorVazio, "O campo senha é obrigatório!");


    if( validation.hasErrors() ) {
        return adicionaErroNoResponse(validation, res);
    }

    var usuarioObj = { 
        email: req.body.email,
        senha: md5(req.body.senha + HASH_SEGURO)
    };

    const resultUsuario = await usuarioRepository.obterUsuario(usuarioObj);

    if ( resultUsuario.rows.length > 0 ) {
        var usuarioRes = { 
            nome: resultUsuario.rows[0].nome,
            email: resultUsuario.rows[0].email
        };

        var token = await jwt.sign(usuarioRes, HASH_SEGURO, { expiresIn: '1d' });

        res.status(200).send(
            {
                success : true,
                data: token
            }
        );
    } else {
        res.status(400).send({
            success : false,
            errors: ['Usuário não encontrado']
        });
    }

};