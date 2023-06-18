const express = require('express');
const bodyparser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/RegistrationPage');
const app = express();
const port = 3000;

const RegistrationSchema = new mongoose.Schema({
  name: String,
  email: String,
  gender: String,
  age: String,
  phoneNo: String,
  address: String
});

const Registration = mongoose.model('Registration', RegistrationSchema);



app.use(express.static("views/static")); // For serving static files
app.use(express.urlencoded())

app.set('view engine', 'ejs');
app.set('views','./views');

app.get('/',(req,res)=>{
  res.status(200);
  res.render('index')
})

app.post('/',(req,res)=>{
  var details = new Registration(req.body);
    details.save().then(() => {
        res.send("Saved successfully")
    }).catch(() => {
        res.status(400).send("Item was not saved to the database")
    })
})

app.listen(port, () => {
  console.log(`Server running at http://localhost:3000/`);
});