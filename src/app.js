const fs = require('fs');
const path = require('path');
const express = require('express');
const app = express();
const {accounts, users, writeJSON} = require('./data');
const accountRoutes = require('./routes/accounts');
const servicesRoutes = require('./routes/services');

app.set('views', `${__dirname}/views`);
app.set('view engine', 'ejs');
app.use(express.static(`${__dirname}/public`));

app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/', (req, res) => {
  res.render('index', {title: 'Account Summary', accounts: accounts});
});

app.get('/profile', (req, res) => {
  res.render('profile', {user: users[0]});
});

app.use('/account', accountRoutes);
app.use('/services', servicesRoutes);


// Init server
app.listen(3000, () => {
  console.log('server listen 3000 port');
});