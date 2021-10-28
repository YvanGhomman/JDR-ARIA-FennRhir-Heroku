const jwt = require('jsonwebtoken');
const sql = require("../models/db.js");
const dotenv = require("dotenv");
dotenv.config();

module.exports = (req, res, next) => {
    try{
        console.log("Middleware authAdmin");
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.DB_TOK);
    const isAdmin = decodedToken.isAdmin;
    
        if (isAdmin === 1) {
        console.log("action autorisée");
        next();
        } else {
            res.status(403).json({ message: "Action non autorisée" });
            console.log(`Vous n'avez pas la permission requise`);
        }
    
    }
    catch{
        res.status(401).json({error: error | 'Requête non authentifiée !'});
    }

};