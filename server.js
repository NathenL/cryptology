/**
 * @author Nathen Lyman
 * @version 0.0.1
 * Main server file for Cryptology
 */

var express = require('express');
var app = express();
var path = require('path');

var PORT = 3000;

app.use('/', express.static(path.join(__dirname, 'public')));

app.use('/t1',express.static('public/templates/text_page'));
app.use('/t2',express.static('public/templates/article'));
app.use('/c1',express.static('public/cipher_logic/simple_sub.html'));

app.post('/test-page', function(req, res) {
    var name = req.body.name,
        color = req.body.color;
});


app.listen(PORT, function () {
  console.log('Verre Webpage - listening on port: ', PORT);
});