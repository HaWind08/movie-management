const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema(
    {
        user_id: String, //khi đăng nhập
        tickets: [
            {
                movie_id: String,
                adult_quantity: Number,
                child_quantity: Number,
            }
        ],
        popcorns: [
            {
                popcorn_id: String,
                popcorn_name: String,
                popcorn_quantity: Number
            }
        ],
        seats: {
            type: Array,
            default: []
        },
        theater: String,
        address: String,
        time: String,
        totalPrice: Number,
        adult_name: String,
        child_name: String,
        expireAt: {
            type: Date,
            default: () => new Date(Date.now() + 86400 * 1000), // 1 ngày
        }
    },
    {
        timestamps: true
    }
);
ticketSchema.index({ expireAt: 1 }, { expireAfterSeconds: 0 });
const Ticket = mongoose.model('Ticket', ticketSchema, "tickets"); // tickets: connection in database

module.exports = Ticket;