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
const {
  fetchUserById,
  updateUser,
  updateProfile,
} = require("./controller/User");
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
const {
  addToWishlist,
  fetchWishlistByUser,
  deleteWishlistItem,
} = require("./controller/Wishlist");
const bodyParser = require("body-parser");

// Increase payload size limit
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

app.use(
  cors({
    origin: "https://e-commerce-front-end-lilac.vercel.app/", // for vercel put vercel client
    credentials: true,
    exposedHeaders: ["X-Total-Count"],
  })
); // to parse req.body

// cookie parser middleware
app.use(cookieParser());

const main = async () => {
  const client = await MongoClient.connect(
    "mongodb://bundheliyadeep:Deep1234@ac-xo85jjn-shard-00-00.hpg57sk.mongodb.net:27017,ac-xo85jjn-shard-00-01.hpg57sk.mongodb.net:27017,ac-xo85jjn-shard-00-02.hpg57sk.mongodb.net:27017/ecommerce?ssl=true&replicaSet=atlas-mfpcek-shard-0&authSource=admin&retryWrites=true&w=majority"
  );

  console.log("MongoDB connected");

  await mongoose.connect(
    "mongodb://bundheliyadeep:Deep1234@ac-xo85jjn-shard-00-00.hpg57sk.mongodb.net:27017,ac-xo85jjn-shard-00-01.hpg57sk.mongodb.net:27017,ac-xo85jjn-shard-00-02.hpg57sk.mongodb.net:27017/ecommerce?ssl=true&replicaSet=atlas-mfpcek-shard-0&authSource=admin&retryWrites=true&w=majority"
  );

  console.log("database connected");
  app.set("trust proxy", 1);

  // app.use(express.static("public"))

  app.use(
    session({
      secret: "Stay Signin secret",
      resave: false,
      saveUninitialized: true,
      cookie: {
        sameSite: "none", // for vercel , "none" and localhost "Lax"
        secure: true, // Adjust as needed // for vercel , true , for localhost false
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
  app.post("/updateUserProfile/:id", updateProfile);

  app.post("/cart", addToCart);
  app.get("/cart", fetchCartByUser);
  app.delete("/cart/:id", deleteCartItem);
  app.patch("/cart/:id", updateCartItem);

  app.post("/orders", createOrder);
  app.get("/ordersOfUser", fetchUserOrders);
  app.get("/orders", fetchOrders);
  app.delete("/orders/:id", deleteOrder);
  app.patch("/orders/:id", updateOrder);

  app.post("/wishlist", addToWishlist);
  app.get("/wishlist", fetchWishlistByUser);
  app.delete("/wishlist/:id", deleteWishlistItem);

  app.listen(8080);
};

main().catch((err) => console.log(err));
