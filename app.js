const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const methodOverride = require('method-override');
const engine = require('ejs-mate');
const flash = require('connect-flash');

const User = require('./models/user');

const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/carDB')
.then(()=> console.log("DB Connected"));

app.engine('ejs', engine);
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

app.use(session({
  secret: 'secretkey',
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(
  { usernameField: 'username', passwordField: 'password' },
  async (username, password, done) => {
    const user = await User.findOne({ owner: username });
    console.log("Found user:", user);
    console.log("Password match:", user?.licence === password);
    if (!user) return done(null, false);
    if (user.licence !== password) return done(null, false);
    return done(null, user);
  }
));

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
});

app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  next();
});

app.use(flash());

app.use((req, res, next) => {
  res.locals.success = req.flash('success');
  res.locals.error = req.flash('error');
  next();
});

const userRoutes = require('./routes/userRoutes');
const carRoutes = require('./routes/carRoutes');

app.use(userRoutes);
app.use(carRoutes);

app.listen(5050, () => {
  console.log("Server running on port 5050");
});