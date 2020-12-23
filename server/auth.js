const router = require("express").Router();
const User = require("./db/user");

router.post("/signup", async (req, res, next) => {
  try {
    const [user, isFound] = await User.findOrCreate({
      where: {
        email: req.body.email,
        password: req.body.password,
        imageUrl: req.body.imageUrl,
      },
    });
    // const user = await User.create(req.body);
    console.log("user: ", user);
    console.log("isFound: ", isFound);
    req.login(user, (err) => (err ? next(err) : res.send(user)));
  } catch (err) {
    next(err);
  }
});

router.put("/login", async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: {
        email: req.body.email,
        password: req.body.password,
      },
    });
    if (!user) {
      res.sendStatus(401);
    } else {
      req.session.userId = user.id;
      req.login(user, (err) => (err ? next(err) : res.send(user)));
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;