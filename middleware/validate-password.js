const passwordSchema = require('../models/Password');
"use strict";

module.exports = (req, res, next) => {
    if (!passwordSchema.validate(req.body.password)) {
         res.status(400).json({ error: 'Mot de passe pas assez fort ! ',
        message : passwordSchema.validate(req.body.password, { list: true }) });
    } else {
        console.log("Mot de passe accepté");
        next();
    }
  };