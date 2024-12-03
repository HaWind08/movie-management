const Ticket = require("../../models/ticket.model");
const Movie = require("../../models/movie.model");
const Order = require("../../models/order.model");

// [GET] /checkout
module.exports.index = async (req, res) => {
    const ticketId = req.cookies.ticketId;

    const ticket = await Ticket.findOne({
        _id: ticketId,
    });

    if (ticket.tickets.length > 0) {
        for (const item of ticket.tickets) {
            const movieId = item.movie_id;
            const movieInfo = await Movie.findOne({
                _id: movieId,
            }).select("title thumnail slug");

            item.movieInfo = movieInfo;
        }

    }

    // console.log(ticket);

    res.render("client/pages/checkout/index.pug", {
        pageTitle: "Đặt hàng",
        ticketDetail: ticket
    });
}

// [POST] /checkout/order
module.exports.order = async (req, res) => {
    const ticketId = req.cookies.ticketId;
    const userInfo = req.body;

    const ticket = await Ticket.findOne({
        _id: ticketId
    });

    const tickets = [];
    for (const item of ticket.tickets) {
        const objectTicket = {
            movie_id: item.movie_id,
            adult_quantity: item.adult_quantity,
            child_quantity: item.child_quantity,
        };

        tickets.push(objectTicket);
    };

    const popcorns = [];
    for (const item of ticket.popcorns) {
        const objectPopcorn = {
            popcorn_id: item.popcorn_id,
            popcorn_name: item.popcorn_name,
            popcorn_quantity: item.popcorn_quantity
        };

        popcorns.push(objectPopcorn);
    };

    const seats = ticket.seats.map(seat => seat);

    // console.log(ticketId);
    // console.log(userInfo);
    // console.log(tickets);
    // console.log(popcorns);
    // console.log(seats);

    const orderInfo = {
        ticket_id: ticketId,
        userInfo: userInfo,
        tickets: tickets,
        popcorns: popcorns,
        seats: seats,
        theater: ticket.theater,
        address: ticket.address,
        time: ticket.time,
        totalPrice: ticket.totalPrice,
        adult_name: ticket.adult_name,
        child_name: ticket.child_name,
    };

    const order = new Order(orderInfo);
    order.save();

    // reset thông tin trong ticket
    await Ticket.updateOne({ _id: ticketId }, {
        tickets: [],
        popcorns: [],
        seats: [],
        theater: "",
        address: "",
        time: "",
        totalPrice: "",
        adult_name: "",
        child_name: "",
    });

    res.redirect(`/checkout/success/${order.id}`);
}

// [GET] /checkout/success/:orderId
module.exports.success = async (req, res) => {
    const order = await Order.findOne({
        _id: req.params.orderId
    });

    for (const item of order.tickets) {
        const movieInfo = await Movie.findOne({
            _id: item.movie_id,
        }).select("title thumbnail");

        item.movieInfo = movieInfo;

        // console.log(movieInfo);
    };

    // console.log(order);

    res.render("client/pages/checkout/success.pug", {
        pageTitle: "Đặt hàng thành công",
        order: order
    });
}