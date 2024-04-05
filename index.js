const express = require("express");
const app = express();
const session = require("express-session");
const connection = require("./database/database");

const categoriesController = require("./categories/CategoriesController");
const articlesController = require("./articles/ArticlesController");
const usersController = require("./users/usersController");

const Article = require("./articles/Article");
const Category = require("./categories/Category");
const User = require("./users/User");

//View engine
app.set("view engine", "ejs");

//Sessions
app.use(
  session({
    secret: "qualquercoisa",
    cookie: {
      maxAge: 3000000,
    },
  })
);

//Static
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Database
connection
  .authenticate()
  .then(() => {
    console.log("Conexão feita com sucesso");
  })
  .catch((err) => {
    console.log(err);
  });

app.use("/", categoriesController);
app.use("/", articlesController);
app.use("/", usersController);

// app.get("/session", (req, res) => {
//   req.session.treinamento = "Formação node.js";

//   res.send("Sessão gerada");
// });

// app.get("/leitura", (req, res) => {
//   res.json({ treinamento: req.session.treinamento });
// });

app.get("/", (req, res) => {
  Article.findAll({
    order: [["id", "DESC"]],
    limit: 4,
  }).then((articles) => {
    Category.findAll().then((categories) => {
      res.render("index", { articles: articles, categories: categories });
    });
  });
});

app.get("/:slug", (req, res) => {
  var slug = req.params.slug;
  Article.findOne({
    where: {
      slug: slug,
    },
  })
    .then(function (article) {
      if (article != undefined) {
        Category.findAll().then((categories) => {
          res.render("article", { article: article, categories: categories });
        });
      } else {
        res.redirect("/");
      }
    })
    .catch(function (err) {
      console.log(err);
      res.redirect("/");
    });
});

app.get("/category/:slug", (req, res) => {
  var slug = req.params.slug;
  Category.findOne({
    where: {
      slug: slug,
    },
    include: [{ model: Article }],
  })
    .then((category) => {
      if (category != undefined) {
        Category.findAll().then((categories) => {
          res.render("index", {
            articles: category.articles,
            categories: categories,
          });
        });
      } else {
        res.redirect("/");
      }
    })
    .catch((err) => {
      res.redirect("/");
    });
});

app.listen(8080, () => {
  console.log("servidor rodando");
});
