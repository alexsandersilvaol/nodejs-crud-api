const jwt = require('jsonwebtoken');

exports.authorize = function (req, res, next) {
    var token = req.body.token || req.query.token || req.headers['x-access-token'] || req.headers['authorization'];
    if (!token) {
        res.status(401).json({
            message: 'Acesso Restrito'
        });
    } else {
        token = token.replace('Bearer ','');
        jwt.verify(token, global.HASH_SEGURO, function (error, decoded) {
            if (error) {
                res.status(401).json({
                    message: 'Token Inválido'
                });
            } else {
                next();
            }
        });
    }
};