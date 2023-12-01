// importa usuario e senha do arquivo externo
const json = require("./data/user.json");
const data = JSON.parse(JSON.stringify(json));

// importa o express & session
const express = require("express");
const session = require("express-session");


const bodyParser = require("body-parser");

const port = 3030;
const path = require("path");
const { log } = require("console");
const app = express();

// parametro chave que vai ser gerada para cada sessão logad
app.use(session({ secret: "d9dsa8dyas7yd7asyda7syd7asdas7" }));

// recuperação dos dados via bodyparser
app.use(bodyParser.urlencoded({ extended: true }));

// renderização das páginas
app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");
app.use("/public", express.static(path.join(__dirname, "public")));
app.set("views", path.join(__dirname, "/views"));

// envio dos campos de login
app.post("/", (req, res) => { 
  let useript = req.body.user;
  let passwordipt = req.body.password;

  if (data.user == useript && data.password == passwordipt) {
    req.session.login = useript;
    res.render("index");
    console.log("usuario válido: " + useript + " " + passwordipt);
  } else {
    res.render("login");
    console.log("usuario inválido: " + useript + " " + passwordipt);
  }
});

// abrir link direto
app.get("/", (req, res) => {
  if (req.session.login) {
    // verifica se existe alguma sessão e redireciona caso exista
    res.render("index"); 
  } else {
    res.render("login");
  }
});

// servidor iniciado
app.listen(port, () => {
  console.log("servidor rodando em localhost:" + port);
});

