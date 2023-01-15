const { connect } = require("getstream");
const bcrypt = require("bcrypt");
// const jwt = require('jsonwebtoken');
const StreamChat = require("stream-chat").StreamChat;
const crypto = require("crypto");
require('dotenv').config();

const api_key = process.env.API_KEY;
const api_secret = process.env.API_SECRET;
const app_id = process.env.APP_ID;

const signup = async (req, res) => {
  const { fullName, username, password, phone, profileImageURL } = req.body;

  try {
    const userId = crypto.randomBytes(16).toString("hex");
    const serverClient = connect(api_key, api_secret, app_id);
    const hashedPassword = await bcrypt.hash(password, 10);
    const token = serverClient.createUserToken(userId);
    res
      .status(200)
      .json({ token, fullName, username, userId, hashedPassword, phone,profileImageURL });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message,
    });
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const serverClient = connect(api_key, api_secret, app_id);
    const client = StreamChat.getInstance(api_key, api_secret);
    const { user } = client.queryUsers({ name: username });
    if (!user.length)
      return res.status(400).json({ message: "User not found" });
    const success = await bcrypt.compare(password, user[0].hashedPassword);
    const token = serverClient.createUserToken(user[0].id);
    if (success) {
      res.status(200).json({
        token,
        fullName: user[0].fullName,
        username,
        userId: user[0].id,
        //   hashedPassword: user[0].hashedPassword,
        //   phoneNumber: user[0].phoneNumber,
      });
    } else {
      res.status(500).json({
        message: "Incorrect password!",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = { signupController: signup, loginController: login };
