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

app.use(express.urlencoded({ extended: true }));


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

app.get('/transfer', (req, res) => {
  res.render('transfer');
});

app.post('/transfer', (req, res) => {
  const amount = req.body.amount;
  accounts[req.body.from].balance = accounts[req.body.from].balance - amount,10;
  accounts[req.body.to].balance = parseInt(accounts[req.body.to].balance) + parseInt(amount,10);
  
  const accountsJSON = JSON.stringify(accounts, null, 4);
  fs.writeFileSync(`${__dirname}/json/accounts.json`, accountsJSON, 'utf8');
  res.render('transfer', { message: "Transfer Completed" });
});

app.get('/payment', (req, res) => {
  res.render('payment', { account: accounts.credit });
});

app.post('/payment', (req, res) => {
  accounts.credit.balance = accounts.credit.balance - req.body.amount;
  accounts.credit.available = parseInt(accounts.credit.available) + parseInt(req.body.amount);

  const accountsJSON = JSON.stringify(accounts, null, 4);
  fs.writeFileSync(`${__dirname}/json/accounts.json`, accountsJSON, 'utf8');
  res.render('payment', { message: "Payment Successful", account: accounts.credit });
});


// Init server
app.listen(3000, () => {
  console.log('server listen 3000 port');
});