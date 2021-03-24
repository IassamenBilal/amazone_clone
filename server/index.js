import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import userRoute from "./routes/user.route.js";
import productRouter from "./routes/product.route.js";
import dotenv from "dotenv";
import orderRouter from "./routes/order.route.js";
import uploadRouter from "./routes/upload.route.js";
import path from "path";

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extented: true }));
app.use(cors());
/* Connect to MONGO DB */

mongoose
  .connect(process.env.Mongo_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((err) => console.log(err));

/* Routes */
const __dirname = path.resolve();

app.use("/uploads", express.static(path.join(__dirname, "/uploads")));
app.use("/", userRoute);
app.use("/", productRouter);
app.use("/", orderRouter);
app.use("/api/upload", uploadRouter);
app.get("/api/config/paypal", (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID);
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/client/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server started");
});
