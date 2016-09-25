var cipher = require('commander');
var colors = require('colors');
const simple = require('./cipher_logic/simple_sub.js');
const multi = require('./cipher_logic/multiplicative.js');

console.log("------------------".blue.bgGreen);
console.log("Cryptology Tool   ".blue.bgGreen);
console.log("By: Nathen Lyman  ".blue.bgGreen);
console.log("------------------\n\n".blue.bgGreen);


cipher
  .version('0.0.1')
  .option('-D, --Decrypt', 'Decrypt a Cipher. Depends on chosen Cipher Type.')
  .option('-E, --Encrypt',
    'Encrypt a Cipher. Depends on chosen Cipher Type. (Requires --key)')
  .option('-A, --Analyze', 'Analyze a Cipher. Depends on chosen Cipher Type.')
  .option('-s, --simple_substitution [value]', 'Simple Substitution')
  .option('-F, --Frequency_analyze [value]', 'Analyze letter frequency.')
  .option('-m, --multiplicative [value]', 'Multiplicative Cipher')
  .option('-a, --affine [value]', 'Affine Cipher')
  //.option('-k, --keyword [value]', 'Keyword Cipher')
  .option('-K, --Key [value]', 'Cipher Key')
  .option('-p, --playfair [value]', 'Playfair Cipher')
  .option('-H, --Hill [value]', 'Hill Cipher')
  .option('-v, --vigenere [value]', 'Vigenere Cipher')
  .parse(process.argv);

var E = cipher.Encrypt;
var D = cipher.Decrypt;
var A = cipher.Analyze;

if ((E && !D && !A) || (!E && D && !A) || (!E && !D && A))
{
  // Simple Substitution
  if (cipher.simple_substitution)
  {
    console.log('Simple Substitution...');

    if (!cipher.Key && cipher.Decrypt)
    {
      console.log('No Key supplied, analyzing instead.');
      cipher.Decrypt = false;
      cipher.Analyze = true;
    }

    if (cipher.Encrypt)
    {
      console.log('Method: ' + 'Encryption'.yellow);
      if (!cipher.Key)
      {
        console.log('(ERROR) You must supply a Substitution Alphabet as a KEY.'
          .red);
      }
      else
      {
        //"QRCEJLAUDOXWFKVTIZNGMHPYBS"
        console.log("Substitution Alphabet: " + cipher.Key.toUpperCase().yellow);
        console.log("Plain-Text:  \"" + cipher.simple_substitution.yellow +
          "\"");
        var CT = simple.encrypt(cipher.Key, cipher.simple_substitution); //Encrypt
        console.log("Cipher-Text: \"" + CT.yellow + "\"");
      }
    }
    // Need to finish
    else if (cipher.Decrypt)
    {
      console.log('- Decryption'.yellow);
    }
    else if (cipher.Analyze)
    {
      console.log('Method: ' + 'Frequency Analysis'.yellow);
      var data = simple.analyze(cipher.simple_substitution);

      for (var i = 0; i < 26; i++)
      {
        letter = String.fromCharCode(97 + i);
        count = data[letter];

        console.log(letter + "-".yellow + Array(count + 1).join("_".bgYellow.black) +
          " " + count);
      }
    }

  }
  // --------------

  if (cipher.multiplicative)
  {
    console.log('Multiplicative...');
    if (cipher.Encrypt)
    {
      console.log('Method: ' + 'Encryption'.yellow);
      if (!cipher.Key || [1, 3, 5, 7, 9, 11, 15, 17, 19, 21, 23, 25].indexOf(
          cipher.Key % 26) == -1)
      {
        console.log(
          '(ERROR) You must supply a valid multiplicative Key, MOD 26 (1,3,5,7,9,11,15,17,19,21,23,25).'
          .red);
      }
      else
      {
        console.log("Key: " + cipher.Key.yellow);
        console.log("Plain-Text:  \"" + cipher.multiplicative.yellow + "\"");
        var CT = multi.encrypt(cipher.Key, cipher.multiplicative);
        console.log("Cipher-Text: \"" + CT.yellow + "\"");
      }
    }
    if (cipher.Decrypt)
    {
      console.log('Method: ' + 'Decryption'.yellow);
      console.log("Key: " + ((cipher.Key) ? cipher.Key.yellow : "N/A".yellow));
      console.log("Cipher-Text:  \"" + cipher.multiplicative.toUpperCase().yellow +
        "\"");
      var pt = multi.decrypt(cipher.Key, cipher.multiplicative);
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
  }
}
else
{
  console.log(
    '(ERROR) Please choose only to either --Encrypt, --Decrypt, or --Analyze.'
    .red
  );
}
console.log("\n\n------- END ------".blue.bgGreen);
//END
