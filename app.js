const express = require("express");
const app = express();
const mongoose = require("mongoose");
const mongoose_url = "mongodb://127.0.0.1:27017/wonderlust";
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const session = require("express-session");
const listingsRouter = require("./routes/listing.js")
const reviewsRouter = require("./routes/review.js")
const userRouter = require("./routes/user.js");
const flash = require("connect-flash");
const passport = require("passport");
const localStrategy = require("passport-local");
const User = require("./models/user.js");

main()
  .then(() => {
    console.log("connected to db");
  })
  .catch((err) => {
    console.log(err);
  });

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "public")));
async function main() {
  await mongoose.connect(mongoose_url);
}

const sessionOptions = {
  secret: "mysupersecretcode",
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() + 7 * 24 * 60 * 60 *1000,
    maxAge: 7 * 24 * 60 * 60 *1000 ,
    httpOnly : true
  },
};
app.get("/", (req, res) => {
  res.send("server airbnb working");
});

app.use(session(sessionOptions));
app.use(flash());


app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use ((req,res,next)=>{
  res.locals.success = req.flash("success");
  next();
})

app.use("/listing", listingsRouter)
app.use("/listing/:id/review", reviewsRouter)
app.use("/",userRouter);




// app.use((err, req, res, next) => {
//   res.send("something went wrong");
// });
app.listen(8080, () => {
  console.log(`listening on port: 8080`);
});
