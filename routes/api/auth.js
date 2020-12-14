const router = require("express").Router();
const passport = require("passport");
const { authController } = require("../../controllers");

router.route("/twitter/reverse").post(authController.reverse);

router
  .route("/twitter")
  .post(
    authController.authRequest,
    passport.authenticate("twitter-token", { session: false }),
    authController.getToken
  );

module.exports = router;
