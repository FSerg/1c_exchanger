module.exports = {
  port: process.env.PORT || 5000,
  token: process.env.TOKEN,
  jwtSecret: process.env.JWT_SECRET,
  mongoURI: process.env.MONGO_URI
};
