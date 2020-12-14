const Twit = require("twit");
const keys = require("../config/constants");
const jwt = require("jsonwebtoken");

module.exports = (io, app) => {
  const createTwitClient = (key, secret) => {
    return new Twit({
      consumer_key: keys.TWITTER_CONSUMER_KEY,
      consumer_secret: keys.TWITTER_CONSUMER_SECRET,
      timeout_ms: 60 * 1000,
      access_token: key,
      access_token_secret: secret
    });
  };

  io.on("connection", socket => {
    socket.on("register_screen_name", data => {
      let { term: searchTerm, jwtToken } = data;
      let decoded = jwt.decode(jwtToken, keys.JWT_SECRET);
      if (decoded && decoded.user) {
        socket.join(searchTerm);
        stream(searchTerm, decoded.user);
      }
    });
  });

  const stream = (searchTerm, user) => {
    const twitter = createTwitClient(user.oauth_token, user.oauth_token_secret);
    let stream = twitter.stream("statuses/filter", {
      track: `@${searchTerm}`
    });
    stream.on("tweet", tweet => {
      sendMessage(tweet, searchTerm);
    });

    stream.on("error", error => {
      console.log("error in streaming >>>", error);
    });
  };

  /**
   * Emits data from stream.
   * @param {String} msg
   */
  const sendMessage = (msg, searchTerm) => {
    if (msg.text.includes("RT")) {
      return;
    }
    io.to(searchTerm).emit("tweets", msg);
  };
};
