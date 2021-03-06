const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/constants");

module.exports = {
  makeJson: data =>
    JSON.parse(
      '{"' +
        data
          .split("=")
          .join('":"')
          .split("&")
          .join('","') +
        '"}'
    ),

  createToken: payload => jwt.sign({ user: payload }, JWT_SECRET, { expiresIn: "10 days" })
};
