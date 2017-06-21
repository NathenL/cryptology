module.exports = ADFGX;

const Transposition = require('./transposition.js');

var key; // Encryption/Decryption Key Square
var key2; // Transposition key
var text; // Cipher or Plain text
var mode; // Selects weather to encrypt or decrypt the input

/**
 * [ADFGX description]
 * @param {Array} [k=""]  [description]
 * @param {String} [t=""]  [description]
 * @param {String} [m=''] [description]
 *
 * Mode settings
 * 'e' = Encrypt
 * 'd' = Decrypt
 */
function ADFGX(k = "", k2 = "", t = "", m = '')
{
  this.key = k.replace(/[^A-Z]/ig, "");
  this.key2 = k2.replace(/[^A-Z]/ig, "");
  this.text = t.replace(/[^A-Z]/ig, "");
  this.mode = m.replace(/[^A-Z]/ig, "");
}

/**
 * [setUpKey description]
 * @param {[type]} keyString [description]
 */
ADFGX.prototype.setUpKey = function(keyString)
{
  if (keyString.length != 25)
  {
    console.log("(" + keyString.length +
      ")The key length must be 25. Exiting...");
    return keyString;
  }
  key = keyString.match(/.{1,5}/g);
  for (var i = 0; i < 5; i++)
  {
    key[i] = key[i].toUpperCase().split('');
    if (key[i].indexOf('I') != -1)
    {
      key[i][key[i].indexOf('I')] = "J"; // Replace 'I' with 'J'
    }
  }
  return key;
}

/**
 * [testInput description]
 * @return {[type]} [description]
 */
ADFGX.prototype.testInput = function()
{
  console.log("\nKEY: " + this.key);
  console.log("TEXT " + this.text);
  console.log("MODE: " + this.mode + "\n");
}

/**
 * [doConsole description]
 * @return {[type]} [description]
 */
ADFGX.prototype.doConsole = function()
{
  console.log("ADFGX\n");
  // Key setup
  if (this.key.length != 25)
  {
    if (this.mode == 'e')
    {
      this.key = this.randomKey()
      console.log("Key not properly set, creating one for you... ".red);
    }
    else
    {
      console.log("Key not set, cannot decrypt.".red);
      process.exit();
    }
  }
  else
  {
    this.key = this.setUpKey(this.key);
  }
  //******************

  console.log("KEY: \t");
  console.log(this.key);
  console.log("KEYWORD: " + (this.key2.yellow));

  if (this.mode == 'e')
  {
    console.log('Mode: ' + "Encrypt".yellow);
    console.log("pt: " + (this.text.yellow));
    console.log("CT: " + (this.encrypt().yellow));
  }
  else if (this.mode == 'd')
  {
    console.log('Mode: ' + "Decrypt".yellow);
    console.log("CT: " + (this.text.yellow));
    console.log("pt: " + (this.decrypt().yellow));
  }

}

/**
 * Generates a random ADFGX alphabet square.
 * @return {Array}
 */
ADFGX.prototype.randomKey = function()
{
  var newAlphabet = "";
  var alphabet = "ABCDEFGHJKLMNOPQRSTUVWXYZ";

  while (alphabet.length > 0)
  {
    rand_char = alphabet.charAt(Math.floor(Math.random() * alphabet.length));
    newAlphabet += rand_char;

    // Remove letter from alphabet to prevent duplicates
    temp_alpha = alphabet.split('');
    temp_alpha.splice(temp_alpha.indexOf(rand_char), 1);
    alphabet = temp_alpha.join('');
  }

  key = newAlphabet.match(/.{1,5}/g);
  for (var i = 0; i < key.length; i++)
  {
    key[i] = key[i].split('');
  }

  return key;
}

/**
 * [encrypt description]
 * @return {[type]} [description]
 */
ADFGX.prototype.encrypt = function()
{
  split_text = this.text.split('');
  cipher = "";
  for (var i = 0; i < this.text.length; i++)
  {
    cipher += this.getEncryption(split_text[i]) + " ";
  }
  if (this.key2.length <= 1)
  {
    console.log(
      "Transposition key is not properly set. Transposition will not take place."
      .red);
  }
  else
  {
    var trans = new Transposition(this.key2, cipher, 'e');
    cipher = trans.encrypt();
  }
  return cipher;
}

/**
 * Finds the location of a letter in the key then encrypts
 * to a pair of A,D,F,G,X.
 * @param  {[type]} char [description]
 * @return {[type]}      [description]
 */
ADFGX.prototype.getEncryption = function(char)
{
  var r = 0; // Row number
  var c = 0; // Col number
  var adfgx = ['A', 'D', 'F', 'G', 'X'];

  char = (char.toUpperCase() === 'I') ? 'J' : char.toUpperCase();

  for (var i = 0; i < 5; i++)
  {
    r = i;
    c = this.key[r].indexOf(char);
    if (c != -1) break;
  }

  return adfgx[r] + adfgx[c];
}

/**
 * Decrypt ADFGX cipher. Must know key square and keyword
 * @return {String} Plain Text
 */
ADFGX.prototype.decrypt = function()
{
  // Remove transposition
  var trans = new Transposition();
  var CT = trans.decryptByKey(this.key2, this.text);
  var pt = "";
  var adfgx = ['A', 'D', 'F', 'G', 'X'];

  while (CT.length > 0)
  {
    var temp = CT.substring(0, 2);
    CT = CT.substring(2, CT.length);
    pt += this.key[adfgx.indexOf(temp[0])][adfgx.indexOf(temp[1])];
  }

  return pt.toLowerCase();
}
