
module.exports.index = async (req, res) => {
    res.render("client/pages/movies/index.pug", {
        pageTitle: "Trang danh sách phim",
        // --> view 
    });
}