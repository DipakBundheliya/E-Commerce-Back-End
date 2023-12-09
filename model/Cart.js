const mongoose = require("mongoose");

const cartSchema = mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: [0, "Wrong Min Price"],
    max: [10000, "Wrong Max Price"],
  },
});

cartSchema.virtual("id").get(function () {
  return this._id;
});
cartSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (response, ret) {
    delete ret._id;
  },
});
const Cart = mongoose.model("Cart", cartSchema);
module.exports = Cart;

// {
//     "title": "Infinix INBOOK",
//     "description": "Infinix Inbook X1 Ci3 10th 8GB 256GB 14 Win10 Grey – 1 Year Warranty",
//     "price": 1099,
//     "discountPercentage": 11.83,
//     "rating": 4.54,
//     "stock": 96,
//     "brand": "Infinix",
//     "category": "laptops",
//     "thumbnail": "https://i.dummyjson.com/data/products/9/thumbnail.jpg",
//     "images": [
//       "https://i.dummyjson.com/data/products/9/1.jpg",
//       "https://i.dummyjson.com/data/products/9/2.png",
//       "https://i.dummyjson.com/data/products/9/3.png",
//       "https://i.dummyjson.com/data/products/9/4.jpg",
//       "https://i.dummyjson.com/data/products/9/thumbnail.jpg"
//     ],
//     "quantity": 1,
//     "userID": 2,
//     "productId": 9,
//     "id": 1
//   }
