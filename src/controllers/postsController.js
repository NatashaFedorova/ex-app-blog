const {v4: uuidv4} = require("uuid");

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

const getPosts = (req, res) => {
  res.json({posts, status: "success"});
};

const getPostById = (req, res) => {
  const {id} = req.params;
  const [post] = posts.filter((el) => el.id === id);

  if (!post) {
    return res
        .status(400)
        .json({status: `error, posts with id '${id}' not found`});
  }
  res.json({post, status: "success"});
};

const addPost = (req, res) => {
  const {topic, text} = req.body;
  posts.push({id: uuidv4(), topic, text});
  res.json({status: "success"});
};

const changePost = (req, res) => {
  const {topic, text} = req.body;
  posts.forEach((post) => {
    if (post.id === req.params.id) {
      post.topic = topic;
      post.text = text;
    }
  });
  res.json({status: "success"});
};

const patchPost = (req, res) => {
  const {topic, text} = req.body;
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
  res.json({status: "success"});
};

const deletePost = (req, res) => {
  posts = posts.filter((el) => el.id !== req.params.id);
  res.json({status: "success"});
};

module.exports = {
  getPosts,
  getPostById,
  addPost,
  changePost,
  patchPost,
  deletePost,
};
