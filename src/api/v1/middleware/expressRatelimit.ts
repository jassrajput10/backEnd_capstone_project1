import rateLimit from 'express-rate-limit';

/**
 * this will limit the requests per window
 * if the requests go above the limit, it will send the message: Too many requests, please try again later.
 */
const limiter = rateLimit({
   windowMs: 15 * 60 * 1000, 
   max: 100, 
   message: "Too many requests, please try again later.",
   standardHeaders: true, 
   legacyHeaders: false,
});

export default limiter;