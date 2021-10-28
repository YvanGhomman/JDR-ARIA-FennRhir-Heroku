const sql = require("./db.js");


// constructor
const Comment = function(com) {
    this.commentary = com.commentary,
    this.id_article = com.id_article,
    this.id_user = com.id_user;
};


Comment.create = (newComment, result) => {
    sql.query("INSERT INTO commentaire SET ?", newComment, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      console.log("created comment: ", { id: res.insertId, ...newComment });
      result(null, { id: res.insertId, ...newComment });
    });
  };

  Comment.getAll = result => {
    sql.query("SELECT commentaire.id, commentary, id_user, date_creation, id_article, admin, nom_complet, profilPic FROM commentaire INNER JOIN user ON user.id = commentaire.id_user ORDER BY date_creation ASC", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log("comments: ", res);
      result(null, res);
    });
  };

  Comment.findByArticleId = (articleId, result) => {
    sql.query(`SELECT commentaire.id, commentary, id_user, date_creation, id_article, admin, nom_complet, profilPic FROM commentaire INNER JOIN user ON user.id = commentaire.id_user WHERE id_article = ? ORDER BY date_creation ASC`, [articleId], (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      if (res.length) {
        console.log("found comments of the article: ", res);
        result(null, res);
        return;
      }
  
      // not found article with the id
      result({ kind: "not_found" }, null);
    });
  };

  Comment.findById = (commentId, result) => {
    sql.query(`SELECT commentaire.id, commentary, id_user, date_creation, id_article, admin, nom_complet, profilPic FROM commentaire INNER JOIN user ON user.id = commentaire.id_user WHERE commentaire.id = ?`, [commentId],(err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      if (res.length) {
        console.log("found comment: ", res[0]);
        result(null, res[0]);
        return;
      }
  
      // not found article with the id
      result({ kind: "not_found" }, null);
    });
  };


  Comment.updateById = (id, comment, result) => {
    sql.query(
      "UPDATE commentaire SET commentary = ? WHERE id = ?",
      [comment.commentary, id],
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }
  
        if (res.affectedRows == 0) {
          // not found Customer with the id
          result({ kind: "not_found" }, null);
          return;
        }
        console.log("updated comment: ", { id: id, ...comment });
        result(null, { id: id, ...comment });
      })};


      Comment.remove = (id, result) => {
    sql.query("DELETE FROM commentaire WHERE id = ?", id, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      if (res.affectedRows == 0) {
        // not found user with the id
        result({ kind: "not_found" }, null);
        return;
      }
  
      console.log("deleted comment with id: ", id);
      result(null, res);
    });
  };

  Comment.removeAll = result => {
    sql.query("DELETE FROM commentaire", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log(`deleted ${res.affectedRows} comments`);
      result(null, res);
    });
  };


module.exports = Comment;