const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const MongoStore = require("connect-mongo");
const {
  createProduct,
  fetchProductsByFilter,
  fetchProductById,
  updateProduct,
} = require("./controller/Product");
const { createBrand, fetchBrands } = require("./controller/Brand");
const { createCategory, fetchCategories } = require("./controller/Category");
const { fetchUserById, updateUser } = require("./controller/User");
const { createUser, loginUser, hasLoginnedUser } = require("./controller/Auth");
const {
  addToCart,
  fetchCartByUser,
  deleteCartItem,
  updateCartItem,
} = require("./controller/Cart");
const {
  createOrder,
  fetchOrders,
  deleteOrder,
  updateOrder,
  fetchUserOrders,
} = require("./controller/Order");
const { MongoClient } = require("mongodb");

app.use(express.json()); // to parse req.body
app.use(
  cors({
    exposedHeaders: ["X-Total-Count"],
  })
); // to parse req.body
// cookie parser middleware
app.use(cookieParser());

const main = async () => {
  const client = await MongoClient.connect(
    "mongodb+srv://bundheliyadeep:Deep1234@cluster0.hpg57sk.mongodb.net/ecommerce?retryWrites=true&w=majority"
  );

  console.log("MongoDB connected");

  await mongoose.connect(
    "mongodb+srv://bundheliyadeep:Deep1234@cluster0.hpg57sk.mongodb.net/ecommerce?retryWrites=true&w=majority"
  );

  console.log("database connected");

  app.use(
    session({
      secret: "Stay Signin secret",
      resave: false,
      saveUninitialized: true,
      cookie: {
        secure: false, // Adjust as needed
      },
      store: new MongoStore({
        client: client, // Use the MongoDB client
        dbName: "ecommerce",
      }),
      serialize: (user, callback) => {
        // Serialize user details to store in the session
        callback(null, user); // Customize based on your user model
      },
      deserialize: (user, callback) => {
        // Deserialize user details when retrieving from the session
        callback(null, user); // Customize based on your user model
      },
    })
  );

  app.get("/", (req, resp) => {
    resp.send(
      "I am Nodejs and i am here to help you for database communication"
    );
  });

  app.post("/products", createProduct);
  app.get("/products", fetchProductsByFilter);
  app.get("/products/:id", fetchProductById);
  app.patch("/products/:id", updateProduct);

  app.post("/brands", createBrand);
  app.get("/brands", fetchBrands);

  app.post("/categories", createCategory);
  app.get("/categories", fetchCategories);

  app.post("/auth/signup", createUser);
  app.post("/auth/login", loginUser);
  app.get("/auth/hasloginned", hasLoginnedUser);
  app.patch("/users/:id", updateUser);
  app.get("/users/:id", fetchUserById);

  app.post("/cart", addToCart);
  app.get("/cart", fetchCartByUser);
  app.delete("/cart/:id", deleteCartItem);
  app.patch("/cart/:id", updateCartItem);

  app.post("/orders", createOrder);
  app.get("/ordersOfUser", fetchUserOrders);
  app.get("/orders", fetchOrders);
  app.delete("/orders/:id", deleteOrder);
  app.patch("/orders/:id", updateOrder);

  app.listen(8080);
};

main().catch((err) => console.log(err));

// app.get("/", (req, resp) => {
//   resp.send("I am Nodejs and i am here to help you for database communication");
// });

// app.post("/products", createProduct);
// app.get("/products", fetchProductsByFilter);
// app.get("/products/:id", fetchProductById);
// app.patch("/products/:id", updateProduct);

// app.post("/brands", createBrand);
// app.get("/brands", fetchBrands);

// app.post("/categories", createCategory);
// app.get("/categories", fetchCategories);

// app.post("/auth/signup", createUser);
// app.post("/auth/login", loginUser);
// app.get("/auth/hasloginned", hasLoginnedUser);
// app.patch("/users/:id", updateUser);
// app.get("/users/:id", fetchUserById);

// app.post("/cart", addToCart);
// app.get("/cart", fetchCartByUser);
// app.delete("/cart/:id", deleteCartItem);
// app.patch("/cart/:id", updateCartItem);

// app.post("/orders", createOrder);
// app.get("/ordersOfUser", fetchUserOrders);
// app.get("/orders", fetchOrders);
// app.delete("/orders/:id", deleteOrder);
// app.patch("/orders/:id", updateOrder);

// app.listen(8080);
