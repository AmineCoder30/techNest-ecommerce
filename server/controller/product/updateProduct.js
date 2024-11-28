const uploadProductPermission = require("../../helpers/permission");
const productModel = require("../../models/productModel");

async function updateProductController(req, res) {
  try {
    if (!uploadProductPermission(req.userId)) {
      throw new Error("Permission denied");
    }

    const { _id, productImage, ...resBody } = req.body;
    const baseUrl = `${req.protocol}://${req.get("host")}/uploads/`;
    const updateProduct = await productModel.findByIdAndUpdate(_id, {
      ...resBody,
      productImage: [
        ...productImage,
        req.files.map((file) => baseUrl + file.filename),
      ],
    });

    res.json({
      message: "Product update successfully",
      data: updateProduct,
      success: true,
      error: false,
    });
  } catch (err) {
    res.status(400).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
}

module.exports = updateProductController;
