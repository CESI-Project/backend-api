const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    const {
        headers: {
            authorization
        }
    } = req;

    try {
        // Find token in string, ex : BEARER 'string'
        const encryptedToken = authorization.split(' ')[1];
        const decodedToken = jwt.decode(encryptedToken, process.env.SECRET_TOKEN);
        const userId = decodedToken.userId;
        const role = decodedToken.role;

        req.auth = {
            userId,
            role
        }
        next();
    } catch (error) {
        res.status(401).json({ error });
    }
}; 