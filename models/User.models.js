
const sql = require("./db.js");


// constructor
const User = function(client) {
    this.pseudo = client.pseudo;
    this.password = client.password;
    this.nom_complet = client.nom_complet;
    this.admin = client.admin;
    this.profilPic= client.profilPic;
};


User.create = (newUtilisateur, result) => {
    sql.query("INSERT INTO user SET ?", newUtilisateur, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      console.log("created user: ", { id: res.insertId, ...newUtilisateur });
      result(null, { id: res.insertId, ...newUtilisateur });
    });
  };

  User.getAll = result => {
    sql.query("SELECT * FROM user", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log("users: ", res);
      result(null, res);
    });
  };

  User.findOne= (pseudo, result) => {
    sql.query(`SELECT * FROM user WHERE pseudo = ?`, [pseudo], (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      if (res.length) {
        console.log("found pseudo: ", res[0]);
        result(null, res[0]);
        return;
      }
      // not found user with the id
      result({ kind: "not_found" }, null);
    });
  }; 

  User.findById = (userId, result) => {
    sql.query(`SELECT * FROM user WHERE id = ?`, [userId] ,(err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      if (res.length) {
        console.log("found user: ", res[0]);
        result(null, res[0]);
        return;
      }
  
      // not found user with the id
      result({ kind: "not_found" }, null);
    });
  };


  User.updateById = (id, user, result) => {
    sql.query(
      "UPDATE user SET pseudo = ?, password = ?, nom_complet = ?, admin = ?, profilPic = ? WHERE id = ?",
      [user.email, user.password, user.name, user.firstname, user.job, user.admin, user.profilPic, id],
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
        console.log("updated user: ", { id: id, ...user });
        result(null, { id: id, ...user });
      })};


  User.remove = (id, result) => {
    sql.query("DELETE FROM user WHERE id = ?", [id], (err, res) => {
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
  
      console.log("deleted user with id: ", id);
      result(null, res);
    });
  };

  User.removeAll = result => {
    sql.query("DELETE FROM user", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log(`deleted ${res.affectedRows} users`);
      result(null, res);
    });
  };



module.exports = User;