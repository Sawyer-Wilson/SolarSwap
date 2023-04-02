// Checks if user is logged in
function requireLogin (req, res, next) {
  if (req.isAuthenticated()) {
      next();
  } else {
      res.status(401)
         .json({ msg: 'You must be logged in to access this resource' });
  }
};

// Checks if user is logged in and using their ID to access resource
function requireLoginAndID (req, res, next) {
  if (req.isAuthenticated() && req.user._id == req.params.id) {
      next();
  } else {
      res.status(401)
         .json({ msg: 'You must be logged in access this resource' });
  }
};

module.exports = { requireLogin, requireLoginAndID };
