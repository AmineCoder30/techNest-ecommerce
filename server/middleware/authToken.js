const jwt = require("jsonwebtoken");

async function authToken(req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(200).json({
        message: "Please Login...!",
        error: true,
        success: false,
      });
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      return res.status(200).json({
        message: "Please Login...!",
        error: true,
        success: false,
      });
    }

    jwt.verify(token, process.env.TOKEN_SECRET_KEY, function (err, decoded) {
      if (err) {
        return res.status(401).json({
          message: "Invalid token",
          error: true,
          success: false,
        });
      }

      req.userId = decoded?._id;
      next();
    });
  } catch (err) {
    res.status(400).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
}

module.exports = authToken;
