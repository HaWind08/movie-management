const express = require('express');
const bodyParser = require("body-parser");
const methodOverride = require('method-override');
const flash = require("express-flash");
const cookieParser = require("cookie-parser");
const session = require("express-session");
require("dotenv").config();

const app = express();
const port = process.env.PORT;

const database = require("./config/database");
database.connect();

const router = require("./routers/client/index.router");

app.use(methodOverride("_method"));
app.use(bodyParser.urlencoded({ extended: false }));

// Use express flash
app.use(cookieParser("FSDFEWRTRWT"));
app.use(session({ cookie: { maxAge: 60000 } }));
app.use(flash());
// End use express flash


app.set("views", `${__dirname}/views`);
app.set("view engine", "pug");

app.use(express.static(`${__dirname}/public`));

// Router
router(app);
// End router

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});