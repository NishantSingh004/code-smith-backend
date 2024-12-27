require('dotenv').config({ path: './config.env' });
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose')
const app = express();
const axois = require('axios').default

const userRoute = require('./routes/user');
const compilerRoute = require('./routes/compiler');


app.use(cors())
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

axois.post('https://api.jdoodle.com/v1/execute', reqObj).then((resp)=>{
  res.json({error: false, response: resp.data})
}).catch((err)=>{
  console.log(err)
})
})

mongoose.connect(process.env.MONGO_URI).then(()=>{
  console.log('connected to db');
}).catch((err)=>{
  console.log(err);
});

app.listen(process.env.PORT, ()=> {
  console.log("server is working")
})