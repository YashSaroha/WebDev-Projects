const express = require('express');
const bodyparser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/SignInUp_Page');
const app = express();
const port = 3000;

const SigninupSchema = new mongoose.Schema({
  name: String,
  email: String,
  gender: String,
  age: String,
  phoneNo: String,
  address: String
});

const SignInUp = mongoose.model('SignInUp', SigninupSchema);



app.use(express.static("views/static")); // For serving static files
app.use(express.urlencoded())

app.set('view engine', 'ejs');
app.set('views','./views');

app.get('/',(req,res)=>{
  res.status(200);
  res.render('home')
})
app.get('/signin',(req,res)=>{
  res.status(200);
  res.render('signin')
})
app.get('/signup',(req,res)=>{
  res.status(200);
  res.render('signup')
})

// app.post('/signin-form',(req,res)=>{
//   var details = new Login(req.body);
//     details.save().then(() => {
//         res.send("Saved successfully")
//     }).catch(() => {
//         res.status(400).send("Item was not saved to the database")
//     })
// })

app.post('/signup-form',(req,res)=>{
  var details = new SignInUp(req.body);
    details.save().then(() => {
        res.render('signup')
    }).catch(() => {
        res.status(400).send("Item was not saved to the database")
    })
})

app.listen(port, () => {
  console.log(`Server running at http://localhost:3000/`);
});