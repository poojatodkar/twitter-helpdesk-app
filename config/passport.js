const TwitterTokenStrategy = require("passport-twitter-token");
const keys = require("./constants");

module.exports = passport => {
  passport.use(
    new TwitterTokenStrategy(
      {
        consumerKey: keys.TWITTER_CONSUMER_KEY,
        consumerSecret: keys.TWITTER_CONSUMER_SECRET
      },
      async (token, tokenSecret, profile, done) => done(null, profile)
    )
  );
};
