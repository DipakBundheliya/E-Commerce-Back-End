const mongoose = require("mongoose");

const brandSchema = mongoose.Schema({
  value: { type: String, required: true, unique: true },
  label: { type: String, required: true },
});

brandSchema.virtual("id").get(function () {
  return this._id;
});
brandSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (response, ret) {
    delete ret._id;
  },
});
exports.Brand = mongoose.model("Brand", brandSchema);
