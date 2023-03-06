const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");
const Joi = require("joi");

let posts = [
  {
    id: "1",
    topic: "test1",
    text: "test1",
  },
  {
    id: "2",
    topic: "test2",
    text: "test2",
  },
  {
    id: "3",
    topic: "test3",
    text: "test3",
  },
];

router
  .get("/", (req, res) => {
    res.json({ posts, status: "success" });
  })

  .get("/:id", (req, res) => {
    const { id } = req.params;
    const [post] = posts.filter((el) => el.id === id);

    if (!post) {
      return res
        .status(400)
        .json({ status: `error, posts with id '${id}' not found` });
    }
    res.json({ post, status: "success" });
  })

  .post("/", (req, res) => {
    const { topic, text } = req.body;

    const schema = Joi.object({
      topic: Joi.string().alphanum().min(3).max(30).required(),
      text: Joi.string().alphanum().min(10).max(400).required(),
    });

    const validationResult = schema.validate(req.body);
    if (validationResult.error) {
      return res.status(400).json({ status: validationResult.error.details });
    }
    posts.push({ id: uuidv4(), ...validationResult });
    res.json({ status: "success" });
  })

  .put("/:id", (req, res) => {
    const { topic, text } = req.body;

    const schema = Joi.object({
      topic: Joi.string().alphanum().min(3).max(30).required(),
      text: Joi.string().alphanum().min(10).max(400).required(),
    });

    const validationResult = schema.validate(req.body);
    if (validationResult.error) {
      return res.status(400).json({ status: validationResult.error.details });
    }

    posts.forEach((post) => {
      if (post.id === req.params.id) {
        post.topic = topic;
        post.text = text;
      }
    });
    res.json({ status: "success" });
  })

  .patch("/:id", (req, res) => {
    const { topic, text } = req.body;
    const schema = Joi.object({
      topic: Joi.string().alphanum().min(3).max(30).optional(),
      text: Joi.string().alphanum().min(10).max(400).optional(),
    });

    const validationResult = schema.validate(req.body);
    if (validationResult.error) {
      return res.status(400).json({ status: validationResult.error.details });
    }
    posts.forEach((post) => {
      if (post.id === req.params.id) {
        if (topic) {
          post.topic = topic;
        }
        if (text) {
          post.text = text;
        }
      }
    });
    res.json({ status: "success" });
  })

  .delete("/:id", (req, res) => {
    posts = posts.filter((el) => el.id !== req.params.id);
    res.json({ status: "success" });
  });

module.exports = { postsRouter: router };
