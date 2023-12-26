const express = require("express")
const mongoose = require("mongoose")
const mongoDB = require("./db")

const app = express();
app.use(express.json())
const PORT = 5551;

const cors = require('cors');
app.use(cors());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", 'http://localhost:3000');
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
})


app.use('/api', require('./routes/CreateUser'));
app.use('/api', require('./routes/DisplayData'));
app.use('/api', require('./routes/OrderData'));


app.get('/', (request, response) => {
  // console.log(request)
  return response.status(201).send('Welcome to MERN Stack.')
})


mongoose.connect(mongoDB)
  .then(() => {
    console.log('App connected to database.')

    const fetched_item = mongoose.connection.collection("food_items");
    const fetched_data = mongoose.connection.collection("food_categories");
    const fetchData = async () => {
      try {
        const Result = await fetched_item.find({}).toArray();
        const catResult = await fetched_data.find({}).toArray();
        global.food_items = Result
        global.food_categories = catResult
        // console.log(global.food_items);
      } catch (error) {
        console.error('Error during find:', error);
      }
    };
    fetchData();
    app.listen(PORT, () => {
      console.log(`App is listening to the port: ${PORT}`)
    })
  })
  .catch((error) => {
    console.log(error)
  })
