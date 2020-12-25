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

app.use(morgan("dev"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// body-parser allows you to use req.body format.

app.use(express.static(path.join(__dirname, "../public")));
// this allows you to load static (or unchanging) files in the assigned directory (such as images).

dbStore.sync();

app.use(
  session({
    secret: process.env.SESSION_SECRET || "a wildly insecure secret",
    store: dbStore,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());
// these two must be called after the session is invoked.

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

app.use("/api", require("./api"));
app.use("/auth", require("./auth"));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

app.use((err, req, res, next) => {
  console.error(err);
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || "Internal server error.");
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Your server, listening on port ${port}`);
});
