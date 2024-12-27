const express = require('express');
const router = express.Router();
const compilerModel = require('../models/compiler');
const {v4:uuidv4} =  require('uuid');

/*
fiddles/:fiddleid - GET
fiddles/user/:userid - GET
fiddles/ - POST
fiddles/ - PUT
fiddles/:fiddleid - DELETE
*/

router.get('/:compilerid',(req,res)=>{
  compilerModel.findOne({compilerid: req.params.compilerid}).then((doc)=>{
        res.json({error:false, response: doc});
    }).catch((err)=>{
        console.log(err);
    })
});

router.get('/user/:userid',(req,res)=>{
  compilerModel.find({userid: req.params.userid}).then((docs)=>{
        res.json({error:false, response:docs});
    }).catch((err)=>{
        console.log(err);
    })
})

router.post('/', (req,res)=>{
    let compilerObj = req.body;
    compilerObj['compilerid'] = uuidv4();
    let newCompiler = new compilerModel(compilerObj);
    newCompiler.save().then((doc)=>{
        res.json({error:false, response: doc});
    }).catch((err)=>{
        console.log(err);
    })
})

router.put('/', (req,res)=>{
  compilerModel.updateOne({compilerid: req.body.compilerid}, req.body).then((_)=>{
        res.json({error:false});
    }).catch((err)=>{
        console.log(err);
    })
})

router.delete('/:compilerid',(req,res)=>{
  compilerModel.deleteOne({compilerid: req.params.compilerid}).then((_)=>{
        res.json({error:false});
    }).catch((err)=>{
        console.log(err);
    })
})

module.exports = router;
