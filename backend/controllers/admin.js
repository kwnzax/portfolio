const jwt = require('jsonwebtoken');

exports.login = (req, res, next) => {
    const { email, password } = req.body;
    if (email === `${process.env.adminEmail}` && password === `${process.env.adminPwd}`) {
            const token = jwt.sign(
                { email }, 
                process.env.JWT_SECRET,
                { expiresIn: '24h' }
            )
        return res.status(200).json({ token });
    } else {
        res.status(401).json({ message: "Accès refusé" });
    }
};