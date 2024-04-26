import express from 'express'; //Import express from the Express module that we installed. 
import bodyParser from 'body-parser'; //The bodyParser comes with Express, and it allows us to take in the incoming POST request body.
import userRoutes from './routes/users.js' //Import your user routes from user.js

const app = express(); // Create a new Express Instance
const PORT = 5000; //Specify the port for the application

app.use(bodyParser.json()); //Specify that JSON data will be used in the application
app.use('/users', userRoutes); //Specify the path and router handler

/*The app.get() function accepts two parameters. The first is used to
specify the path (in this case, it is '/').
The next parameter is a callback function where you define what happens
when the GET request is called. The function also has two parameters:
the request body (req), which can contain information such as the
request query string, parameters, body, and HTTP headers. While the
response object (res) contains the information you want to send*/
app.get('/', (req, res) => {
    console.log('[GET ROUTE]');
    res.send('HELLO FROM HOMEPAGE');
})

//app.get('/', (req, res));

/*We use the listen method on the app to make our application listen for incoming requests. 
The method accepts two things: the PORT, which is where we would be listening for requests from our client side 
and a callback function that will be triggered when our server is set up*/
app.listen(PORT, () => console.log(`Server running on port: http://localhost:${PORT}`));