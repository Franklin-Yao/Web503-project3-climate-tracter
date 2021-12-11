const express = require('express')
const app = express()
const bodyParser = require('body-parser')
app.use(bodyParser.json())
require('./app/models/inventory.model')

require('dotenv').config();
const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection.on('open', ()=>{
    console.log('Mongoose connection open');
})
.on('error', (err)=>{
    console.log(`Connnection error: ${err.message}`);
});

require('./app/routes/inventory.router')(app);
const server = app.listen(8000, function(){
    const host = server.address().address
    const port = server.address().port
    console.log("App listening at http://%s:%s", host, port)
})