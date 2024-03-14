const express = require("express")
const cors = require('cors');
const app= express();
const bodyParser = require('body-parser');
const path = require('path')
const Port= process.env.PORT || 5111;
const DB_URL= process.env.DBURL ;
const DB_Conn = require('./src/config/DB_Conn')
require('dotenv').config()


app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(cors({ origin: true, credentials: true }));

const swaggerUI = require('swagger-ui-express');
const YAML = require("yamljs");

app.set('view engine', 'ejs');

const swaggerDocument = YAML.load(path.join(__dirname, '/swagger.yaml'));
app.use('/sgr', swaggerUI.serve, swaggerUI.setup(swaggerDocument));


app.get('/',(req,res,next)=>{
    try {
        res.status(200).render(path.join(__dirname, 'home.ejs'));
    } catch (error) {
        console.log(error);
    }
})

app.use('/user',require('./src/Routes/user.route'));
app.use('/post',require('./src/Routes/blogPost.route'));


app.listen(Port,()=>{
    try {
        DB_Conn.Connect_DB(DB_URL);
        console.log(`Server is running on : http://localhost:${Port}`);
    } catch (error) {
        console.log(error);
    }
})
