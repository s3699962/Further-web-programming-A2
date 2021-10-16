const express = require("express");
const cors = require("cors");
const db = require("./src/database");
const getRawBody = require('raw-body')

// Database will be sync'ed in the background.
db.sync();

const app = express();

// Parse requests of content-type - application/json.

// Add CORS suport.
app.use(cors());
app.use(express.json({limit: '25mb'}));
// Add user routes.
require("./src/routes/user.routes.js")(express, app);
require("./src/routes/post.routes.js")(express, app);
require("./src/routes/comment.routes.js")(express, app);
require("./src/routes/post_like.routes.js")(express, app);
require("./src/routes/comment_like.routes.js")(express, app);
require("./src/routes/follow.routes.js")(express, app);
require("./src/routes/image.routes.js")(express, app);


// Set port, listen for requests.
const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
