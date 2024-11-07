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
}