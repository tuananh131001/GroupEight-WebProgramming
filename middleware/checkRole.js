/* <!-- // RMIT University Vietnam
// Course: COSC2430 Web Programming
// Semester: 2023B
// Assessment: Full-stack Web Application
// Author: Team Eight
// Acknowledgement: Google , Stackoverflow, w3schools --> */

// Middleware to check user roles
function checkUserRole(role) {
  return (req, res, next) => {
    const userRole = req.user?.role; 
    if (userRole === role) {
      // User has the required role, proceed to the next middleware/route handler
      next();
    } else {
      // User doesn't have the required role, respond with a forbidden error
      req.flash("error_msg", "You are not authorized to view this page");
      res.redirect("/");
    }
  };
}

module.exports = checkUserRole;
