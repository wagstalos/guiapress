const Sequelize = require("sequelize");
const connection = require("../database/database");
const Article = require("../articles/Article");

const Category = connection.define("categories", {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  slug: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

Category.sync({ force: false }).then(() => {
  console.log("Tabela de artigos sincronizada com sucesso");
});

module.exports = Category;
