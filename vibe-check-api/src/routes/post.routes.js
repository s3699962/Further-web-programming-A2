module.exports = (express, app) => {
  const controller = require("../controllers/post.controller.js");
  const router = express.Router();

  // Select all posts.
  router.get("/", controller.all);

  // Create a new post.
  router.post("/", controller.create);

  //Delete a post
  router.delete("/:id", controller.delete);

  // Update a post
  router.put("/:id", controller.update);

  // Add routes to server.
  app.use("/api/posts", router);
};
