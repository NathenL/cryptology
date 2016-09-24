exports.encrypt = (a, t) => encrypt(a, t);

//Key must be a Substitution Alphabet
function encrypt(alpha, text) {
  alpha = alpha.toLowerCase();
  text = text.toLowerCase().split('');

  var cipherbet = alpha.split('');
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
    console.log("(ERROR) Substitution Alphabet is not 26 characters in length!"
      .red);
    return -1;
  }
}

exports.analyze = (c) => analyze(c);

function analyze(cipher_text) {
  cipher_text = cipher_text.toLowerCase();
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
