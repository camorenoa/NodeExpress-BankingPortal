const fs = require('fs');
const path = require('path');
const express = require('express');
const app = express();

const accountData = fs.readFileSync('src/json/accounts.json', 'utf8');
const accounts = JSON.parse(accountData);
const userData = fs.readFileSync('src/json/users.json', 'utf8');
const users = JSON.parse(userData);

app.set('views', `${__dirname}/views`);
app.set('view engine', 'ejs');
app.use(express.static(`${__dirname}/public`));

// Routes
app.get('/', (req, res) => {
  res.render('index', {title: 'Account Summary', accounts: accounts});
});

app.get('/savings', (req, res) => {
  res.render('account', {account: accounts.savings});
});

app.get('/checking', (req, res) => {
  res.render('account', {account: accounts.checking});
});

app.get('/credit', (req, res) => {
  res.render('account', {account: accounts.credit});
});

app.get('/profile', (req, res) => {
  res.render('profile', {user: users[0]});
});

app.listen(3000, () => {
  console.log('server listen 3000 port');
});