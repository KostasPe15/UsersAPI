import express from 'express'; //Imports the Express.js framework
import { v4 as uuidv4 } from 'uuid'; //uuid package will help generate a unique ID for each user you will be creating.
const router = express.Router(); //Creates a fresh router instance, stored in the variable router

//Mock database containing an array of users
let users = [];

/*The router.get() function sets up a route that responds to HTTP GET requests
The second part of the code (req, res) => { ... } is a callback function. 
It gets executed when a request is made to the GET route*/
router.get('/', (req, res) => {
    /*We use res.send(users) to send a response back to the client.
    We're sending the users variable as the response. So when a user hits the GET URL,
    the server responds by sending the data inside the users variable
    in JSON format to the client.
    */
    res.send(users);
})

/*The router.get() function sets up a route that responds to HTTP
GET requests. In this example, we've defined a route with ('/:id').
The :id part is a route parameter, which allows us to capture a
dynamic value from the URL. In this case, it represents the user ID
we want to retrieve.*/
router.get('/:id', (req, res) => {
    //req object, represents the incoming request made by the client
    //req.params, holds the values of route parameters
    const { id } = req.params;//extracting the user ID from the URL

    const foundUser = users.find((user) => user.id === id)

    res.send(foundUser)//foundUser variable contains the user object that matches the requested ID
});

/*The router.post() function sets up a route that responds to
HTTP POST requests. This means that when a client sends a POST
request to the root URL of your application, this route will be triggered*/
router.post('/', (req, res) => {
    /* req object represents the incoming request made by the client
    req.body contains the data (first name, last name, and email)
    that the client will send as part of the POST request's body*/

    const user = req.body; //Extract this data from req.body and store it in the user variable.

    /*We add the user data to an array called users
    we generate a universally unique identifier (UUID) 
    using the function uuidv4() and include it as id in the user object*/
    users.push({ ...user, id: uuidv4() });

    res.send(`${user.first_name} has been added to the Database`);
})

/*The router.delete() function sets up a route that responds to
HTTP DELETE requests. In this example, we've defined a route
with ('/:id'), where :id is a route parameter. It captures a dynamic
value from the URL, representing the user ID we want to delete*/
router.delete('/:id', (req, res) => {
    //req object, represents the incoming request made by the client
    //req.params, holds the values of route parameters
    const { id } = req.params;
  
    //.filter() method creates new array that excludes the user with the matching ID (id)
    users = users.filter((user) => user.id !== id)
  
    res.send(`${id} deleted successfully from database`);
});

/*The router.patch() function sets up a route that responds to
HTTP PATCH requests. In this example, we've defined a route with
('/:id'), where :id is a route parameter. It captures the dynamic
value from the URL, representing the user ID we want to update*/
router.patch('/:id', (req, res) => {
    //req object, represents the incoming request made by the client
    //req.params, holds the values of route parameters
    const { id } = req.params;
    
    //req.body contains the data to be updated.
    const { first_name, last_name, email} = req.body;
  
    //We use .find() to locate the user object with the matching ID
    const user = users.find((user) => user.id === id)
  
    /*We check if first_name, last_name, or email properties exist in req.body
    If they do, we can update the corresponding properties of the user object 
    with the new values*/
    if(first_name){
        user.first_name = first_name;
    } 
    if(last_name){
        user.last_name = last_name;
    } 
    if(email){
        user.email = email;
    } 
  
    res.send(`User with the ${id} has been updated`)
    
  });

export default router