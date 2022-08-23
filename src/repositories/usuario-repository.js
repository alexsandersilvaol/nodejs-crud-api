const clientBase = require('../db/db');

exports.cadastrarUsuario = async (usuario)  => {
    return clientBase.query(`INSERT INTO usuarios (nome, email, senha) VALUES($1, $2, $3) RETURNING *`, 
    [usuario.nome, usuario.email, usuario.senha]);
};

exports.obterUsuario = async (usuario)  => {
    return clientBase.query(`SELECT * FROM usuarios WHERE email = $1 AND senha = $2`, 
        [usuario.email, usuario.senha]);
};