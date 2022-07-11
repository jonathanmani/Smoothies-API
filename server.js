const express = require('express');
const app = express();
const cors = require('cors');
const PORT = 8000;
require('dotenv').config()

const MongoClient = require('mongodb').MongoClient
let db,
    dbConnectionString = process.env.DB_STRING,
    dbName = 'Smoothies API'

MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true })
    .then(client => {
        console.log(`Connected to ${dbName} Database`)
        db = client.db(dbName)
    })

app.use(cors());

const smoothie = {
    "banana" : {
        "liquid": "1 cup unsweetened vanilla almond milk",
        "protein": "1 scoop chocolate whey protein",
        "fruit": "1 banana",
        "spread": "1 tsp almond or peanut butter",
        "carbs": "2 tbsp oats",
        "fats": "2 tsp ground flax",
        "extra": "1 tsp cocoa powder, 1/2 cup baby spinach" 
    },
    "berry" : {
        "liquid": "1 cup unsweetened vanilla almond milk",
        "protein": "3/4 cup Greek Yogurt",
        "fruit": "3/4 cup frozen berries",
        "spread": "none",
        "carbs": "2 tbsp oats",
        "fats": "1 tsp ground flax",
        "extra": "Dash of cinnamon, 1 cup baby spinach" 
    },
    "green":{
        "liquid": "1 cup unsweetened vanilla almond milk",
        "protein": "1 scoop whey protein",
        "fruit": "1 apple chopped, 1/4 cucumber",
        "spread": "1 tbsp of almond butter",
        "carbs": "none",
        "fats": "none",
        "extra": "1 tsp ground ginger, 1 tsp ground cinnamon, 1 cup baby spinach"
    },
    "unknown": {
        "liquid": "N/A",
        "protein": "N/A",
        "fruit": "N/A",
        "spread": "N/A",
        "carbs": "N/A",
        "fats": "N/A",
        "extra": "N/A"
    }
}

app.get('/', (req,res)=>{
    res.sendFile(__dirname + '/index.html')
})

app.get('/api', (req,res)=>{
    res.json(smoothie)
})

app.get('/api/:name', (req,res)=>{
    const smoothieName = req.params.name.toLowerCase();

    if (smoothie[smoothieName]){
        res.json(smoothie[smoothieName])
    } else {
        res.json(smoothie['unknown'])
    }

})

app.listen(process.env.PORT || PORT, ()=>{
    console.log(`Sucess: Running on port ${PORT}`)
})