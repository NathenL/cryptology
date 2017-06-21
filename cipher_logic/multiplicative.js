module.exports = Multiplicative;

var key; // Encryption/Decryption Alphabet
var text;
var mode;

/**
 * [Multiplicative description]
 * @param {String} [k=""]  Cipher Key
 * @param {String} [t=""]  Plain-Text or Cipher-Text
 * @param {String} [m='b'] Mode, defualts to Brute Force
 *
 * Mode settings
 * 'e' = Encrypt
 * 'a' = Analyze
 * 'd' = Decrypt
 * 'b' = Brute Force
 */
function Multiplicative(k = "", t = "", m = 'b')
{
  this.key = k;
  this.text = t;
  this.mode = m;
}

Multiplicative.prototype.testInput = function()
{
  console.log("\nKEY: " + this.key);
  console.log("TEXT " + this.text);
  console.log("MODE: " + this.mode + "\n");
}

/**
 * Used only when running the Cryptology program via the console
 */
Multiplicative.prototype.doConsole = function()
{
  console.log('Multiplicative...');
  if (this.mode == 'e')
  {
    console.log('Method: ' + 'Encryption'.yellow);
    if (!this.key || [1, 3, 5, 7, 9, 11, 15, 17, 19, 21, 23, 25].indexOf(
        this.key % 26) == -1)
    {
      console.log(
        '(ERROR) You must supply a valid multiplicative Key, MOD 26 (1,3,5,7,9,11,15,17,19,21,23,25).'
        .red);
    }
    else
    {
      console.log("Key: " + this.key.yellow);
      console.log("Plain-Text:  \"" + this.text.yellow + "\"");
      var CT = this.encrypt();
      console.log("Cipher-Text: \"" + CT.yellow + "\"");
    }
  }
  if (this.mode == 'd')
  {
    console.log('Method: ' + 'Decryption'.yellow);
    console.log("Key: " + ((this.key) ? this.key.yellow : "N/A".yellow));
    console.log("Cipher-Text:  \"" + this.text.toUpperCase().yellow +
      "\"");
    var pt = this.decrypt();
    if (pt instanceof Array)
    {
      console.log("Plain-Texts:");
      pt.forEach(function(text, index)
      {
        console.log("" + text.yellow + "\n");
      });
    }
    else
    {
      console.log("Plain-Text: \"" + pt.yellow + "\"");
    }
  }
  if (this.mode == 'b')
  {
    // BRUTE FORCE
  }
}

/**
 * [encrypt description]
 * @return {[type]} [description]
 */
Multiplicative.prototype.encrypt = function()
{
  text = this.text.toLowerCase().split('');

  var cipher = "";
  var key = this.key;
  text.forEach(function(letter, index)
  {
    if (letter.charCodeAt(0) < 96)
    {
      cipher += letter;
    }
    else
    {
      // 98 instead of 97 so a = 1 not 0
      num = (((letter.charCodeAt(0) - 96) * key) % 26);
      console.log(num);
      if (num == 0)
      {
        cipher += 'z';
      }
      else
      {
        cipher += String.fromCharCode(96 + num);
      }
    }
  });
  return cipher.toUpperCase();
}

/**
 * [decrypt description]
 * @return {[type]} [description]
 */
Multiplicative.prototype.decrypt = function()
{

  var inverse = [1, 9, 21, 15, 3, 19, 7, 23, 11, 5, 17, 25];
  cipher = this.text.toLowerCase().split('');

  if (!this.key > 0 || inverse.indexOf(Number(this.key)) == -1)
  {
    console.log("No valid inverse key provided, useing brute force...");
    return this.brute();
  }

  else
  {
    var text = "";
    var key = this.key;

    cipher.forEach(function(letter, index)
    {
      //console.log("TEXT: "+index+text);

      if (letter.charCodeAt(0) < 96)
      {
        text += letter;
      }
      else
      {
        num = ((letter.charCodeAt(0) - 96) * key) % 26;
        if (num == 0)
        {
          text += 'z';
        }
        else
        {
          text += String.fromCharCode(96 + num);
        }

      }
    });
    return text;
  }
}

/**
 * [brute description]
 * @return {[type]} [description]
 */
Multiplicative.prototype.brute = function()
{
  var inverse = [1, 9, 21, 15, 3, 19, 7, 23, 11, 5, 17, 25];
  var brute = [];

  inverse.forEach(function(inverse, index)
  {
    text = "Inverse " + inverse + ": \n";
    cipher.forEach(function(letter, index)
    {
      if (letter.charCodeAt(0) < 97)
      {
        text += letter;
      }
      else
      {
        num = ((letter.charCodeAt(0) - 96) * inverse) % 26;
        if (num == 0)
        {
          text += 'z';
        }
        else
        {
          text += String.fromCharCode(96 + num);
        }
      }
    });
    brute.push(text.toLowerCase());
  });
  return brute;
}
