const jwt = require('jsonwebtoken');
const User = require('./../models/User');
const SECRET = 'thissecret';
// REMOVE-END

// const getAuth = async (req, res, next) => {
//   // REMOVE-START
//   // extract token from auth headers
//   const authHeaders = req.headers['authorization'];
//   if (!authHeaders) return res.sendStatus(403);
//   const token = authHeaders.split(' ')[1];

//   try {
//     // verify & decode token payload,
//     const { _id } = jwt.verify(token, SECRET);
//     // attempt to find user object and set to req
//     const user = await User.findOne({ _id });
//     if (!user) return res.sendStatus(401);
//     req.user = user;
//     next();
//   } catch (error) {
//     res.sendStatus(401);
//   }
//   // REMOVE-END
// };
const getAuth = async (req, res, next) => {
  try {
    const token = req.headers.token;
    if (!token) {
      res.status(401).json({ error: 'unauthorised' });
    }
    const verifyToken = jwt.verify(token, SECRET);

    const auth = await User.findById(verifyToken._id);
    req.userId = verifyToken._id;
    req.auth = auth;
    next();
  } catch (error) {
    res.status(401).json({ error: 'unauthorised user' });
  }
};
module.exports = getAuth;
// // verify & decode token payload,
// const { _id } = jwt.verify(token, SECRET_KEY);
// // attempt to find user object and set to req
// const user = await User.findOne({ _id });
