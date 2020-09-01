---
title: "Concurrent: A Performant Promises/A+ Library with Scala Awesomeness"
---

Last week, I was talking with Jim Brikman about the JavaScript Promises/A+ spec and how Scala really nailed asynchronous programming with their Futures interface. On Friday morning, he sent me an initial example that brought the niceties of Scala to JavaScript, but the code didn't match the Promises/A+ spec - something which I felt was important for working with other Promise libraries.

So in an attempt to better understand the spec (and just for the fun of it), I decided to write my own implementation to try and write something faster than what was already available in the community. I started by reading through [http://modernjavascript.blogspot.com/2013/08/promisesa-understanding-by-doing.html](http://modernjavascript.blogspot.com/2013/08/promisesa-understanding-by-doing.html) to learn how to implement the spec and I ended up with concurrent, a performant Promises/A+ library with Scala awesomeness: [https://github.com/pspeter3/concurrent](https://github.com/pspeter3/concurrent).

## Promises/A+

Initially, I tried to implement the spec by downloading the community test suite [https://github.com/promises-aplus/promises-tests](https://github.com/promises-aplus/promises-tests) and running my code against it. The tests were a bit overwhelming at first, and I had a hard time figuring out how they were related. After reading (and re-reading) [http://promisesaplus.com/](http://promisesaplus.com/), I decided to try to use the node [EventEmitter](http://nodejs.org/api/events.html#events_class_events_eventemitter) class. I figured the event emitter could track all of the events, call them in order, and ensure each callback would only be executed once. This took care of most of the spec, but made it difficult to ensure as the EventEmitter started complaining about memory leaks.

Backtracking to a simpler approach, I created a chain of callbacks like the example on the [Modern Javascript blog post](http://modernjavascript.blogspot.com/2013/08/promisesa-understanding-by-doing.html). I realized that separating success and failure callbacks wasn’t optimal because a callback was necessary whether or not onFulfilled or onRejected was a function - keeping the two functions separate kept half the callbacks in memory regardless of if the promise was fulfilled or rejected. After some tinkering, fixing a minor infinite loop bug (only in the background of each promise), and some [simple logic changes](https://github.com/pspeter3/concurrent/commit/4896bd367132dbaf077e603dd99e3f55fe11aaa6), I was ready to test.

## setImmediate

From the start, I wanted to design a library to work specifically with node.js that blocked the event loop as little as possible. While some libraries resolve promises in the same event loop, I decided to spread them out to execute one callback per event loop. I knew this would have some performance cost, but hoped that it would prevent any promise from blocking the event loop.

Traditionally, developers have used process.nextTick for scheduling callbacks. One downside of nextTick is that it lumps all of the callbacks on the next event loop (unless they exceed the maxTick limit, in which case they go to the following event loop). Alternatively, setImmediate queues each function over all event loops so only one callback runs per event loop. Consequently, concurrent isn’t as fast in sequential tests, but has the potential to prevent an I/O bound system from stalling under heavy load (I haven’t benchmarked this yet, but hope to soon). Other benchmark results for concurrent can be found here: [https://github.com/pspeter3/promise-perf-tests](https://github.com/pspeter3/promise-perf-tests)

## Scala

I work a lot with Scala and Play! at LinkedIn, and I really enjoy how the API deals with asynchronous events. The functional approach and ability to chain futures together makes it incredibly easy to design and modify complicated asynchronous dependency graphs. Given that Futures in Scala and Promises in JavaScript are somewhat similar, I decided to add as much Scala sugar as I could - just to see what happened. The results were pretty good, but lacked the same magic as many of the Scala versions. Scala’s pattern matching and partial function application enables it to make static typing (traditionally not as expressive) more expressive than its dynamically-typed equivalents. The Futures class still works well though, and the documentation can be found [here](http://pspeter3.com/concurrent/future.js.html).

## Collections

Finally, I liked how the [async](https://github.com/caolan/async) library supports ES5 collection iterators for dealing with larger data sets across the event loop, so I decided implement them with concurrent as well, and built them using the setImmediate discussed above. This led to a performance tradeoff - it’s not as fast as other libraries resolving on the same event loop, but is less likely to block the event loop and thus starve I/O. Benchmarks of map and reduce are in the performance test results: [https://github.com/pspeter3/promise-perf-tests](https://github.com/pspeter3/promise-perf-tests).

## TL;DR

I created a performant Promises/A+ library using setImmediate and a lightweight Promises implementation that doesn't block the event loop. Then I added Scala syntactic sugar and ES5 iterators to make the library easier to use. Finally, I made sure it worked with other Promise libraries and the browser so developers could easily use it wherever they want.
