const {
  create,
  update,
  getPosts,
  deletePostWithId,
  single,
  postCategory,
  postTag,
} = require("../posts/post.service");

module.exports = {
  getAllPosts: (req, res) => {
    getPosts((err, results) => {
      if (err) {
        return res.status(500).json({
          success: 0,
          message: err.message,
        });
      }
      if (!results) {
        return res.status(400).json({
          success: 0,
          message: "Bad request!",
        });
      }
      return res.status(200).json({
        success: 1,
        data: results,
      });
    });
  },
  createPost: (req, res) => {
    const body = req.body;
    const tags = body.tags;
    const categoryId = body.category;
    var image = "";
    if (req.file) {
      image = process.env.BASE_URL + req.file.path;
    }
    create(body, image, (err, results) => {
      if (err) {
        return res.status(500).json({
          success: 0,
          message: err.message,
        });
      }
      if (!results) {
        return res.status(400).json({
          success: 0,
          message: "Bad request!",
        });
      }
      let newtag = [];
      var tag = Object.keys(tags).map((key) => [String(key), tags[key]]);

      for (var key in tag) {
        newtag.push([
          (newtag["postId"] = results.insertId),
          (newtag["tagId"] = tag[key][1]),
        ]);
      }
      let newcat = [];
      var cats = Object.keys(categoryId).map((key) => [
        String(key),
        categoryId[key],
      ]);

      for (var key in cats) {
        newcat.push([
          (newcat["postId"] = results.insertId),
          (newcat["categoryId"] = cats[key][1]),
        ]);
      }
      postCategory(newcat, (err, results) => {});
      postTag(newtag, (err, results) => {});
      return res.status(200).json({
        success: 1,
        data: results,
      });
    });
  },
  updatePost: (req, res) => {
    const body = req.body;
    var image = body.image;
    if (req.file) {
      image = process.env.BASE_URL + req.file.path;
    }
    update(body, image, (err, results) => {
      if (err) {
        return res.status(500).json({
          success: 0,
          message: err.message,
        });
      }
      if (!results) {
        return res.status(400).json({
          success: 0,
          message: "Failed to update post",
        });
      }
      return res.status(200).json({
        success: 1,
        message: "Updated successfuly",
      });
    });
  },
  getWithId: (req, res) => {
    const id = req.params.id;
    single(id, (err, results) => {
      if (err) {
        return res.status(500).json({
          success: 0,
          message: err.message,
        });
      }
      if (!results) {
        return res.status(400).json({
          success: 0,
          message: "Bad req",
        });
      }
      return res.status(200).json({
        success: 1,
        data: results,
      });
    });
  },
  deletePost: (req, res) => {
    const body = req.body;
    deletePostWithId(body, (err, results) => {
      if (err) {
        return res.status(500).json({
          success: 0,
          message: err.message,
        });
      }
      if (!results) {
        return res.status(400).json({
          success: 0,
          message: "Post not deleted",
        });
      }
      return res.status(200).json({
        success: 1,
        message: "Post deleted successfully",
      });
    });
  },
};
