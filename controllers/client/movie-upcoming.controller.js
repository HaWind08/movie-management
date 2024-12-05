const MovieUpcoming = require("../../models/movie-upcoming.model");

// [GET] /movies
module.exports.index = async (req, res) => {
    // lấy ds phim từ DB
    const movies = await MovieUpcoming.find({
        status: "active",
        deleted: false
    });

    res.render("client/pages/movies-upcoming/index.pug", {
        pageTitle: "Danh sách phim",
        movies: movies
    });
};

// [GET] /movies/detail/:slugMovie
module.exports.detail = async (req, res) => {
    try {
        const find = {
            slug: req.params.slugMovie,
            status: "active",
            deleted: false
        };

        // Tìm phim trong DB
        const movies = await MovieUpcoming.findOne(find);

        res.render("client/pages/movies-upcoming/detail.pug", {
            pageTitle: "Chi tiết phim",
            movies: movies,
        });
    } catch (error) {
        res.redirect(`/movies-upcoming`);
    };
};