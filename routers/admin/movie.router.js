const express = require('express');
const router = express.Router();

const multer = require("multer");
const upload = multer();

const controller = require("../../controllers/admin/movie.controller");
const validateMovie = require("../../validates/admin/movie.validate");
const uploadCloud = require("../../middlewares/admin/upload.middleware");

router.get("/", controller.index);

router.patch("/change-status/:status/:id", controller.changeStatus);

router.delete("/delete/:id", controller.deleteMovie);

router.get("/create", controller.create);

router.post(
    "/create",
    upload.single('thumbnail'),
    uploadCloud.upload,
    validateMovie.creatPost,
    controller.createPost
);

router.get("/edit/:id", controller.edit);

router.patch(
    "/edit/:id",
    upload.single('thumbnail'),
    uploadCloud.upload,
    validateMovie.creatPost,
    controller.editPatch
);

router.get("/detail/:id", controller.detail);

module.exports = router;