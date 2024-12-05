const MovieUpcoming = require("../../models/movie-upcoming.model");
const Account = require("../../models/accounts.model");
const systemConfig = require("../../config/system");

const paginationHelper = require("../../helpers/pagination");

// [GET] /admin/movies-upcoming
module.exports.index = async (req, res) => {
    let find = {
        deleted: false
    };

    // Pagination
    const countMovies = await MovieUpcoming.countDocuments(find);
    let objectPagination = paginationHelper(
        {
            currentPage: 1,
            limitItems: 4
        },
        req.query,
        countMovies
    );
    // End pagination

    const movies = await MovieUpcoming.find(find).limit(objectPagination.limitItems).skip(objectPagination.skip);

    // Hiển thị lịch sử thay đổi sản phẩm
    for (const movie of movies) {
        const user = await Account.findOne({
            _id: movie.createdBy.account_id
        });

        if(user) {
            movie.accountFullName = user.fullName;
        };
    }

    res.render("admin/pages/movies-upcoming/index.pug", {
        pageTitle: "Danh sách phim",
        currentPage: "movies-upcoming",
        movies: movies,
        pagination: objectPagination
    });
};

// [GET] /admin/movies-upcoming/create
module.exports.create = async (req, res) => {
    res.render("admin/pages/movies-upcoming/create.pug", {
        pageTitle: "Thêm mới phim",
        currentPage: "movies-upcoming"
    });
};

// [POST] /admin/movies-upcoming/create
module.exports.createPost = async (req, res) => {
    req.body.ticket_prices.adult = parseInt(req.body.ticket_prices.adult) || 0;
    req.body.ticket_prices.child = parseInt(req.body.ticket_prices.child) || 0;

    // Kiểm tra vị trí được điền hay không
    if(req.body.position == ""){
        const countMovies = await MovieUpcoming.countDocuments();
        req.body.position = countMovies + 1;
    } else {
        req.body.position = parseInt(req.body.position);
    }

    // Kiểm tra lịch sử thay đổi sản phẩm
    req.body.createdBy = { //gắn giá trị cho trường createBy trong bảng
        account_id: res.locals.user.id
    }

    // Lưu vào DB
    const movie = new MovieUpcoming(req.body);
    await movie.save();

    req.flash("success", "Tạo sản phẩm thành công!");
    res.redirect(`${systemConfig.prefixAdmin}/movies-upcoming`);
};