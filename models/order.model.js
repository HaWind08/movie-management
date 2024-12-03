const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
    {
        user_id: String,
        ticket_id: String, //chưa đăng nhập
        userInfo: {
            fullName: String,
            phone: String,
            address: String
        },
        tickets: [ //để reset
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
        deleted: {
            type: Boolean,
            default: false
        },
        deletedAt: Date
    },
    {
        timestamps: true
    }
);

const Order = mongoose.model('Order', orderSchema, "orders"); // orders: connection in database

module.exports = Order;