// article.js
const Sequelize = require("sequelize");
const connection = require("../database/database");
const Category = require("../categories/Category");
// instanciar o modelo Category

const Article = connection.define("articles", {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  slug: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  body: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
});

// Category.associate(Article);
// Article.belongsTo(Category); // Um artigo pertence a uma categoria

Article.sync({ force: false }).then(() => {
  console.log("Tabela de artigos sincronizada com sucesso");
});

module.exports = Article;
