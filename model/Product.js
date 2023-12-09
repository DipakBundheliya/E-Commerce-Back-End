const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  title: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  price: {
    type: Number,
    required: true,
    min: [0, "Wrong Min Price"],
    max: [100000, "Wrong Max Price"],
  },
  discountPercentage: {
    type: Number,
    required: true,
    min: [1, "Wrong Min Discount Price"],
    max: [99, "Wrong Max Discount Price"],
  },
  rating: {
    type: Number,
    min: [0, "Wrong Min Rating"],
    max: [5, "Wrong Max Rating"],
    default: 0,
  },
  stock: {
    type: Number,
    required: true,
    min: [1, "Wrong Min Rating"],
    default: 0,
  },
  brand: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  thumbnail: {
    type: String,
    required: true,
  },
  images: {
    type: [String],
    required: true,
  },
  deleted: {
    type: Boolean,
    default: false,
  },
});

productSchema.virtual("id").get(function () {
  return this._id;
});
productSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (response, ret) {
    delete ret._id;
  },
});
const Product = mongoose.model("Product", productSchema);
module.exports = Product;
