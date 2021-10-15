module.exports = (express, app) => {
  const controller = require("../controllers/follow.controller.js");
  const router = express.Router();

  // Follow someone
  router.post("/", controller.create);

  // Unfollow someone
  router.delete("/:id", controller.delete);

  // Get Following
  router.get("/:userEmail", controller.get);

  // Get Followers
  router.get("/followers/:userEmail", controller.getFollowers);

  // Add routes to server.
  app.use("/api/follow", router);
};
