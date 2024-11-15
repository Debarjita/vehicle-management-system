//Limits API requests using express-rate-limit to prevent too many requests.


const rateLimit = require('express-rate-limit');

module.exports = rateLimit({
  windowMs: 1 * 60 * 1000,  // 1 minute
  max: 5,  // limit each IP to 5 requests per minute
  message: 'Too many requests. Please try again after a minute.',
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});
