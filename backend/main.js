const createUser = require('./route/CreateUser');
const displaydata = require('./route/DisplayData');
const OrderUser = require('./route/OrderUser')
const mongoose = require('mongoose');
const express = require('express');
const app = express();
const port = 3003;
const cors = require('cors');
const { METHODS } = require('http');
app.use(cors(
  {
    origin: ["https://my-624bbbe0j-srijans-projects-5421643c.vercel.app"],
    methods: ["POST", "GET"],
    credentials: true
  }
  
));


const mongo_URL = "mongodb+srv://srijan:121122@cluster0.grwvfmy.mongodb.net/gofoodmern?retryWrites=true&w=majority&appName=Cluster0";

mongoose
    .connect(mongo_URL)
    .then(() => {
        console.log("Mongoose Connected");
        return mongoose.connection.db.collection("food_item");
    })
    .then((collection) => {
        return collection.find({}).toArray();
    })
    .then((data) => {
        global.food_items = data;
        //console.log(global.food_items)
    })
    .then(() => {
        return mongoose.connection.db.collection("food_category");
    })
    .then((collection) => {
        return collection.find({}).toArray();
    })
    .then((data) => {
        global.food_category = data;
    })
    .catch(err => {
        console.error("Error fetching data:", err);
    });



    app.use(express.json())

app.get('/', (req, res) => {
    res.send("Hello world");
});
app.use('/api', createUser );
app.use('/api', displaydata );
app.use('/api', OrderUser );

app.get('/login', (req, res) => {
  res.json("thaifofjaewof");
});


app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`);
});