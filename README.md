# Queue Message Array Challenge

Send payload with 2 arrays and it returns the common elements between those arrays in asc sorted

Example payload : {[3, 5, 6, 1, 2, 16], [16, 6, 91, 1, 4, 3, 123, 1, 1]}

Example response: 1, 3, 6, 16


## Information
Application developed with:
 - Nodejs
 - Jest for testing
 - Docker
 
## Running application
You have two options to run this application:
 - Nodejs with express framework
 - Docker
 
To run via express you must have nodejs installed and available in your path.

First run ``npm install`` and then just run this command inside this folder: ``node index.js``
 
In order to run the application via docker, you must have docker installed on your machine.
If you don't have docker installed, you can download form https://docs.docker.com/

To run via docker:

####Under Windows
 - ./run.bat
####Under Linux
 - ./run.sh

Your application will be available at port 3000.

### Using the application
Just perform a get http method at localhost:3000 with the following header:
 - payload: {array1: [], array2[]}

The content of payload header must be json.

### Testing

To run test you simply run the ``npm run test`` command.

