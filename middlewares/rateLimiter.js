const setRateLimit = require("express-rate-limit");
const User = require("../models/user.js");

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

const settingRateLimiter = async (req, res, next) => {
    try {
        const user = await User.findById(req.userId);
        const limiter = user?.role === true ? setRateLimitAdminMiddleware : setRateLimitMiddleware;
        return limiter(req, res, next);
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

const rateLimiter = {
    settingRateLimiter,
};
module.exports = rateLimiter;