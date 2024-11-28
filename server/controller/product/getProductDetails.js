const productModel = require("../../models/productModel");

const getProductDetails = async (req, res) => {
  console.log("getProductDetails", req.params);
  try {
    const { productId } = req.params;

    const product = await productModel.findById(productId);

    res.json({
      data: product,
      message: "Ok",
      success: true,
      error: false,
    });
  } catch (err) {
    res.json({
      message: err?.message || err,
      error: true,
      success: false,
    });
  }
};

module.exports = getProductDetails;
