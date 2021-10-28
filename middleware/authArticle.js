const jwt = require('jsonwebtoken');
const sql = require("../models/db.js");
const dotenv = require("dotenv");
dotenv.config();

module.exports = (req, res, next) => {
    try{
        console.log("Middleware authArticle");
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.DB_TOK);
    const userId = decodedToken.userId;
    const isAdmin = decodedToken.isAdmin;
    
    sql.query(`SELECT * FROM article WHERE id = ${req.params.articleId}`, (err, data) => {
        if (isAdmin === 1 || (data[0].id_user === userId)) {
            console.log("action autorisée");
            next();
        } else {
            res.status(403).json({ message: "Action non autorisée" });
            console.log(`Vous n'avez pas la permission requise`);
        }
    });
    }
    catch{
        res.status(401).json({error: error | 'Requête non authentifiée !'});
    }

};