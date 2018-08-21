const express = require('express');
const app = express();
const routes = require('./routes')
const cors = require("cors")

app.use(cors())

app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use('',routes)


app.listen(3000,console.log('listening to 3000 MAAAAN'))