require('dotenv').config({ path: './config.env' });
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose')
const app = express();
const axios = require('axios').default

const userRoute = require('./routes/user');
const compilerRoute = require('./routes/compiler');

const corsOptions = {
  origin: ['https://codesmith-online.netlify.app'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], 
  allowedHeaders: ['Content-Type', 'Authorization'],   
  credentials: true,                                
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); 


app.use(express.json())

app.use('/users', userRoute)
app.use('/compiler', compilerRoute)

app.get('/', (req,res)=>{
  res.end('hello from server');
});

app.post('/execute', (req, res) =>{
let reqObj = req.body
reqObj['clientId'	] = process.env.CLIENT_ID;
reqObj['clientSecret'] = process.env.CLIENT_SECRET;

axios.post('https://api.jdoodle.com/v1/execute', reqObj).then((resp)=>{
  res.json({error: false, response: resp.data})
})
})

mongoose.connect(process.env.MONGO_URI).then(()=>{
  console.log('connected to db');
})

app.listen(process.env.PORT, ()=> {
  console.log("server is working")
})