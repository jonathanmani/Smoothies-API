const express = require('express');
const app = express();
const cors = require('cors');
const { response } = require('express');
const PORT = 8000;
require('dotenv').config()

const MongoClient = require('mongodb').MongoClient
let db,
    dbConnectionStr = process.env.DB_STRING,
    dbName = 'Smoothies-API'

MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true })
    .then(client => {
        console.log(`Connected to ${dbName} Database`)
        db = client.db(dbName)
    })

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

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
    db.collection('smoothies').find().toArray()
    .then(data =>{
        res.render('index.ejs', {info : data})
    })
    .catch(err => console.error(err))
})

app.post('/addSmoothie', (req,res)=>{
    db.collection('smoothies').insertOne(req.body)
    .then(data => {
        console.log('Smoothie Added')
        response.redirect('/')
    })
    .catch(err => console.error(err))
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