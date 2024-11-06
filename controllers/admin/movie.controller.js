

// [GET] /admin/movies
module.exports.index = async (req, res) => {
    res.render("admin/pages/movies/index.pug", {
        pageTitle: "Danh sách phim",
        currentPage: "movies"
    });
};

// [GET] /admin/movies/create
module.exports.create = async (req, res) => {
    res.render("admin/pages/movies/create.pug", {
        pageTitle: "Thêm mới phim",
        currentPage: "movies"
    });
};