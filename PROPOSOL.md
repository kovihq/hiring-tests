The proposal is to use my actual arquiteture to operate the queue. I will have 2 queue:

- unsorted
- sorted
A endpoint to send arrays to queue, and a endpoint to read those sorted arrays.

A lambda will consume a queue and its messages, process then send to another queue.

A deadletherqueue is also in place with a logic in to remove strings and reinsert on unsorted queue.
