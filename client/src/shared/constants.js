module.exports = {
  apiUrl:
    process.env.NODE_ENV === "production"
      ? "https://twitter-helpdesk-pt.herokuapp.com"
      : "http://localhost:5000"
};
