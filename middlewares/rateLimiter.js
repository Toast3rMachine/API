const setRateLimit = require("express-rate-limit");
const authJwt = require('./authJwt');

const setRateLimitMiddleware = setRateLimit({
    windowMs: 60*1000,
    max: 5,
    message: "You have exceeded your 5 requests per minute limit.",
    headers: true,
});

const setRateLimitAdminMiddleware = setRateLimit({
    windowMs: 60*1000,
    max: 10,
    message: "You have exceeded your 10 requests per minute limit.",
    headers: true,
});

const setRateLimitRole = authJwt.isAdmin ? setRateLimitAdminMiddleware : setRateLimitMiddleware;

const rateLimiter = {
    setRateLimitRole,
};
module.exports = rateLimiter;