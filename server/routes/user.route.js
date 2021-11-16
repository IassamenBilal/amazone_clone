import express, { response } from "express";
import User from "../models/user.model.js";
import data from "../data.js";
import expressAsyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import { generateToken, isAdmin, isAuth } from "../utils/utils.js";

// import mailgun from "mailgun-js";

// const DOMAIN =
//   "https://app.mailgun.com/app/sending/domains/sandbox2ac68f7da69d43dbb84c6f55c8fac5c0.mailgun.org";
// const api_key = "062f95bc229b8eed886f992bf9b87d55-28d78af2-461aa21e";

// const mg = mailgun({ apiKey: api_key, domain: DOMAIN });
// const data = {
//   from: "noreply@hello.com",
//   to: "bar@example.com, YOU@YOUR_DOMAIN_NAME",
//   subject: "Hello",
//   text: "Testing some Mailgun awesomness!",
// };
// mg.messages().send(data, function (error, body) {
//   console.log(body);
// });

const router = express.Router();

router.post("/admin", async (req, res) => {
  const users = data.users;
  const created = await User.insertMany(users);
  res.send(created);
});

router.get(
  "/api/users",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const users = await User.find({});
    res.json(users);
  })
);
router.get(
  "/api/users/seed",
  expressAsyncHandler(async (req, res) => {
    const createdUsers = await User.insertMany(data.users);
    res.send(createdUsers);
  })
);

router.post(
  "/api/users/signin",
  expressAsyncHandler(async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        res.send({
          _id: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
          token: generateToken(user),
        });
      } else {
        return res
          .status(401)
          .send({ message: "invalid user email or password" });
      }
    }
  })
);

router.post("/api/add/admin", async (req, res) => {
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
    isAdmin: true,
  });
  const createdUser = await user.save();
  res.send({
    _id: user._id,
    name: createdUser.name,
    email: createdUser.email,
    isAdmin: createdUser.isAdmin,
    token: generateToken(createdUser),
  });
});

router.post(
  "/api/users/register",
  expressAsyncHandler(async (req, res) => {
    const exist = await User.findOne({ email: req.body.email });
    if (exist) {
      return res.status(401).send({ message: "User already exists" });
    }
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8),
    });
    const createdUser = await user.save();
    res.send({
      _id: user._id,
      name: createdUser.name,
      email: createdUser.email,
      isAdmin: createdUser.isAdmin,
      token: generateToken(createdUser),
    });
  })
);

router.put(
  "/api/users/update",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.body.userId);
    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      if (req.body.password) {
        user.password = bcrypt.hashSync(req.body.password, 8);
      }
      const updatedUser = await user.save();
      res.send({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
        token: generateToken(updatedUser),
      });
    }
  })
);

router.get(
  "/api/users/:id",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
      res.send(user);
    } else {
      res.status(404).send({ message: "User not found" });
    }
  })
);
router.delete(
  "/api/users/:id",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
      await user.delete();
      res.json({ message: "User deleted successfully" });
    } else {
      res.status(404).send({ message: "User not found" });
    }
  })
);
export default router;
