const addToCartModel = require("../../models/cartProduct");

const addToCartController = async (req, res) => {
  try {
    const { _id, userId } = req?.body;

    const isProductAvailable = await addToCartModel.findOne({ productId: _id });

    if (isProductAvailable) {
      return res.json({
        message: "Already exits in Add to cart",
        success: false,
        error: true,
      });
    }

    const payload = {
      productId: _id,
      quantity: 1,
      userId: userId,
    };

    const newAddToCart = new addToCartModel(payload);
    const saveProduct = await newAddToCart.save();

    return res.json({
      data: saveProduct,
      message: "Product Added in Cart",
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

module.exports = addToCartController;
