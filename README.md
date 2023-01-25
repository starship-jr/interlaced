# Interlaced
## WIP

Interlaced is a work in progress and a curiostiry about sharedArrayBuffer.
It aims to use javascript SharedArrayBuffer to pass concrete javascript Object between main thread and worker-threads/web-workers.

The main idea is to transform a javascript object into a buffer representation to fill the SharedArrayBuffer dataview.
When data are transmit on the worker thread, if we know the schema - how the javascript object is structured - we can create again a javascript object from it. Function won't be supported, it will be used to pass plain json like object 

For this project I plan to use the awesome [buffer-plus](https://github.com/arloliu/buffer-plus) project developed by arloliu. It is the library that allows to convert object to buffer and vice-versa. 

A double ring buffer will be build on top of it.
We send data on a first ring buffer, backed by a sharedArrayBuffer.
When data has been processed, another ring buffer - backed by another sharedArrayBuffer- will be filled with result data.

Of course, memory usage will be higher with this approach, but I hope we can gain some considerable speed with it. 
As of now I do not know at all if it will be more performant than a postMessage approach, but benchmarks will come.