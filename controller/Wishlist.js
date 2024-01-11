const Wishlist = require("../model/Wishlist");

exports.addToWishlist = async (req, resp) => {
  const WishlistItem = new Wishlist(req.body);
  try {
    const data = await WishlistItem.save();
    const result = await data.populate("product");
    resp.status(200).json(result);
  } catch (err) {
    resp.status(400).json(err);
  }
};

exports.fetchWishlistByUser = async (req, resp) => {
  try {
    const Wishlistitems = await Wishlist.find({ user: req.query.userid })
      .populate("user")
      .populate("product");
    resp.status(200).json(Wishlistitems);
  } catch (err) {
    resp.status(400).json(err);
  }
};

exports.deleteWishlistItem = async (req, resp) => {
  try {
    const deleteStatus = await Wishlist.deleteOne({ _id: req.params.id });
    resp.status(200).json(deleteStatus);
  } catch (err) {
    resp.status(400).json(err);
  }
};
