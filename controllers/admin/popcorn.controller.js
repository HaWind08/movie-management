const Popcorn = require("../../models/popcorn.model");
const Account = require("../../models/accounts.model");
const systemConfig = require("../../config/system");

const paginationHelper = require("../../helpers/pagination");
const pagination = require("../../helpers/pagination");

// [GET] /admin/popcorn
module.exports.index = async (req, res) => {
    let find = {
        deleted: false
    };

    // pagination
    const countPopcorns = await Popcorn.countDocuments(find);
    let objectPagination = paginationHelper(
        {
            currentPage: 1,
            limitItems: 5
        },
        req.query,
        countPopcorns
    );
    // end pagination

    const popcorns = await Popcorn.find(find).limit(objectPagination.limitItems).skip(objectPagination.skip);

    for(const popcorn of popcorns) {
        const user = await Account.findOne({
            _id: popcorn.createdBy.account_id
        });

        if(user) {
            popcorn.accountFullName = user.fullName;
        };
    };

    res.render("admin/pages/popcorns/index.pug", {
        pageTitle: "Danh sách bắp nước",
        currentPage: "popcorns",
        popcorns: popcorns,
        pagination: objectPagination
    });
};

// [GET] /admin/popcorn/create
module.exports.create = async (req, res) => {
    res.render("admin/pages/popcorns/create.pug", {
        pageTitle: "Tạo bắp nước",
        currentPage: "popcorns",
    });
};

// [POST] /admin/popcorn/create
module.exports.createPost = async (req, res) => {
    req.body.price = parseInt(req.body.price);
    req.body.stock = parseInt(req.body.stock);

    if(req.body.position === "") {
        const countPopcorn = await Popcorn.countDocuments();
        req.body.position = countPopcorn + 1;
    } else {
        req.body.position = parseInt(req.body.position);
    };

    req.body.createdBy = { //gắn giá trị cho trường createBy trong bảng
        account_id: res.locals.user.id
    }

    const popcorn = new Popcorn(req.body);
    popcorn.save();

    req.flash("success", "Tạo sản phẩm thành công!");
    res.redirect(`${systemConfig.prefixAdmin}/popcorns`);
};