const jwt = require("jsonwebtoken");

function auth(req, res, next) {
  const header = req.headers.authorization;
  const bearerToken = header && header.startsWith("Bearer ") ? header.split(" ")[1] : null;
  const token = bearerToken || req.cookies.accessToken;

  if (!token) {
    return res.status(401).json({ error: "Authentication required" });
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET || "dev_jwt_secret");
    req.user = payload;
    return next();
  } catch (_error) {
    return res.status(401).json({ error: "Invalid token" });
  }
}

function authorise(...roles) {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ error: "Forbidden" });
    }
    return next();
  };
}

module.exports = { auth, authorise };
