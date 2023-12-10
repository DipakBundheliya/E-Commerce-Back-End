const { User } = require("../model/User");
const bcrypt = require("bcrypt");

exports.createUser = async (req, resp) => {
  const user = new User(req.body);
  try {
    const userData = await user.save();
    req.session.user = {
      userid: userData.id,
      email: userData.email,
      name: userData.name,
    };
    setTimeout(() => {
      req.session.destroy((err) => {
        if (err) {
          console.error("Error destroying session:", err);
        } else {
          console.log("Session expired");
        }
      });
    }, 30 * 60 * 1000); // 30 minutes timeout
    resp.status(200).json(userData);
  } catch (err) {
    resp.status(400).json(err);
  }
};

exports.loginUser = async (req, resp) => {
  console.log("call");
  try {
    const user = await User.findOne({ email: req.body.email });
    req.session.user = { userid: user.id, email: user.email, name: user.name };
    console.log(req.session);
    setTimeout(() => {
      req.session.destroy((err) => {
        if (err) {
          console.error("Error destroying session:", err);
        } else {
          console.log("Session expired");
        }
      });
    }, 30 * 60 * 1000); // 30 minutes timeout

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
  console.log(req.session);
  try {
    if (req.session && req.session.user) {
      resp.status(200).json({
        id: req.session.user.userid,
        email: req.session.user.email,
        name: req.session.user.name,
      });
    } else {
      console.log(req.session, " is session");
      resp.status(401).json({ message: "user is not signinned" });
    }
  } catch (err) {
    console.error("Error in hasLoginnedUser:", err);
    resp.status(500).json({ message: "Internal Server Error" });
  }
};
