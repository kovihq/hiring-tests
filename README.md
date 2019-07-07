# Queue Message Array Challenge

## Problem:
John receives a message with 2 arrays in his queue, filled with integer elements.
John needs a function that receives only 2 arrays (arr1, arr2) from queue and returns only the elemens that are in both arrays asc sorted.

Example payload : {[3, 5, 6, 1, 2, 16], [16, 6, 91, 1, 4, 3, 123, 1, 1]}

Example response: 1, 3, 6, 16

## Solution

### Code explanation
This code runs a service built in [Express](https://expressjs.com/), that receives POST requests with a JSON body containing the two arrays, and returns a JSON containing the response array.

The POST request goes to index.js file, and its handled inside the express app.post() method.  

The arrays are extracted from the JSON body and are sent to the getPayload function, which gives the response array.

At last the response array is sent to the client inside the field "response" of a JSON.

### How to run it

#### To run directly into your machine
1. Clone the repository
2. Run `npm install` or `yarn install`
3. Run the service with `npm start` or `yarn start`

#### To run it inside a docker container
1. Clone the repository
2. Run `docker-compose up`

On default, it will run on port 3000. But you can change it by adding a PORT variable on the Dockerfile.
You also need to change the EXPOSE command, and the ports property of the docker-compose.yml file to match port the new port.

### How to use it
Send a POST request to the service containing a JSON in the following body format:
```
{ 
  "arr1": [The first array], 
  "arr2": [The second array] 
}
```

Ex:
```
curl -X POST -H "Content-Type: application/json" -d '{ "arr1": [3, 5, 6, 1, 2 , 16], "arr2": [16, 6, 91, 1, 4, 3, 123, 1, 1] }' [The service ip]:[choosen port (default: 3000)]
```

The service will responde with an JSON containing the response array. Ex: 
`{"response":[1,3,6,16]}`

### How to test it
Just run `npm run-script test` or `yarn test` inside the app directory.