import express from 'express';
import cors from 'cors';
import { MongoClient, ServerApiVersion } from 'mongodb';


const app = express();

app.use(express.json());
app.use(cors());

app.post('/login', (req, res) => {
    const {email, password} = req.body;

    const uri = "mongodb+srv://csebifamily:TewhWusR3TcXD5lG@cluster0.fe6n6dw.mongodb.net/?retryWrites=true&w=majority";    
    // Create a MongoClient with a MongoClientOptions object to set the Stable API version
    const client = new MongoClient(uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      }
    });
    
    async function run() {
      try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();
        // Send a ping to confirm a successful connection
        const collection = client.db("face_2").collection("test");
        const result = await collection.insertOne({email, password});        
        res.send('ok');
    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
      }
    }
    run().catch(console.dir);


})


app.listen(5000, () => {
    console.log('Sikeres csatlakozás!');
});