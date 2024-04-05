const Sequelize = require("sequelize");

const connection = new Sequelize("nometabela", "root", "senha", {
  host: "localhost",
  dialect: "mysql",
  timezone: "-03:00",
});

module.exports = connection;
