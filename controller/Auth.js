const { User } = require("../model/User");
const bcrypt = require("bcrypt");

exports.createUser = async (req, resp) => {
  const user = new User(req.body);
  try {
    const userData = await user.save();
    req.session.user = user.id;
    req.session.email = user.email;
    req.session.name = user.name;
    resp.status(200).json(userData);
  } catch (err) {
    resp.status(400).json(err);
  }
};

exports.loginUser = async (req, resp) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    req.session.user = user.id;
    req.session.email = user.email;
    req.session.name = user.name;

    if (user) {
      const hashStatus = bcrypt.compare(req.body.password, user.password);
      if (hashStatus) {
        resp
          .status(200)
          .json({ id: user.id, email: user.email, name: user.name });
      } else {
        resp.status(401).json({ message: "wrong credentials" });
      }
    } else {
      resp.status(401).json({ message: "User not found" });
    }
  } catch (err) {
    resp.status(400).json(err);
  }
};

exports.hasLoginnedUser = async (req, resp) => {
  if (req.session.user) {
    resp.status(200).json({
      id: req.session.user,
      email: req.session.email,
      name: req.session.name,
    });
  } else {
    resp.status(401).json({ message: "user is not signinned" });
  }
};
