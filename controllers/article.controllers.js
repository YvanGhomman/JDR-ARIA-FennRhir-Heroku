const sql = require("../models/db.js");
const Article = require('../models/Article.models.js');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const fs = require('fs');



// Create and Save a new user
exports.create = (req, res) => {

  if (!req.body) {
    res.status(400).send({
      message: "Le champ ne peut pas être vide !"
    })};

if(!req.file){
  console.log("Cet article n'a pas d'image");
  const article = new Article({
    titre: req.body.titre,
    contenu: req.body.contenu,
    id_user: req.body.id_user,
    imageUrl: null,
  });

  Article.create(article, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Une erreur est servenue lors de la création de l'article."
      });
    else res.send(data);
  });

}else{
  console.log("Cet article a une image");
  const article = new Article({
    titre: req.body.titre,
    contenu: req.body.contenu,
    id_user: req.body.id_user,
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
  });
  Article.create(article, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Une erreur est servenue lors de la création de l'article."
      });
    else res.send(data);
  });

}

};
    

// Retrieve all Articles from the database
exports.findAll = (req, res) => {
  Article.getAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Une erreur est servenue lors de la récupération des Articles."
        });
      else res.send(data);
    });
};

// Find a single Article with a ArticleId
exports.findOne = (req, res) => {
    Article.findById(req.params.articleId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `L'article avec l'id ${req.params.articleId} n'a pas été trouvé.`
          });
        } else {
          res.status(500).send({
            message: "Erreur de récupération de l'article avec l'id " + req.params.articleId
          });
        }
      } else res.send(data);
    });
};

exports.findArticleWithUserId = (req, res) =>{
  Article.findByUserId(req.params.userId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `L'article avec le user_id ${req.params.userId} n'a pas été trouvé.`
        });
      } else {
        res.status(500).send({
          message: "Erreur de récupération de l'article avec le user_id " + req.params.userId
        });
      }
    } else res.send(data); 

  });

}

// Update a user identified by the userId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
      res.status(400).send({
        message: "Le champ ne peut pas être vide !"
      });
    }
  
    Article.updateById(req.params.articleId, new Article(req.body), (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `L'article avec l'id ${req.params.articleId} n'a pas été trouvé.`
            });
          } else {
            res.status(500).send({
              message: "Erreur de mise à jour de l'article avec l'id " + req.params.articleId
            });
          }
        } else      
        res.send(data);
      }
    );
};



// Delete a user with the specified ArticleId in the request
exports.delete = (req, res) => {

  Article.findById(req.params.articleId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `L'article avec l'id ${req.params.articleId} n'a pas été trouvé.`
        });
      } else {
        res.status(500).send({
          message: "Erreur de récupération de l'article avec l'id " + req.params.articleId
        });
      }
    } else { 

      if(!data.imageUrl){
        console.log("Cet article n'avait pas d'image");
        Article.remove(req.params.articleId, (err, data) => {
          if (err) {
            if (err.kind === "not_found") {
              res.status(404).send({
                message: `L'article avec l'id ${req.params.articleId} n'a pas été trouvé.`
              });
            } else {
              res.status(500).send({
                message: "Erreur de suppression de l'article avec l'id " + req.params.articleId
              });
            }
          } else res.send({ message: `L'article a été supprimé !` });
        });


      }else{
        console.log("Cet article avait une image");
        const filename = data.imageUrl.split('/images/')[1];
        fs.unlink(`images/${filename}`, () => {

          Article.remove(req.params.articleId, (err, data) => {
            if (err) {
              if (err.kind === "not_found") {
                res.status(404).send({
                  message: `L'article avec l'id ${req.params.articleId} n'a pas été trouvé.`
                });
              } else {
                res.status(500).send({
                  message: "Erreur de suppression de l'article avec l'id " + req.params.articleId
                });
              }
            } else res.send({ message: `L'article a été supprimé !` });
          });
        });
      }
    }
  }) 

};



// Delete all users from the database.
exports.deleteAll = (req, res) => {
    Article.removeAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Une erreur est survenue lors de la suppression de tous les Articles."
        });
      else res.send({ message: `Les Articles ont été supprimés !` });
    });
};

