const express = require('express');
const router = express.Router();

const multer = require("multer");
const upload = multer();

const controller = require("../../controllers/admin/movie.controller");
const validateMovie = require("../../validates/admin/movie.validate");
const uploadCloud = require("../../middlewares/admin/upload.middleware");

router.get("/", controller.index);

router.patch("/change-status/:status/:id", controller.changeStatus);

router.get("/create", controller.create);

router.post(
    "/create",
    upload.single('thumbnail'),
    uploadCloud.upload,
    validateMovie.creatPost,
    controller.createPost
);

module.exports = router;