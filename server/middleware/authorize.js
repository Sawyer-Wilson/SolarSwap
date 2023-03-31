// Checks if user is Passport authenticated
function requireLogin (req, res, next) {
  if (req.isAuthenticated()) {
      next();
  } else {
      res.status(401)
         .json({ msg: 'You must be logged in to view this page' });
  }
};

module.exports = requireLogin;
