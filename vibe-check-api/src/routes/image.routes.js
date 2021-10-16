module.exports = (express, app) => {
  // Select all users.
  const router = express.Router();
  router.get("/:id",async (req, res) => {

    res.sendFile(`/tmp/images/${req.params.id.replace(/[^A-Za-z0-9\-]*/g, "")}`)
  });
  // Add routes to server.
  app.use("/api/images", router);
};
