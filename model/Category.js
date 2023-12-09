const mongoose = require("mongoose");

const categorySchema = mongoose.Schema({
  value: { type: String, required: true, unique: true },
  label: { type: String, required: true },
});

categorySchema.virtual("id").get(function () {
  return this._id;
});
categorySchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (response, ret) {
    delete ret._id;
  },
});
exports.Category = mongoose.model("Category", categorySchema);
