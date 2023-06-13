const jwt = require('jsonwebtoken');
const User = require('./../models/User');
const SECRET = 'thissecret';

const getAuth = async (req, res, next) => {
  try {
    const token = req.headers.token;
    if (!token) {
      res.status(401).json({ error: 'unauthorised' });
    }
    const verifiedToken = jwt.verify(token, SECRET);
    const auth = await User.findById(verifiedToken.id);
    req.userId = verifiedToken.id;

    req.auth = auth;

    next();
  } catch (error) {
    res.status(401).json({ error: 'unauthorised user' });
  }
};
module.exports = getAuth;
