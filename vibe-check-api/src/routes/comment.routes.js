module.exports = (express, app) => {
  const controller = require("../controllers/comment.controller.js");
  const router = express.Router();


  // Create a new comment.
  router.post("/", controller.create);

  //Delete a comment
  router.delete("/:id", controller.delete);

  // Edit a comment
  router.update("/:id", controller.update);

  // Add routes to server.
  app.use("/api/comment", router);
};
