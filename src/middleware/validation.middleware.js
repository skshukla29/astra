const { validationResult } = require("express-validator");

function validateRequest(req, res, next) {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    return res.status(400).json({ errors: result.array() });
  }
  return next();
}

module.exports = { validateRequest };
