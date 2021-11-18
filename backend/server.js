const express = require("express");
const http = require('http');
const helmet = require("helmet");
const logger = require("morgan");
const cors = require("cors");
const dotenv = require("dotenv");

const routes = require("./routes");
const mongoose = require("./mongoose");

const app = express();
dotenv.config();
const port = process.env.PORT || 5500;

// enhance server security
const whitelist = ["http://localhost", "http://localhost:3000"];
const corsoption = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback("You shall not pass! :Gandalf", true);
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTION"],
  preflightContinue: false,
  optionsSuccessStatus: 204,
};

app.use(helmet());
app.use(cors(corsoption));
app.use(express.urlencoded({ extended: true })); 
app.use(express.json());
mongoose();

// logger
app.use(
  logger(
    `:remote-addr - :remote-user [:date[clf]] ":method :url" "HTTP/:http-version" ":user-agent" ":referrer" | :status :res[content-length] - :response-time ms`,
    { skip: (req, res) => res.statusCode < 400 }
  )
);

app.get("/", (req, res) => res.redirect("http://localhost:3000"));
app.use("/api/v1/users", routes.users);
app.use("/api/v1/recruitements", routes.recruitements);

const server = http.createServer(app);

server.listen(port, () => console.log(`listening at port:${port}`));
