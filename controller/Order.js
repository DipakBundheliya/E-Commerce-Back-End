const Order = require("../model/Order");

exports.createOrder = async (req, resp) => {
  const order = new Order(req.body);
  try {
    const orderData = await order.save();
    resp.status(200).json(orderData);
  } catch (err) {
    resp.status(400).json(err);
  }
};

exports.fetchOrders = async (req, resp) => {
  let query = Order.find({});
  let totalOrders = await Order.find({}).countDocuments();

  if (req.query._sort && req.query._order) {
    query = query.sort({ [req.query._sort]: req.query._order });
  }

  if (req.query._page && req.query._limit) {
    const pageNum = req.query._page;
    const pageLimit = req.query._limit;
    query = query.skip(pageLimit * (pageNum - 1)).limit(pageLimit);
  }
  try {
    const orderData = await query.exec();
    resp.set("X-Total-Count", totalOrders);
    resp.status(200).json(orderData);
  } catch (err) {
    resp.status(400).json(err);
  }
};

exports.fetchUserOrders = async (req, resp) => {
  try {
    const orders = await Order.find({ user: req.query.id });
    resp.status(200).json(orders);
  } catch (err) {
    resp.status(400).json(err);
  }
};

exports.updateOrder = async (req, resp) => {
  try {
    const orderData = await Order.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    resp.status(200).json(orderData);
  } catch (err) {
    resp.status(400).json(err);
  }
};

exports.deleteOrder = async (req, resp) => {
  try {
    const deleteStatus = await Order.deleteOne({ _id: req.params.id });
    resp.status(200).json(deleteStatus);
  } catch (err) {
    resp.status(400).json(err);
  }
};
