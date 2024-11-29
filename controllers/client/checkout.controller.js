const Ticket = require("../../models/ticket.model");
const Movie = require("../../models/movie.model");


// [GET] /checkout
module.exports.index = async (req, res) => {
    const ticketId = req.cookies.ticketId;

    const ticket = await Ticket.findOne({
        _id: ticketId,
    });

    if(ticket.tickets.length > 0) {
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
    })
}