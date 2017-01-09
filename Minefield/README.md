Client side bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).
Server side bootstrapped with ten fingers ;)

Things demonstrated here:

Overall:
+ Plenty of non-optimized code and other clowntown

Font end (JS):
+ React, with Redux ([React Community](https://github.com/reactjs))
+ Infinite data stream fetching with [fetch-readablestream](https://github.com/jonnyreeves/fetch-readablestream)
+ Testing with [Jest ](https://facebook.github.io/jest/)

Back end (Java):
+ Multi-threaded server with specialized GET/POST handlers
+ Concurrent collections
+ Generic data processing
+ Non-blocking data streaming

How this works:
+ Client sends transaction JSON data in a POST request. One transaction per request.
+ Server pushes it to the input queue
+ Transaction processor does some magic, pushes the data to the output queue
+ All connected clients receive an infinite stream of output data, as and when available

Assumptions:
+ Everything is done in memory. No persistent storage, period.
+ Very minimal error checking (it's a sample, not prod code)

How to use this sample:

+ Clone the project repo
+ Edit the __homepage__ prop in package.json to match your web server's root for this project. You can remove it if used with the built-in server via __npm start__.
+ Run __npm install__ and __npm run build__ in project root directory
+ Start the Java server by running __gradle runApp__ in the server root directory
+ Stream the living daylights out of it...

License: MIT
