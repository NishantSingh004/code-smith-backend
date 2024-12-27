const mongoose = require('mongoose')

const compilerSchema = new mongoose.Schema({
  code : { type: String, default:''},
  language : {type: String, default:''},
  name: {type: String},
  compilerid: {type: String, required:true},
  userid: {type: String, required: true}
});

module.exports = mongoose.model('compiler', compilerSchema);