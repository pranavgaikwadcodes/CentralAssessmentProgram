const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        let token = req.headers.authorization.split(" ")[1];
        
        if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        if (!decoded) return res.status(401).send({ auth: false, message: 'Failed to authenticate token.' });
        
        req.userData = decoded;
        console.log("decoded: ", decoded);
        next();
    } catch (error) {
        console.log(error);
    }
}
