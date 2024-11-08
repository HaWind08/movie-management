const Movie = require("../../models/movie.model");

// [GET] /movies
module.exports.index = async (req, res) => {
    // lấy ds phim từ DB
    const movies = await Movie.find({
        status: "active",
        deleted: false
    });

    res.render("client/pages/movies/index.pug", {
        pageTitle: "Danh sách phim",
        // --> view (index.pug - movies)
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
        const movies = await Movie.findOne(find);

        res.render("client/pages/movies/detail.pug", {
            pageTitle: "Chi tiết phim",
            // --> view (detail.pug - movies)
            movies: movies
        });
    } catch (error) {
        res.redirect(`/movies`);
    }

};