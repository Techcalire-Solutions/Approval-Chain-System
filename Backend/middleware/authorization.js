const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    console.log(authHeader);
    
    const token = authHeader && authHeader.split(' ')[1];
    if(!token) return res.status(401).json({message: 'No token provided.'});
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, user)=>{
        if(error) return res.status(403).json({error: error.message});
        req.user = user
        next();
    })
}

module.exports = authenticateToken;