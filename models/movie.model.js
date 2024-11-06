const mongoose = require("mongoose");
const slug = require("mongoose-slug-updater");

mongoose.plugin(slug);

const movieSchema = new mongoose.Schema(
    {
        title: String,
        movie_category: String,
        description: String,
        movie_content: String,
        discountPercentage: Number,
        // stock: Number,
        // price: Number,
        thumbnail: String,
        status: String,
        duration: Number,
        featured: String,
        position: Number,
        slug: {
            type: String,
            slug: "title",
            unique: true
        },
        createdBy: {
            account_id: String,
            createdAt: {
                type: Date,
                default: Date.now
            }
        },
        deleted: {
            type: Boolean,
            default: false
        },
        // deletedAt: Date
        deletedBy: {
            account_id: String,
            deletedAt: Date
        },
        updatedBy: [
            {
                account_id: String,
                updatedAt: Date
            }
        ],
    },
    {
        timestamps: true
    }
);

const Movie = mongoose.model('Movie', movieSchema, "movies");

module.exports = Movie;