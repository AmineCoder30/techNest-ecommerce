const userModel = require("../../models/userModel");

async function userDetailsController(req, res) {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({
      message: "User ID is required",
      error: true,
      success: false,
    });
  }

  try {
    const user = await userModel.findById(id).select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
        error: true,
        success: false,
      });
    }

    res.status(200).json({
      data: user,
      error: false,
      success: true,
      message: "User details",
    });
  } catch (err) {
    res.status(400).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
}

module.exports = userDetailsController;
