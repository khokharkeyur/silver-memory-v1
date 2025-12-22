import { createSecretToken } from "../helper/generateToken.js";
import { User } from "../module/index.js";
import bcrypt from "bcrypt";

export const createUser = async (req, res) => {
  try {
    if (!(req.body.email && req.body.password && req.body.name)) {
      res.status(400).send("All input is required");
    }

    const oldUser = await User.findOne({ email: req.body.email });

    if (oldUser) {
      return res.status(409).send("User Already Exist. Please Login");
    }
    const salt = 10;
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const newUser = new User({
      name: req.body.name,

      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });
    const user = await newUser.save();
    const token = createSecretToken(user._id);

    // res.cookie("token", token, {
    //   path: "/",
    //   expires: new Date(Date.now() + 86400000),
    //   secure: true,
    //   httpOnly: true,
    //   sameSite: "None",
    // });

    console.log("cookie set succesfully");

    res.json(user);
  } catch (error) {
    console.log("Gott an error", error);
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  if (!(email && password)) {
    return res.status(400).json({ message: "All input is required" });
  }
  const user = await User.findOne({ email });
  if (!(user && (await bcrypt.compare(password, user.password)))) {
    return res.status(404).json({ message: "Invalid credentials" });
  }
  const token = createSecretToken(user._id);
  // res.cookie("token", token, {
  //   domain: process.env.frontend_url,
  //   path: "/",
  //   expires: new Date(Date.now() + 86400000),
  //   secure: true,
  //   httpOnly: true,
  //   sameSite: "None",
  // });

  res.json({ token });
};
