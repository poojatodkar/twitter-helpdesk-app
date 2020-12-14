const twitter = require("../lib/api");

module.exports = {
  getUserDetails: async function(req, res, next) {
    const { user } = req;
    const { data } = await twitter(
      user.oauth_token,
      user.oauth_token_secret
    ).getUserDetails();
    const { name, location, description, screen_name, followers_count } = data;
    let userInfo = {
      name,
      location,
      description,
      screen_name,
      followers_count
    };
    return res.json(userInfo);
  },

  getUserTweets: async function(req, res, next) {
    try {
      const { user } = req;
      const { data } = await twitter(
        user.oauth_token,
        user.oauth_token_secret
      ).userTimelineTweets();
      const userTweets = data.filter(
        tweet => tweet.in_reply_to_status_id !== null
      );
      return res.json(userTweets);
    } catch (err) {
      console.log("error in getUserTweets >>>", err);
      next();
    }
  },

  getMentionedTweets: async function(req, res, next) {
    try {
      const { user } = req;
      const { data } = await twitter(
        user.oauth_token,
        user.oauth_token_secret
      ).mentionedTweets();
      return res.json(data);
    } catch (err) {
      console.log("error in getMentionedTweets >>>", err);
      next();
    }
  },

  postReplies: async function(req, res, next) {
    try {
      const { user } = req;
      const { status, inReplyToStatusId } = req.body;
      const { data } = await twitter(
        user.oauth_token,
        user.oauth_token_secret
      ).postReplies({ in_reply_to_status_id: inReplyToStatusId, status });
      return res.json(data);
    } catch (err) {
      console.log("error in postReplies >>>", err);
      next();
    }
  }
};
