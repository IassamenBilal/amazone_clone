import express from "express";
import Product from "../models/product.model.js";
import data from "../data.js";
import expressAsyncHandler from "express-async-handler";
import { isAdmin, isAuth } from "../utils/utils.js";

const router = express.Router();

router.post(
  "/api/products",
  expressAsyncHandler(async (req, res) => {
    const keywords = req.body.keywords
      ? {
          name: {
            $regex: req.body.keywords,
            $options: "i",
          },
        }
      : {};

    const products = await Product.find({ ...keywords });
    res.send(products);
  })
);

router.post(
  "/api/products/new",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const newProduct = new Product({
      name: req.body.name,
      image: req.body.image,
      brand: req.body.brand,
      price: req.body.price,
      countInStock: req.body.countInStock,
      category: req.body.category,
    });
    await newProduct.save();
    res.send({ message: "Product added successfully" });
  })
);

router.get(
  "/api/products/top",

  expressAsyncHandler(async (req, res) => {
    const products = await Product.find({}).sort({ rating: -1 }).limit(3);
    res.json(products);
  })
);

router.put(
  "/api/products/review/delete",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const { productId, reviewId } = req.body;
    const product = await Product.findById(productId);
    if (product) {
      product.reviews = product.reviews.pull({ _id: reviewId });
      product.numReviews = product.reviews.length;
      product.rating =
        product.reviews.length !== 0
          ? product.reviews.reduce((acc, item) => item.rating + acc, 0) /
            product.reviews.length
          : 0;
      await product.save();
      res.json({ message: "Review deleted" });
    } else {
      res.status(404).send({ message: "Product not found" });
    }
  })
);

router.get(
  "/api/products/:id",
  expressAsyncHandler(async (req, res) => {
    const id = req.params.id;
    const product = await Product.findById(id);
    if (product) {
      res.send(product);
    } else {
      res.status(404).send({ message: "Product not found" });
    }
  })
);

router.get(
  "/api/product/details/:id",
  expressAsyncHandler(async (req, res) => {
    const id = req.params.id;
    const product = await Product.findById(id);
    if (product) {
      res.send(product);
    } else {
      res.status(404).send({ message: "Product not found" });
    }
  })
);

router.put(
  "/api/products/update/:id",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const id = req.params.id;
    const product = await Product.findById(id);
    if (product) {
      product.name = req.body.name;
      product.image = req.body.image;
      product.brand = req.body.brand;
      product.price = req.body.price;
      product.countInStock = req.body.countInStock;
      product.category = req.body.category;
      await product.save();
    } else {
      res.status(404).send({ message: "Product not found" });
    }
  })
);

router.put(
  "/api/products/review/:id",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const id = req.params.id;
    const product = await Product.findById(id);
    if (product) {
      const alreadyReviewed = product.reviews.find(
        (r) => r.user.toString() === req.user._id.toString()
      );
      if (alreadyReviewed) {
        res.status(400);
        throw Error("Product already reviewed");
      }
      const review = {
        name: req.user.name,
        rating: Number(req.body.rating),
        comment: req.body.comment,
        user: req.user._id,
      };
      product.reviews.push(review);
      product.numReviews = product.reviews.length;
      product.rating =
        product.reviews.reduce((acc, item) => item.rating + acc, 0) /
        product.reviews.length;
      await product.save();
      res.status(201).send({ message: "Review added" });
    } else {
      res.status(404).send({ message: "Product not found" });
    }
  })
);

router.delete(
  "/api/products/delete/:id",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
      await product.delete();
      res.json({ message: "Product deleted successfully" });
    } else {
      res.status(404).send({ message: "Product not found" });
    }
  })
);

export default router;
