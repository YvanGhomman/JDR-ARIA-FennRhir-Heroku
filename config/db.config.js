require('dotenv').config();

module.exports = {
    HOST: /* process.env.DB_HOST */ "eu-cdbr-west-01.cleardb.com",
    USER: /* process.env.DB_USER */ "b6017d09c3b5cf",
    PASSWORD: /* process.env.DB_PASSW */ "d9d84aed",
    DB: /* process.env.DB_DB  */"heroku_94b94d867de9aff"
  };