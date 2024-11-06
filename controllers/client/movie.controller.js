
// [GET] /movies
module.exports.index = async (req, res) => {
    res.render("client/pages/movies/index.pug", {
        pageTitle: "Danh sách phim",
        // --> view (index.pug - movies)
    });
}