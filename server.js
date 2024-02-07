import express from "express";

const app = express();

const PORT = 3000;

// Define a map to store tokens for each IP address
const tokenBucketMap = new Map();

// Middleware function for rate limiting
const rateLimitMiddleware = (req, res, next) => {
  const ip = req.ip;
  const capacity = 10;
  const refillRate = 1; // tokens per second

  // Initialize token bucket for the IP if not present
  if (!tokenBucketMap.has(ip)) {
    tokenBucketMap.set(ip, { tokens: capacity, lastRefillTime: Date.now() });
  }

  // Refill the token bucket based on elapsed time
  const currentTime = Date.now();
  const elapsedTime = currentTime - tokenBucketMap.get(ip).lastRefillTime;
  const tokensToAdd = Math.floor(elapsedTime / 1000) * refillRate;

  tokenBucketMap.get(ip).tokens = Math.min(
    capacity,
    tokenBucketMap.get(ip).tokens + tokensToAdd
  );
  tokenBucketMap.get(ip).lastRefillTime = currentTime;

  // Check if there are enough tokens for the current request
  if (tokenBucketMap.get(ip).tokens > 0) {
    tokenBucketMap.get(ip).tokens--;
    next(); // Continue to the next middleware or route handler
  } else {
    res.status(429).send("Too Many Requests"); // Return 429 status if the bucket is empty
  }
};

app.get("/unlimited", (req, res) => {
  res.send("Unlimited! Let's Go!");
});

app.get("/limited", rateLimitMiddleware, (req, res) => {
  res.send("Limited, don't over use me!");
});

app.listen(PORT, () => {
  console.log(`Server is listening at ${PORT}`);
});
