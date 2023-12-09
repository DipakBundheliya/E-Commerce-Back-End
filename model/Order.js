const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
  itemset: {
    type: [mongoose.Mixed],
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  totalItems: {
    type: Number,
    min: [0, "Wrong Min total item "],
  },
  subTotal: {
    type: Number,
    min: [0, "Wrong Min total item "],
  },
  selectAddress: {
    type: mongoose.Mixed,
    ref: "User",
    required: true,
  },
  paymentMethod: {
    type: String,
    required: true,
  },
  status: { type: String, default: "pending" },
});

orderSchema.virtual("id").get(function () {
  return this._id;
});
orderSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (response, ret) {
    delete ret._id;
  },
});
const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
