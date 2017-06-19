const path = require('path')

const express = require('express')
const volleyball = require('volleyball')
const bodyParser = require('body-parser')
app.set('port', (process.env.PORT || 3000))

const app = express()
app.use(volleyball)
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, '../public')));




app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.use(function (err, req, res, next) {
  console.error(err);
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || 'Internal server error.');
});

app.listen(app.get('port'), function() {console.log('We are zooming!')})