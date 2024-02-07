Rate limiters are a key part of building an API or large scale distributed system, they help when we wish to throttle traffic based on the user. They allow you to ensure that one or more bad actors can’t accidentally or deliberately overload the service.

A rate limiting strategy can make your API more reliable, when:

A user is responsible for a spike in traffic, and you need to stay up for everyone else.
A user is accidentally sending you a lot of requests.
A bad actor is trying to overwhelm your servers.
A user is sending you a lot of lower-priority requests, and you want to make sure that it doesn’t affect your high-priority traffic.
Your service is degraded, and as a result you can’t handle your regular traffic load and need to drop low-priority requests.
