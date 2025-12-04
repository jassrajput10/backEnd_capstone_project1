

Component 1: Express-rate-limit
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

Component 2: In-Memory Caching
What is it?
Stores frequently accessed data in server memory instead of fetching from Firebase every time. Like keeping popular player stats in a quick-access notebook instead of checking the database constantly.
Why it's useful?
When 100 fans check the same player's stats, without caching that's 100 Firebase reads (costs money + slow). With caching, it's 1 Firebase read and 99 instant memory reads (fast + cheap).
How it works?
hnpm install node-cache

First request: fetch from Firebase, store in cache
Next requests: return from memory (super fast)
Cache expires after 5 minutes, then refresh

Perfect for: player lists, match schedules, tournament standings (data that doesn't change every second).
Setup
Create utils/cache.js with node-cache, then wrap service layer calls to check cache first before hitting Firebase.