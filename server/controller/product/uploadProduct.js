const uploadProductPermission = require("../../helpers/permission");
const productModel = require("../../models/productModel");

async function UploadProductController(req, res) {
  try {
    const sessionUserId = req.userId;
    const baseUrl = `${req.protocol}://${req.get("host")}/uploads/`;

    if (!uploadProductPermission(sessionUserId)) {
      throw new Error("Permission denied");
    }

    const uploadProduct = new productModel({
      ...req.body,
      productImage: req.files.map((file) => baseUrl + file.filename), // Save URLs to the database
    });
    const saveProduct = await uploadProduct.save();

    res.status(201).json({
      message: "Product uploaded successfully",
      error: false,
      success: true,
      product: saveProduct,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
      error: true,
      success: false,
    });
  }
}

module.exports = UploadProductController;
