module.exports = ADFGX;

var key; // Encryption/Decryption Alphabet Square
var text;
var mode;

/**
 * [ADFGX description]
 * @param {Array} [k=""]  [description]
 * @param {String} [t=""]  [description]
 * @param {String} [m=''] [description]
 *
 * Mode settings
 * 'e' = Encrypt
 * 'a' = Analyze
 * 'd' = Decrypt
 */
function ADFGX(k = [], t = "", m = '')
{
  //this.key = (key == []) ? this.key = this.randomKey() : k;
  this.key = k;
  this.text = t;
  this.mode = m;
}

ADFGX.prototype.testInput = function()
{
  console.log("\nKEY: " + this.key);
  console.log("TEXT " + this.text);
  console.log("MODE: " + this.mode + "\n");
}

ADFGX.prototype.doConsole = function() {

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

ADFGX.prototype.encrypt = function()
{
  var
}
