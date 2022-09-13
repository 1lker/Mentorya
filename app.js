require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;

const findOrCreate = require('mongoose-findorcreate');

const app = express();
app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect("mongodb://localhost:27017/UserAllDB", {
  useNewUrlParser: true
});


const articleSchema = new mongoose.Schema({
  blogId: Number,
  blogPhoto: String,
  blogCategory: Number,
  blogAuthor: Number,
  blogTitle: String,
  blogShortDescription: String,
  blogContent: String,
  blogDate: String,
  blogUrl: String
});

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  googleId: String,
  facebookId: String,

});

userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate);


const User = new mongoose.model("User", userSchema);
const Article = mongoose.model("Article", articleSchema);

passport.use(User.createStrategy());

passport.serializeUser(function(user, cb) {
  process.nextTick(function() {
    cb(null, {
      id: user.id,
      username: user.username
    });
  });
});

passport.deserializeUser(function(user, cb) {
  process.nextTick(function() {
    return cb(null, user);
  });
});

// // -------GOOGLE STRATEGY--------
// passport.use(new GoogleStrategy({
//     clientID: process.env.CLIENT_ID,
//     clientSecret: process.env.CLIENT_SECRET,
//     callbackURL: "http://localhost:3000/auth/google/-----"
//   },
//   function(accessToken, refreshToken, profile, cb) {
//     console.log(profile);
//
//     User.findOrCreate({
//       googleId: profile.id
//     }, function(err, user) {
//       return cb(err, user);
//     });
//   }
// ));

// // -------FACEBOOK STRATEGY--------
// passport.use(new FacebookStrategy({
//     clientID: process.env.FACEBOOK_APP_ID,
//     clientSecret: process.env.FACEBOOK_APP_SECRET,
//     callbackURL: "http://localhost:3000/auth/facebook/-----",
//     enableProof: true
//   },
//   function(accessToken, refreshToken, profile, cb) {
//     console.log(profile);
//
//     User.findOrCreate({
//       facebookId: profile.id
//     }, function(err, user) {
//       return cb(err, user);
//     });
//   }
// ));


app.get("/", function(req, res) {
  res.render("home");
});

app.get("/SSS", function(req, res) {
  res.render("sss");
});

app.get("/yks", function(req, res) {
  res.render("yks");
});

app.get("/ekibimize-katil", function(req, res) {
  res.render("joinTeam");
});

app.get("/biz-kimiz", function(req, res) {
  res.render("aboutUs");
});

app.get("/iletisim", function(req, res) {
  res.render("contactUs");
});

app.get("/blog", function(req, res) {
  res.render("blog");

})

app.post("/blog", function(req, res) {

})


app.listen(3000, function() {
  console.log("Server started on port 3000.");
});
