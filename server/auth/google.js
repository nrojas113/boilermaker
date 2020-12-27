const router = require("express").Router();
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
const { User } = require("../db");

module.exports = router;

if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
  console.log("Google client ID / secret not found. Skipping Google OAuth.");
} else {
  const googleConfig = {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback",
  };

  const strategy = new GoogleStrategy(
    googleConfig,
    async (token, refreshToken, profile, done) => {
      try {
        // const name = profile.displayName;
        const email = profile.emails[0].value;

        const [googleUser] = await User.findOrCreate({
          where: {
            googleId: profile.id,
          },
          defaults: {
            // name: name,
            email: email,
          },
        });
        done(null, googleUser);
      } catch (err) {
        done(err);
      }
    }
  );

  passport.use(strategy);

  router.get("/", passport.authenticate("google", { scope: "email" }));

  router.get(
    "/callback",
    passport.authenticate("google", {
      successRedirect: "/home",
      failureRedirect: "/login",
    })
  );
}
