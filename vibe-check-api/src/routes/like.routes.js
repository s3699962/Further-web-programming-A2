module.exports = (express, app) => {
  const controller = require("../controllers/like.controller.js");
  const router = express.Router();

  // Create a like
  router.post("/", controller.create);

  // Delete a like
  router.delete("/:id", controller.delete);

  // Add routes to server.
  app.use("/api/like", router);
};
