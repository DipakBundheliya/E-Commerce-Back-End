const Cart = require("../model/Cart");

exports.addToCart = async (req, resp) => {
  const cartItem = new Cart(req.body);
  try {
    const data = await cartItem.save();
    const result = await data.populate("product");
    resp.status(200).json(result);
  } catch (err) {
    resp.status(400).json(err);
  }
};

exports.fetchCartByUser = async (req, resp) => {
  try {
    const cartitems = await Cart.find({ user: req.query.userid })
      .populate("user")
      .populate("product");
    resp.status(200).json(cartitems);
  } catch (err) {
    resp.status(400).json(err);
  }
};

exports.updateCartItem = async (req, resp) => {
  try {
    const updatecartitems = await Cart.findByIdAndUpdate(
      req.params.id,
      {
        quantity: req.body.quantity,
      },
      {
        new: true,
      }
    );
    resp.status(200).json(updatecartitems);
  } catch (err) {
    resp.status(400).json(err);
  }
};

exports.deleteCartItem = async (req, resp) => {
  try {
    const deleteStatus = await Cart.deleteOne({ _id: req.params.id });
    resp.status(200).json(deleteStatus);
  } catch (err) {
    resp.status(400).json(err);
  }
};
