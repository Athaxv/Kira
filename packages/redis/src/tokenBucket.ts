export const tokenBucketScript = `
local key = KEYS[1]

local capacity = tonumber(ARGV[1])
local refillRate = tonumber(ARGV[2])
local now = tonumber(ARGV[3])
local ttl = tonumber(ARGV[4])

local data = redis.call("HMGET", key, "token", "lastRefill")

local token = tonumber(data[1])
local lastRefill = tonumber(data[2])

if not token or not lastRefill then
    token = capacity
    lastRefill = now
end

local elapsed = (now - lastRefill) / 1000

local newTokens = elapsed * refillRate

local currentTokens = math.min(
    capacity,
    token + newTokens
)

if currentTokens >= 1 then
    currentTokens = currentTokens - 1

    redis.call(
        "HSET",
        key,
        "token",
        currentTokens,
        "lastRefill",
        now
    )

    redis.call(
        "EXPIRE",
        key,
        ttl
    )

    return 1
end

redis.call(
    "HSET",
    key,
    "token",
    currentTokens,
    "lastRefill",
    now
)

redis.call(
    "EXPIRE",
    key,
    ttl
)

return 0
`;