

new componenet i am chosssing is: Express-rate-limit
What is it?
A package that limits how many times someone can call my API endpoints. Like a bouncer at a club - only allows certain number of requests per time period.
Why I picked it?
During tournaments, lots of fans will check match scores at the same time. Without rate limiting, my API could crash or get super slow. Also, it stops hackers from trying to guess passwords repeatedly and saves Firebase costs by limiting database reads.
How it works?

Public endpoints (GET players, matches): 100 requests per 15 minutes
Login/Register: 5 requests per 15 minutes (stops hackers)
Create/Update/Delete: 20 requests per 15 minutes

If someone goes over the limit, they get error
Setup:
npm install express-rate-limit
I'll create different limiters in middleware/rateLimiter.js and apply them to routes. Easy to test by making lots of requests and seeing the block happen.

