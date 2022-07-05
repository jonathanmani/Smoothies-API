const express = require('express');
const app = express();
const cors = require('cors');
const PORT = 8000;

app.use(cors());

app.listen(process.env.PORT || PORT, ()=>{
    console.log(`Sucess: Running on port ${PORT}`)
})