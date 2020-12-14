const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const passport = require("passport");
const http = require("http");
const cors = require("cors");
const SocketIO = require("socket.io");

var whitelist = ["http://localhost:3000"];
var corsOptions = {
  exposedHeaders: ["x-auth-token"],
  origin: function(origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Blocked by CORS"));
    }
  }
};

const app = express();

app.use(cors(corsOptions));
app.use(passport.initialize());
require("./config/passport")(passport);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/api", require("./routes"));
const server = http.createServer(app);
const io = SocketIO(server);

require("./services/index")(io, app);

if (process.env.NODE_ENV === "production") {
  app.use("/", express.static(path.join(__dirname, "./client/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const port = process.env.PORT || 5000;

server.listen(port, () =>
  console.log(`server listening on port ${port}`)
);
