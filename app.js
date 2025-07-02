const express = require('express');
const dotenv = require('dotenv')
const passport = require('passport');
const Auth0Strategy = require('passport-auth0');
const session = require('express-session');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000; 


const strategy = new Auth0Strategy(
  {
    domain: process.env.AUTH0_DOMAIN,
    clientID: process.env.AUTH0_CLIENT_ID,
    clientSecret: process.env.AUTH0_CLIENT_SECRET,
    callbackURL: process.env.AUTH0_CALLBACK_URL,
  },
  (accessToken, refreshToken, extraParams, profile, done) => {
    return done(null, profile);
  }
);
passport.use(strategy);
passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());


app.get('/', (req, res) => {
    res.send('Welcome to Node.js Auth0 Authenticaton!');
});

app.get(
  '/login',
  passport.authenticate('auth0', {
    scope: 'openid email profile',
  })
);


app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
});