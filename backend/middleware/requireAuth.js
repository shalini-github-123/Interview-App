const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const requireAuth = (roles = []) => {
  return async (req, res, next) => {
    const { authorization } = req.headers;
    console.log("check 1", authorization);

    if (!authorization) {
      return res.status(401).json({ error: 'Authorization token required' });
    }

    const token = authorization.split(' ')[1];
    console.log("check 2", token);

    try {
      const { _id, role } = jwt.verify(token, process.env.SECRET);
      console.log("check 3", _id, role);

      // Find the user by _id
      req.user = await User.findById(_id).select('_id email role password');

      console.log("check 6", req.user?.email, req.user?.password);

      // Check if user is found
      if (!req.user) {
        console.log("check 4");
        return res.status(404).json({ error: 'User not found' });
      }

      // Check if user has the required role to access the route
      if (roles.length && !roles.includes(req.user.role)) {
        return res.status(403).json({ error: 'Access forbidden: Insufficient permissions' });
      }

      console.log("check 5");
      next();
    } catch (error) {
      console.log(error);
      res.status(401).json({ error: 'Request is not authorized' });
    }
  };
};

module.exports = requireAuth;
