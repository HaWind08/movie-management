const Movie = require("../../models/movie.model");
const MovieUpcoming = require("../../models/movie-upcoming.model");

// [GET] /
module.exports.index = async (req, res) => {
    // Lấy ra phim nổi bật
    const moviesFeatured = await Movie.find({
        featured: "1",
        status: "active",
        deleted: false
    }).limit(4);

    const moviesUpcomingFeatured = await MovieUpcoming.find({
        featured: "1",
        status: "active",
        deleted: false
    }).limit(4);

    res.render("client/pages/home/index.pug", {
        pageTitle: "Trang chủ",
        // --> view (index.pug - home)
        moviesFeatured: moviesFeatured,
        moviesUpcoming: moviesUpcomingFeatured
    });
};