const Ticket = require("../../models/ticket.model");

// Đặt vé không cần đăng nhập
module.exports.ticketId = async (req, res, next) => {
    if (!req.cookies.ticketId) {
        // Tạo vé (Chưa có)
        const ticket = new Ticket();
        await ticket.save();

        const expiresCookies = 30 * 24 * 60 * 60 * 1000; //30 * 24 * 60 * 60 * 1000
        res.cookie("ticketId", ticket.id, {
            expires: new Date(Date.now() + expiresCookies)
        });
    }; 

    next();
};