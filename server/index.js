const express = require("express")
const cors = require("cors")
const env = require("dotenv")
const mongoose = require("mongoose")
const cloudinary = require("cloudinary")

const userRoutes = require("./src/routes/user.route");
const categoryRoute = require("./src/routes/category.route");
const productRoute = require("./src/routes/product.route");
const reviewRoute = require("./src/routes/review.route");
const cartRoute = require("./src/routes/cart.route");
const orderRoute = require("./src/routes/order.route");

const app = express()
env.config()

//database
mongoose.connect(
    `mongodb+srv://${[process.env.MONGO_USER]}:${[process.env.MONGO_PASSWORD]}@cluster0.omlfh.mongodb.net/`
)

.then(() => {
    console.log("Database Connected");
  })
  .catch((error) => {
    console.log(error);
  });

  cloudinary.config({
    cloud_name: `${process.env.CLOUD_NAME}`,
    api_key: `${process.env.API_KEY}`,
    api_secret: `${process.env.AP_SECRET}`,
  })


  app.use(cors())
  app.use(express.json())
  
  app.use("/api", userRoutes);
  app.use("/api", categoryRoute);
  app.use("/api", productRoute);
  app.use("/api", reviewRoute);
  app.use("/api", cartRoute);
  app.use("/api", orderRoute);

app.listen(process.env.PORT,()=>{
    console.log(`your server runing port ${process.env.PORT}` )
})