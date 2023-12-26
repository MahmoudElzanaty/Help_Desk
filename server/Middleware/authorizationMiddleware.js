module.exports = function authorizationMiddleware(roles) {
  return (req, res, next) => {
    if (!req.user || !req.user.role) {
      return res.status(401).json("Unauthorized access");
    }
    const userRole = req.user.role;

    if (!roles.includes(userRole))
      return res.status(403).json("unauthorized access");
    
    next();
  };
};