const md5 = require("md5");
const User = require("../../models/user.model");
const ForgotPassword = require("../../models/forgot-password.model");
const Ticket = require("../../models/ticket.model");
const Order = require("../../models/order.model");
const Movie = require("../../models/movie.model");

const generateHelper = require("../../helpers/generate");
const sendMailHelper = require("../../helpers/sendMail");

// [GET] /user/register
module.exports.register = async (req, res) => {
    res.render("client/pages/user/register.pug", {
        pageTitle: "Đăng ký tài khoản"
    });
};

// [POST] /user/register
module.exports.registerPost = async (req, res) => {
    const existEmail = await User.findOne({
        email: req.body.email
    });

    if (existEmail) {
        req.flash("error", "Email đã tồn tại!");
        res.redirect("back");
        return;
    };

    req.body.password = md5(req.body.password);

    const user = new User(req.body);
    await user.save();
    res.cookie("tokenUser", user.tokenUser);

    req.flash("success", "Đăng ký tài khoản thành công!");
    res.redirect("/");
};

// [GET] /user/login
module.exports.login = async (req, res) => {
    res.render("client/pages/user/login.pug", {
        pageTitle: "Đăng nhập tài khoản"
    });
};

// [POST] /user/login
module.exports.loginPost = async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    const user = await User.findOne({
        email: email,
        deleted: false
    });

    if (!user) {
        req.flash("error", "Email không tồn tại!");
        res.redirect("back");
        return;
    };

    if (md5(password) !== user.password) {
        req.flash("error", "Sai mật khẩu!");
        res.redirect("back");
        return;
    };

    if (user.status === "inactive") {
        req.flash("error", "Tài khoản đang bị khóa!");
        res.redirect("back");
        return;
    };

    // khi đăng nhập - vé
    const ticket = await Ticket.findOne({ //tìm ticketId
        user_id: user.id
    });

    if (ticket) {
        res.cookie("ticketId", ticket.id); // trả ra ticketId đã có
    } else {
        const newTicket = new Ticket({ user_id: user.id });
        await newTicket.save();
        const expiresCookies = 30 * 24 * 60 * 60 * 1000;
        res.cookie("ticketId", newTicket.id, {
            expires: new Date(Date.now() + expiresCookies)
        });

        await Ticket.updateOne({ _id: req.cookies.ticketId }, {
            user_id: user.id
        });
    };

    res.cookie("tokenUser", user.tokenUser);
    req.flash("success", "Đăng nhập thành công!");
    res.redirect("/");
};

// [GET][POST] /user/logout
module.exports.logout = async (req, res) => {
    res.clearCookie("tokenUser");
    res.clearCookie("ticketId");
    req.flash("error", "Tài khoản của bạn đã được đăng xuất!");
    res.redirect("/");
};

// [GET] /user/password/forgot
module.exports.forgotPassword = async (req, res) => {
    res.render("client/pages/user/forgot-password.pug", {
        pageTitle: "Lấy lại mật khẩu"
    });
};

// [POST] /user/password/forgot
module.exports.forgotPasswordPost = async (req, res) => {
    const email = req.body.email;

    const user = await User.findOne({
        email: email,
        deleted: false
    });

    if (!user) {
        req.flash("error", "Email không tồn tại!");
        res.redirect("back");
        return;
    };

    // Lưu thông tin vào DB
    const otp = generateHelper.generateRandomNumber(8);

    const objectForgotPassword = {
        email: email,
        otp: otp,
        expireAt: Date.now()
    };

    const forgotPassword = new ForgotPassword(objectForgotPassword);
    await forgotPassword.save();

    // Nếu tồn tại email này thì gửi mã OTP qua email
    const subject = "Mã OTP xác minh lấy lại mật khẩu";
    const html = `
        Kính gửi ${user.fullName},
        <br>
        Chúng tôi đã nhận được yêu cầu của bạn về việc xác thực lấy lại mật khẩu. Dưới đây là mã OTP của bạn:
        <br>
        **Mã OTP của bạn: <b style="color: green;"> ${otp} </b>**
        <br>
        Lưu ý: Mã này chỉ có hiệu lực trong vòng 10 phút và sẽ hết hạn sau thời gian này. Vui lòng không chia sẻ mã OTP này với bất kỳ ai để đảm bảo an toàn cho tài khoản của bạn.
        Nếu bạn không yêu cầu mã OTP này, vui lòng bỏ qua email này hoặc liên hệ với chúng tôi ngay lập tức để được hỗ trợ.
        <br>
        Trân trọng, <br>  
        Movie Cinestar  <br>
        Bộ phận Hỗ trợ Khách hàng  <br>
        Email: support@yourcompany.com  <br>
        Số điện thoại: 0912686868 <br>
    `
    sendMailHelper.sendMail(email, subject, html);

    req.flash("success", "Đã gửi mã OTP vui lòng kiểm tra mail!");
    res.redirect(`/user/password/otp?email=${email}`);
};

// [GET] /user/password/otp
module.exports.otpPassword = async (req, res) => {
    const email = req.query.email;

    res.render("client/pages/user/otp-password.pug", {
        pageTitle: "Nhập mã OTP",
        email: email
    });
};

// [POST] /user/password/otp
module.exports.otpPasswordPost = async (req, res) => {
    const email = req.body.email;
    const otp = req.body.otp;

    const result = await ForgotPassword.findOne({
        email: email,
        otp: otp
    });

    if (!result) {
        req.flash("error", "OTP không hợp lệ!");
        res.redirect("back");
        return;
    };

    // trả lại token user cho client
    const user = await User.findOne({
        email: email
    });
    res.cookie("tokenUser", user.tokenUser); //đổi xong mật khẩu --> đăng nhập rồi

    req.flash("success", "Nhập mã OTP thành công!");
    res.redirect("/user/password/reset");
};

// [GET] /user/password/reset
module.exports.resetPassword = async (req, res) => {
    res.render("client/pages/user/reset-password.pug", {
        pageTitle: "Đổi mật khẩu",
    });
};

// [POST] /user/password/reset
module.exports.resetPasswordPost = async (req, res) => {
    const password = req.body.password;
    const tokenUser = req.cookies.tokenUser; //user cần đổi mật khẩu

    console.log("Da chay sang controller");
    console.log(password);
    console.log(tokenUser);

    const user = await User.findOne({ tokenUser: tokenUser });

    if (user.password === md5(password)) {
        req.flash("error", "Mật khẩu mới phải khác mật khẩu cũ!");
        return res.redirect("back");
    }

    await User.updateOne(
        { tokenUser: tokenUser },
        { password: md5(password) }
    );

    req.flash("success", "Đổi mật khẩu thành công!");
    res.redirect("/");
};

// [GET] /user/info
module.exports.info = async (req, res) => {
    res.render("client/pages/user/info.pug", {
        pageTitle: "Thông tin cá nhân",
    });
};

// [PATCH] /user/info/edit/:id
module.exports.editInfo = async (req, res) => {
    try {
        await User.updateOne({ _id: req.params.id }, {
            ...req.body
        });

        req.flash("success", "Cập nhật thành công!");
    } catch (error) {
        req.flash("error", "Cập nhật thất bại!");
    }

    res.redirect("back");
};

// [GET] /user/history
module.exports.history = async (req, res) => {
    // console.log(res.locals.user.id);
    const orderHistory = await Order.find({
        user_id: res.locals.user.id
    });

    for (const order of orderHistory) {
        for (const ticket of order.tickets) {
            const movieInfo = await Movie.findOne({
                _id: ticket.movie_id,
            }).select("title");

            ticket.movieInfo = movieInfo;
        };
    };

    res.render("client/pages/user/history.pug", {
        pageTitle: "Lịch sử đặt vé",
        orderHitory: orderHistory
    });
};
