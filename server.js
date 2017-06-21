/**
 * @author Nathen Lyman
 * @version 0.0.1
 * Main server file for Cryptology
 */

var express = require('express');
var app = express();
var path = require('path');

app.get('/', function(req, res)
{
  res.render('index',
  {
    title: 'Hey',
    message: 'Hello there!'
  });
});

app.use('/t1', express.static('public/templates/text_page'));
app.use('/t2', express.static('public/templates/article'));
app.use('/c1', express.static('public/ciphers/simple_sub.html'));
app.use('/adfgx', express.static('public/ciphers/adfgx.html'));

app.post('/test-page', function(req, res)
{
  var name = req.body.name,
    color = req.body.color;
});

app.listen(3000, function()
{
  console.log('Listening on port 3000 ...');
});