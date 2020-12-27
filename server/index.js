const express = require("express");
const app = express();
const path = require("path");
const session = require("express-session");
const passport = require("passport");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const { db, User } = require("./db");
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const dbStore = new SequelizeStore({ db: db });
const port = process.env.PORT || 3000;

module.exports = app;

console.log("before require: ", process.env.TEST_VARIABLE);
// if (process.env.NODE_ENV === "development") {
require("../secrets");
// }
console.log("after require: ", process.env.TEST_VARIABLE);

passport.serializeUser((user, done) => {
  done(null, user.id);
});
// this grabs the user id to the session.

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findByPk(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
}); // this then grabs the user info from the user id under the form of 'req.user'.

app.use(morgan("dev"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// body-parser allows you to use req.body format.

app.use(
  session({
    secret: process.env.SESSION_SECRET || "a wildly insecure secret",
    store: dbStore, // instead of storing session info in memory, store session info in postgres database, which allows us to re-deploy/re-start our server without interrupting any currently logged-in users.
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());
// these two must be called after the session is invoked.

app.use("/api", require("./api"));
app.use("/auth", require("./auth"));

app.use(express.static(path.join(__dirname, "../public")));
// this allows you to load static (or unchanging) files in the assigned directory (such as images).

dbStore.sync();

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

app.use((err, req, res, next) => {
  console.error(err);
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || "Internal server error.");
});

app.listen(port, () => {
  console.log(`Your server, listening on port ${port}`);
});
//process.env = global variable, represents the state of the system environment your application is in when it starts.
