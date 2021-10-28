const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User.models.js');
const Article = require('../models/Article.models.js');
require('dotenv').config();
const fs = require('fs');


// Create and Save a new user
exports.signup = (req, res, next) => {
      bcrypt.hash(req.body.password, 10)
      .then(hash => {
        const utilisateur = new User({
          pseudo: req.body.pseudo,
          password: hash,
          nom_complet: req.body.nom_complet,
          admin: 0,
          profilPic: `${req.protocol}://${req.get('host')}/profilPic/${req.file.filename}`
        });
    
        User.create(utilisateur, (err, data) => {
          if (err)
           return res.status(500).json({
              message:
                err.message || "Une erreur est servenue lors de la création du User.",
                error: err
            });
          else {
                res.status(200).json({
                //Configuration du token
                  token: jwt.sign(
                    { isAdmin: data.admin,
                      userId: data.id,
                      userNom_complet: data.nom_complet,
                      userPseudo: data.pseudo,
                      profilPic:data.profilPic,
                    },
                    process.env.DB_TOK,
                    { expiresIn: '24h' }
                  )
                });}
        });
    })
      .catch(error => res.status(500).json({ error: error}));

};


exports.login = (req, res, next) => {
  User.findOne(req.body.pseudo, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).json({
          message: `Le user avec le pseudo ${req.body.pseudo} n'a pas été trouvé.`,
          error: err
        });
      } else {
        res.status(500).json({
          message: "Erreur de récupération du user avec le pseudo " + req.body.pseudo,
          error: err
        });
      }
    } else {
      bcrypt.compare(req.body.password, data.password)
        .then(valid => {
          if (!valid) {
            return res.status(401).json({ error: 'Mot de passe incorrect !',
          message : 'Mot de passe incorrect !' });
          } else {
            res.status(200).json({
              //Configuration du token
              token: jwt.sign(
                { isAdmin: data.admin,
                  userId: data.id,
                  userNom_complet: data.nom_complet,
                  userPseudo: data.pseudo,
                  profilPic:data.profilPic,
                },
                process.env.DB_TOK,
                { expiresIn: '24h' }
            )
          });
          }
        }).catch(error => res.status(500).json({ error, message : 'Mot de passe incorrect !' }))
  } 
  });
};



// Retrieve all users from the database
exports.findAll = (req, res) => {
  User.getAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Une erreur est servenue lors de la récupération des Users."
        });
      else res.send(data);
    });
};

// Find a single user with a userId
exports.findOne = (req, res) => {
  User.findById(req.params.userId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Le User avec l'id ${req.params.userId} n'a pas été trouvé.`
          });
        } else {
          res.status(500).send({
            message: "Erreur de récupération du User avec l'id " + req.params.userId
          });
        }
      } else res.send(data);
    });
};

// Update a user identified by the userId in the request
exports.update = (req, res, next) => {
  // Validate Request
  if (!req.body) {
      res.status(400).send({
        message: "Le champ ne peut pas être vide !"
      });
    }
    bcrypt.hash(req.body.password, 10)
    .then(hash => {
      const utilisateur = new User({
        pseudo: req.body.pseudo,
        password: hash,
        nom_complet: req.body.nom_complet,
        admin: 0,
        profilPic: `${req.protocol}://${req.get('host')}/profilPic/${req.file.filename}`
      });
  
      User.findById(req.params.userId, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Le User avec l'id ${req.params.userId} n'a pas été trouvé.`
            });
          } else {
            res.status(500).send({
              message: "Erreur de récupération du User avec l'id " + req.params.userId
            });
          }
        } else {

          const filename = data.profilPic.split('/profilPic/')[1];
          fs.unlink(`profilPic/${filename}`, () => {
            
            User.updateById(req.params.userId, utilisateur, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Le User avec l'id ${req.params.userId} n'a pas été trouvé.`
            });
          } else {
            res.status(500).send({
              message: "Erreur de mise à jour du User avec l'id " + req.params.userId
            });
          }
        } else res.send(data);
      }
      )
      
          });

        }
      });

    
    })
    .catch(error => res.status(500).json({ error }));
  
};

// Delete a user with the specified userId in the request
exports.delete = (req, res) => {


  User.findById(req.params.userId, (err, dota) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Le User avec l'id ${req.params.userId} n'a pas été trouvé.`
        });
      } else {
        res.status(500).send({
          message: "Erreur de récupération du User avec l'id " + req.params.userId
        });
      }
    }else{
        //On recherche les articles créés par cet utilisateur
          Article.findByUserId(dota.id, (err, donnee) => {
            
            if(!donnee){
              //Si il n'ya pas d'articles créés, on supprime l'utilisateur et sa photo de profil
              const filename = dota.profilPic.split('/profilPic/')[1];
                fs.unlink(`profilPic/${filename}`, () => {
                    User.remove(req.params.userId, (err, data) => {
                      if (err) {
                            if (err.kind === "not_found") {
                                  res.status(404).send({
                                    message: `Le User avec l'id ${req.params.userId} n'a pas été trouvé.`
                                  });
                            } else {
                                  res.status(500).send({
                                    message: "Erreur de suppression du User avec l'id " + req.params.userId
                                  });
                                }
                              } else res.send({ message: `Le User a été supprimé !` });
                      });
                    })


            }else{
            //Si on trouve des articles créés par l'utilisateur
              if (err) {
                if (err.kind === "not_found") {
                  res.status(404).send({
                    message: `L'article avec le user_id ${donnee.id} n'a pas été trouvé.`
                  });
                } else {
                  res.status(500).send({
                    message: "Erreur de récupération de l'article avec le user_id " + donnee.id
                  });
                }
              }else{
                //Pour chaque article créé par cet utilisateur on vérifie s'il a mis une image avec
                for (const element of donnee) {
                  //Si il n'y a pas d'image, on ne fait rien
                  if(!element.imageUrl){
                  console.log("Il n'y a pas d'image dans cet article !");
              
                  }else{
                    //Si il y a une image dans l'article, on la supprime
                    const filename = element.imageUrl.split('/images/')[1];
                    fs.unlink(`images/${filename}`, () => {
                        console.log("Image supprimée"); 
                    })
                  };
                }
                //On supprime ensuite l'utilisateur et sa photo de profil
                const filename = dota.profilPic.split('/profilPic/')[1];
                fs.unlink(`profilPic/${filename}`, () => {
                  User.remove(req.params.userId, (err, data) => {
                    if (err) {
                      if (err.kind === "not_found") {
                        res.status(404).send({
                          message: `Le User avec l'id ${req.params.userId} n'a pas été trouvé.`
                        });
                      } else {
                        res.status(500).send({
                          message: "Erreur de suppression du User avec l'id " + req.params.userId
                        });
                      }
                    } else res.send({ message: `Le User a été supprimé !` });
                  });
                })         
              };
            }
          })
      }
  })
}
              





// Delete all users from the database.
exports.deleteAll = (req, res) => {
  User.removeAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Une erreur est survenue lors de la suppression de tous les Users."
        });
      else res.send({ message: `Les Users ont été supprimés !` });
    });
};



