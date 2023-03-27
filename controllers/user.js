const { v4: uuidv4 } = require("uuid");
const User = require("../models/user");
const { setUser } = require("../service/auth");

async function handleUserSignup(req, res) {
  const { name, email, password } = req.body;
  await User.create({
    name,
    email,
    password,
  });
  return res.sendStatus(200);
}

async function handleUserLogin(req, res) {
  const { email, password } = req.body;
  console.log(req.body)
  const user = await User.findOne({ email, password });

  if (!user)
    return res.sendStatus(404);

  const sessionId = uuidv4();
  setUser(sessionId, user);
  res.cookie("uid", sessionId,{
    maxAge: 30 * 24 * 60 * 60 * 1000,
    httpOnly: true,
});
  return res.send({name:user.name, email: user.email});
}

module.exports = {
  handleUserSignup,
  handleUserLogin,
};
