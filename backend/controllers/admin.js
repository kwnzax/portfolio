const jwt = require('jsonwebtoken');

exports.login = (req, res, next) => {
    const { email, password } = req.body;
    if (email === `${process.env.adminEmail}` && password === `${process.env.adminPwd}`) {
        res.status(200).json({
            token: jwt.sign(
                'RANDOM_TOKEN_SECRET',
                { expiresIn: '24h' }
            )});
    } else {
        res.status(401).json({ error: "Accès refusé" });
    }
};