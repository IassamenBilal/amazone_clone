import express from "express";
import expressAsyncHandler from "express-async-handler";
import Order from "../models/order.model.js";
import Product from "../models/product.model.js";
import { isAdmin, isAuth } from "../utils/utils.js";
const router = express.Router();

router.get(
  "/api/orders",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const orders = await Order.find({});
    res.send(orders);
  })
);

router.get(
  "/api/orders/mine",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const orders = await Order.find({ user: req.user._id });
    res.send(orders);
  })
);

router.put(
  "/api/orders/deliver",
  expressAsyncHandler(async (req, res) => {
    const { orderId } = req.body;
    let order = await Order.findById(orderId);
    if (order) {
      order.isDelivred = true;
      order.deliveredAt = Date.now();
      order.orderItems.map(async (order) => {
        let product = await Product.findById(order.product);
        product.countInStock = product.countInStock - Number(order.qty);
        await product.save();
      });

      await order.save();
      res.status(201).send({ message: "Updated successfully" });
    } else {
      res.status(401).send({ error: "Order not found" });
    }
  })
);

router.post(
  "/api/orders",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    if (req.body.orderItems.length === 0) {
      res.status(400).send({ message: "Cart is empty" });
    } else {
      const order = new Order({
        orderItems: req.body.orderItems,
        shippingAddress: req.body.shippingAddress,
        paymentMethod: req.body.paymentMethod,
        itemsPrice: req.body.itemsPrice,
        shippingPrice: req.body.shippingPrice,
        taxPrice: req.body.taxPrice,
        totalPrice: req.body.totalPrice,
        user: req.user._id,
      });
      const createdOrder = await order.save();
      res
        .status(201)
        .send({ message: "New order created", order: createdOrder });
    }
  })
);

router.get(
  "/api/orders/:id",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
      res.send(order);
    } else {
      res.status(404).send({ message: "Order not found" });
    }
  })
);

router.put(
  "/api/orders/:id/pay",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
      order.isPaid = true;
      order.paidAt = Date.name();
      order.paymentResult = {
        id: req.body.id,
        status: req.body.status,
        update_time: req.body.update_time,
        email_address: req.body.email_address,
      };

      const updatedOrder = await order.save();
      res.send({ message: "Order paid", order: updatedOrder });
    } else {
      res.status(404).send({ message: "Order not paid" });
    }
  })
);
export default router;
