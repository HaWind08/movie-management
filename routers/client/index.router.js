// File tổng chứa các router
const homeRouter = require("./home.router");
const movieRouter = require("./movie.router");

module.exports = (app) => {
    app.use("/", homeRouter);

    app.use("/movies", movieRouter);
};