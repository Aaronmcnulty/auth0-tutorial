const { auth } = require('express-openid-connect');
const express = require('express');
const dotenv = require('dotenv')
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000; 


const config = {
  authRequired: false, 
  auth0Logout: true,
  secret: process.env.SECRET,
  baseURL: process.env.BASEURL,
  clientID: process.env.CLIENTID,
  issuerBaseURL: process.env.ISSUERBASEURL
};

// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));

// req.isAuthenticated is provided from the auth router
app.get('/', (req, res) => {
  res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
});

const { requiresAuth } = require('express-openid-connect');

app.get('/profile', requiresAuth(), (req, res) => {
  res.send(req.oidc.user);
});

app.get('/toad', requiresAuth(), (req, res) => {
  res.send('helloa');
});



app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
});