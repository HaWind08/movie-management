// File tổng chứa các router
const systemConfig = require("../../config/system");
const authMiddleware = require("../../middlewares/admin/auth.middleware");

const dashboardRouter = require("./dashboard.router");
const authRouter = require("./auth.router");
const movieRouter = require("./movie.router");

module.exports = (app) => {
    const PATH_ADMIN = systemConfig.prefixAdmin;

    app.use(PATH_ADMIN + "/dashboard", authMiddleware.requireAuth, dashboardRouter);

    app.use(PATH_ADMIN + "/auth", authRouter);

    app.use(PATH_ADMIN + "/movies", movieRouter);

}