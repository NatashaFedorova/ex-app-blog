const express = require("express");
const router = new express.Router();

const {
  addPostsValidation,
  patchPostValidation,
} = require("../middlewares/validationMiddleware");

const {
  getPosts,
  getPostById,
  addPost,
  changePost,
  patchPost,
  deletePost,
} = require("../controllers/postsController");

router
    .get("/", getPosts)
    .get("/:id", getPostById)
    .post("/", addPostsValidation, addPost)
    .put("/:id", addPostsValidation, changePost)
    .patch("/:id", patchPostValidation, patchPost)
    .delete("/:id", deletePost);

module.exports = {postsRouter: router};
