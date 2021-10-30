const express = require('express')
const app = express();
const cors = require('cors')
const ObjectId = require('mongodb').ObjectId
const port = process.env.PORT || 5000 
require('dotenv').config()

// middlewere 
app.use(cors())
app.use(express.json())


const { MongoClient } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.zgsbz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
async function run() {
    try {
      await client.connect();
      
      const database = client.db("TravelsWorld");
      const travelCollections = database.collection("travelservices");
      const servicesCollection = database.collection("travelPackages");
      const addBooking = database.collection("addBooking");


        // get services 
      app.get('/services' , async (req , res)=>{
        const cursor =  servicesCollection.find({})
        const result = await cursor.toArray()
        res.send(result)
      })

    //   get advantages 
      app.get('/advantages' , async (req , res)=>{
        const cursor =  travelCollections.find({})
        const result = await cursor.toArray()
        res.send(result)
      })

      // post addbooking 
      app.post('/addbooking', async(req , res )=>{
        console.log(req.body)
        const cursor =  addBooking.insertOne(req.body)
        const result = await cursor.toArray()
        res.send(result)
       
      })
      app.get('/addbooking', async(req , res )=>{
        const cursor =  addBooking.find()
        const result = await cursor.toArray()
        res.send(result)
       
      })

      app.delete("/deletebooking/:id", async (req, res) => {
        console.log(req.params.id);
        const result = await addBooking.deleteOne({
          _id: ObjectId(req.params.id),
        });
        res.send(result);
      });
     
      
    } finally {
    //   await client.close();
    }
  }
  run().catch(console.dir);




app.get('/' , (req , res)=>{
    res.send('Server is running')
})
app.listen(port , ()=>{
    console.log('port is running ', port)
})