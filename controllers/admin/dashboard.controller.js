const Movie = require("../../models/movie.model");
const MovieUpcoming = require("../../models/movie-upcoming.model");
const Popcorn = require("../../models/popcorn.model");
const User = require("../../models/user.model");

// [GET] /admin/dashboard
module.exports.dashboard = async (req, res) => {
    const statistic = {
        movie: {
            total: 0,
            active: 0,
            inactive: 0
        },
        movieUpcoming: {
            total: 0,
            active: 0,
            inactive: 0
        },
        popcorn: {
            total: 0,
            active: 0,
            inactive: 0
        },
        user: {
            total: 0,
            active: 0,
            inactive: 0
        },
    };

    // movie
    statistic.movie.total = await Movie.countDocuments({
        deleted: false
    });

    statistic.movie.active = await Movie.countDocuments({
        deleted: false,
        status: "active"
    });
    
    statistic.movie.inactive = await Movie.countDocuments({
        deleted: false,
        status: "inactive"
    });

    // movie upcoming
    statistic.movieUpcoming.total = await MovieUpcoming.countDocuments({
        deleted: false
    });

    statistic.movieUpcoming.active = await MovieUpcoming.countDocuments({
        deleted: false,
        status: "active"
    });
    
    statistic.movieUpcoming.inactive = await MovieUpcoming.countDocuments({
        deleted: false,
        status: "inactive"
    });

    // popcorn
    statistic.popcorn.total = await Popcorn.countDocuments({
        deleted: false
    });

    statistic.popcorn.active = await Popcorn.countDocuments({
        deleted: false,
        status: "active"
    });
    
    statistic.popcorn.inactive = await Popcorn.countDocuments({
        deleted: false,
        status: "inactive"
    });

    // user
    statistic.user.total = await User.countDocuments({
        deleted: false
    });

    statistic.user.active = await User.countDocuments({
        deleted: false,
        status: "active"
    });
    
    statistic.user.inactive = await User.countDocuments({
        deleted: false,
        status: "inactive"
    });

    res.render("admin/pages/dashboard/index.pug", {
        pageTitle: "Trang tổng quan",
        currentPage: "dashboard",
        statistic: statistic
    });
};