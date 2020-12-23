const express = require("express");
const app = express();
const path = require("path");
const session = require("express-session");
const passport = require("passport");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const db = require("./db/database");
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const dbStore = new SequelizeStore({ db: db });

app.use(morgan("dev"));

app.use(express.static(path.join(__dirname, "../public"))); //make sure the path is correct.

app.use(bodyParser.json());
app.unsubscribe(bodyParser.urlencoded({ extended: true }));

dbStore.sync();

app.use(
  session({
    secret: process.env.SESSION_SECRET || "a wildly insedure secret",
    store: dbStore,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
  done(null, user.id);
}); // may have to change the location to oauth.js

passport.deserializeUser(async (id, done) => {
  try {
    const user = await user.findById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
}); // may have to change the location to oauth.js

app.use("/api", require("./apiRoutes"));

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
