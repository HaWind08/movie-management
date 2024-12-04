const Ticket = require("../../models/ticket.model");
const Popcorn = require("../../models/popcorn.model");

// [GET] /ticket (/movies/detail)
module.exports.index = async (req, res) => {
}

// [POST] /ticket/add/:movieId
module.exports.addPost = async (req, res) => {
    // console.log(req.body);
    const movieId = req.params.movieId;
    const adult_quantity = parseInt(req.body.adult_quantity) || 0;
    const child_quantity = parseInt(req.body.child_quantity) || 0;
    const ticketId = req.cookies.ticketId;
    const popcorns_id = req.body.popcorn_id;
    const popcorns_quantity = req.body.popcorn_quantity;
    const seats = req.body.seats;
    const theater = req.body.theater;
    const address = req.body.address;
    const time = req.body.time;
    const totalPrice = req.body.totalPrice;
    const adult_name = req.body.adult_name || '';
    const child_name = req.body.child_name || '';


    // Nếu đặt phim đó rồi thì chỉ tăng số lượng lên
    const ticket = await Ticket.findOne({
        _id: ticketId
    });
    const existMovieInTicket = ticket.tickets.find(item => item.movie_id == movieId);
    if (existMovieInTicket) {
        // Cập nhật lại
        await Ticket.updateOne(
            { _id: ticketId, "tickets.movie_id": movieId },
            {
                $set: {
                    'tickets.$.adult_quantity': adult_quantity,
                    'tickets.$.child_quantity': child_quantity,
                    'tickets.$.expireAt': Date.now()
                },
            }
        );

        // Cập nhật bắp nước
        const objectPopcornModel = await Promise.all(
            popcorns_id.map(async (id, index) => {
                const quantity = parseInt(popcorns_quantity[index] || 0);
                if (quantity > 0) {
                    const popcornDetail = await Popcorn.findById(id);
                    return {
                        popcorn_id: id,
                        popcorn_quantity: quantity,
                        popcorn_name: popcornDetail.title
                    };
                }
            })
        ).then(results => results.filter(Boolean));

        if (objectPopcornModel.length > 0) {
            await Ticket.updateOne(
                { _id: ticketId, "tickets.movie_id": movieId },
                {
                    $set: {
                        'popcorns': objectPopcornModel
                    }
                }
            );
        }

        // Cập nhật ghế ngồi
        if (seats && seats.length > 0) {
            await Ticket.updateOne(
                { _id: ticketId, "tickets.movie_id": movieId },
                {
                    $set: {
                        'seats': seats
                    }
                }
            );
        }

        // Cập nhật các thông tin vé khác
        await Ticket.updateOne(
            { _id: ticketId, "tickets.movie_id": movieId },
            {
                $set: {
                    theater: theater,
                    address: address,
                    time: time,
                    totalPrice: totalPrice,
                    adult_name: adult_name,
                    child_name: child_name
                }
            }
        );
    } else {
        const objectTicketsModel = {
            movie_id: movieId,
            adult_quantity: adult_quantity,
            child_quantity: child_quantity,
            expireAt: Date.now()
        };

        await Ticket.updateOne({ _id: ticketId }, {
            $push: { tickets: objectTicketsModel },
        });

        // popcorns
        const objectPopcornModel = await Promise.all(
            popcorns_id.map(async (id, index) => {
                const quantity = parseInt(popcorns_quantity[index] || 0);
                if (quantity > 0) {
                    const popcornDetail = await Popcorn.findById(id);
                    return {
                        popcorn_id: id,
                        popcorn_quantity: quantity,
                        popcorn_name: popcornDetail.title
                    };
                }
            })
        ).then(results => results.filter(Boolean));

        if (objectPopcornModel.length > 0) {
            await Ticket.updateOne(
                { _id: ticketId },
                { $push: { popcorns: { $each: objectPopcornModel } } }
            );
        };

        // seats
        if (seats) {
            // Nếu seats không phải là mảng, biến nó thành mảng
            const seatsArray = Array.isArray(seats) ? seats : [seats];
        
            await Ticket.updateOne(
                { _id: ticketId },
                { $push: { seats: { $each: seatsArray } } }
            );
        }

        // ticket info
        ticket.theater = theater;
        ticket.address = address;
        ticket.time = time;
        ticket.totalPrice = totalPrice;
        ticket.adult_name = adult_name;
        ticket.child_name = child_name;

        await Ticket.updateOne(
            { _id: ticketId },
            {
                $set: {
                    theater: theater,
                    address: address,
                    time: time,
                    totalPrice: totalPrice,
                    adult_name: adult_name,
                    child_name: child_name
                }
            }
        );
    };

    res.redirect("/checkout");
};




