// File tổng chứa các router
const homeRouter = require("./home.router");
const movieRouter = require("./movie.router");
const userRouter = require("./user.router");
const searchRouter = require("./search.router");
const userMiddleware = require("../../middlewares/client/user.middleware");

module.exports = (app) => {
    app.use(userMiddleware.infoUser);

    app.use("/", homeRouter);

    app.use("/movies", movieRouter);

    app.use("/user", userRouter);

    app.use("/search", searchRouter);
};