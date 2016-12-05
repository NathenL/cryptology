module.exports = SimpleSub;

var key; // Encryption/Decryption Alphabet
var text;
var mode;

/**
 * Simple Substitution Cipher class
 * @param {String} [k=""]  Cipher Key
 * @param {String} [t=""]  Plain-Text or Cipher-Text
 * @param {String} [m='a'] Mode, defualts to Analyze
 *
 * Mode settings
 * 'e' = Encrypt
 * 'a' = Analyze
 * 'd' = Decrypt
 */
function SimpleSub(k = "",t = "",m = 'a'){
  this.key = k;
  this.text = t;
  this.mode = m;
}

SimpleSub.prototype.testInput = function(){
  console.log("\nKEY: "+this.key);
  console.log("TEXT "+this.text);
  console.log("MODE: "+this.mode+"\n");
}

/**
 * Used only when running the Cryptology program via the console
 */
SimpleSub.prototype.doConsole = function(){
  console.log('Simple Substitution...');

  if (!this.key && (this.mode == 'd'))
  {
    console.log('No Key supplied, analyzing instead.');
    this.mode == 'a';
  }

  if (this.mode == 'e')
  {
    console.log('Method: ' + 'Encryption'.yellow);
    if (!this.key)
    {
      console.log('(ERROR) You must supply a Substitution Alphabet as a KEY.'
        .red);
    }
    else
    {
      //"QRCEJLAUDOXWFKVTIZNGMHPYBS"
      console.log("Substitution Alphabet: " + this.key.toUpperCase().yellow);
      console.log("Plain-Text:  \"" + this.text.yellow +
        "\"");
      var CT = this.encrypt(key, text); //Encrypt
      console.log("Cipher-Text: \"" + CT.yellow + "\"");
    }
  }
  // Need to finish
  else if (this.mode == 'd')
  {
    console.log('- Decryption'.yellow);
  }
  else if (this.mode == 'a')
  {
    console.log('Method: ' + 'Frequency Analysis'.yellow);
    var data = this.analyze(text);

    for (var i = 0; i < 26; i++)
    {
      letter = String.fromCharCode(97 + i);
      count = data[letter];

      console.log(letter + "-".yellow + Array(count + 1).join("_".bgYellow.black) +
        " " + count);
    }
  }
}

/**
 * Simple Substitution Encryption
 * Converts letters in the plain-text to a corresponding letter in the key.
 * @return {String}  Returns Cipher-Text
 */
SimpleSub.prototype.encrypt = function(){
    key = this.key.toLowerCase();
    text = this.text.toLowerCase().split('');

    var cipherbet = key.split('');
    if (cipherbet.length == 26) {

      var cipher = "";
      text.forEach(function(letter, index) {
        if (letter.charCodeAt(0) < 97) {
          cipher += letter;
        } else {
          cipher += cipherbet[letter.charCodeAt(0) - 97];
        }
      });
      return cipher.toUpperCase();
    } else {
      console.log("(ERROR) Substitution `Alpha`bet is not 26 characters in length!"
        .red);
      return -1;
    }
}

/**
 * Analyzes the Cipher-Text's letter frequencies.
 * @return {array}  Object with frequency of each letter.
 */
SimpleSub.prototype.analyze = function(){
    cipher_text = this.text.toLowerCase();
    letter_count = [];

    for (var i = 0; i < 26; i++) {
      var count = (cipher_text.match(new RegExp(String.fromCharCode(97 + i), "g")) || [])
        .length;
      var letter = String.fromCharCode(97 + i);
      //console.log(letter + " = " + count + "  " + Array(count+1).join("_".bgYellow.black));
      letter_count[letter] = count;
    }

    return letter_count;
}

// exports.encrypt = (a, t) => encrypt(a, t);
//
// //Key must be a Substitution Alphabet
// function encrypt(alpha, text) {
//   alpha = alpha.toLowerCase();
//   text = text.toLowerCase().split('');
//
//   var cipherbet = alpha.split('');
//   if (cipherbet.length == 26) {
//
//     var cipher = "";
//     text.forEach(function(letter, index) {
//       if (letter.charCodeAt(0) < 97) {
//         cipher += letter;
//       } else {
//         cipher += cipherbet[letter.charCodeAt(0) - 97];
//       }
//     });
//     return cipher.toUpperCase();
//   } else {
//     console.log("(ERROR) Substitution Alphabet is not 26 characters in length!"
//       .red);
//     return -1;
//   }
// }
//
// exports.analyze = (c) => analyze(c);
//
// function analyze(cipher_text) {
//   cipher_text = cipher_text.toLowerCase();
//   letter_count = [];
//
//   for (var i = 0; i < 26; i++) {
//     var count = (cipher_text.match(new RegExp(String.fromCharCode(97 + i), "g")) || [])
//       .length;
//     var letter = String.fromCharCode(97 + i);
//     //console.log(letter + " = " + count + "  " + Array(count+1).join("_".bgYellow.black));
//     letter_count[letter] = count;
//   }
//
//   return letter_count;
// }
