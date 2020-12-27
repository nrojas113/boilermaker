const router = require("express").Router();
const User = require("../db/user");

// router.post("/signup", async (req, res, next) => {
//   try {
//     // const [user, isFound] = await User.findOrCreate({
//     //   where: {
//     //     email: req.body.email,
//     //     password: req.body.password,
//     //     imageUrl: req.body.imageUrl,
//     //   },
//     // })
//     const user = await User.create(req.body);
//     console.log("user: ", user);
//     // console.log("isFound: ", isFound);
//     req.login(user, (err) => (err ? next(err) : res.send(user)));
//   } catch (err) {
//     next(err);
//   }
// });

router.use("/google", require("./google"));

router.get("/me", (req, res, next) => {
  res.send(req.user);
});

router.post("/signup", async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    req.login(user, (err) => (err ? next(err) : res.json(user)));
  } catch (err) {
    if (err.name === "SequelizeUniqueConstraintError") {
      res.status(401).send("User already exists");
    } else {
      next(err);
    }
  }
});

router.put("/login", async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: {
        email: req.body.email,
      },
    });
    if (!user) {
      console.log("No such user found: ", req.body.email);
      res.status(401).send("Wrong username and/or password");
    } else if (!user.correctPassword(req.body.password)) {
      console.log("Incorrect password: ", req.body.password);
      res.status(401).send("Wrong username and/or password");
    } else {
      // req.session.userId = user.id;
      req.login(user, (err) => (err ? next(err) : res.send(user)));
    }
  } catch (err) {
    next(err);
  }
});

router.delete("/logout", (req, res, next) => {
  req.logout();
  req.session.destroy();
  res.redirect("/");
});

module.exports = router;
