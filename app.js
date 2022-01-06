// ************ Require's ************
const createError = require("http-errors");
const cookies = require("cookie-parser");
const express = require("express");
const session = require("express-session");
//const logger = require('morgan');
const path = require("path");
const methodOverride = require("method-override"); // Pasar poder usar los métodos PUT y DELETE

const app = express();

const cors = require("cors");
var corsOptions = {
  origin: "*",
};

app.use(cors(corsOptions));
let allowCrossDomain = function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "OPTIONS, POST, GET, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With"
  );
  next();
};
app.use(allowCrossDomain);

//*const mainRutas = require('./src/routes/mainRouter');
//*const productsRouter = require('./src/routes/products'); // Rutas /products
//*const usersRouter = require('./src/routes/users'); // Rutas /users
//*const userLoggedMiddleware = require('./src/middlewares/userLoggedMiddleware');
const { cookie } = require("express-validator");

app.use(
  session({
    secret: "topsecret",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(cookies());
//*app.use(userLoggedMiddleware);

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(methodOverride("_method"));

//llamado de api de productos
const apiProductRouter = require("./src/routes/api/products");
//llamado de api de usuarios
//******* */
const apiUserRouter = require("./src/routes/api/users");

app.use(express.static(path.resolve(__dirname, "public")));

//Template Enginee
app.set("view engine", "ejs");
app.set("views", path.resolve(__dirname, "./src/views"));

//*app.use('/', mainRutas);
//*app.use('/products', productsRouter);
//ageragar ruta de users
//*app.use('/users', usersRouter);

//Aquí creo la colección de mis recursos de productos (APIs)
app.use("/api/products", apiProductRouter);
app.use("/api/users", apiUserRouter);

app.listen(3001, () => {
  console.log("Servidor funcionando en el puerto 3001");
});
