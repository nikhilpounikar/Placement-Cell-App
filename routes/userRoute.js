const express = require("express");
const passport = require("passport");

const userController = require("../controller/userController");

const router = express.Router();

router.get(
  "/profile/:id",
  passport.checkAuthentication,
  userController.profile
);
router.post("/update/:id", passport.checkAuthentication, userController.update);

router.get("/profile", passport.checkAuthentication, userController.profile);

router.get("/sign-up", userController.signUp);

router.get("/sign-in", userController.signIn);

router.post("/create", userController.create);

router.get("/sign-out", userController.destroySession);
// Using manual Authenticatio

//router.post('/create-session',userController.createSession);

// using Passport authentication
router.post(
  "/create-session",
  passport.authenticate("local", { failureRedirect: "/user/sign-in" }),
  userController.createSession
);

// using Passport authentication outh google

router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/user/sign-in" }),
  userController.createSession
);

module.exports = router;
