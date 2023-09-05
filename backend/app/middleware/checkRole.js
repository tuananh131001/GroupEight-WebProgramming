// Middleware to check user roles
function checkUserRole(role) {
    return (req, res, next) => {
      const userRole = req.user.role; // Assuming you have stored the user's role in req.user
      if (userRole === role) {
        // User has the required role, proceed to the next middleware/route handler
        next();
      } else {
        // User doesn't have the required role, respond with a forbidden error
        res.status(403).json({ error: 'Permission denied.' });
      }
    };
  };
  
  module.exports = checkUserRole;