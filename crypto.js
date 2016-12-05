var cipher = require('commander');
var colors = require('colors');
const Simple = require('./cipher_logic/simple_sub.js');
const Multi = require('./cipher_logic/multiplicative.js');

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
  .option('-B, -Brute_Force', 'Brute for a cipher if allowed.')
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
var B = cipher.Brute_Force;

if ((E && !D && !A) || (!E && D && !A) || (!E && !D && A))
{
  var mode = (E && !D && !A) ? 'e' : ((!E && D && !A) ? 'd' : 'a');

  // Simple Substitution
  if (cipher.simple_substitution)
  {
    var simple = new Simple(cipher.Key,cipher.simple_substitution,mode);
    simple.doConsole();
  }
  // --------------

  if (cipher.multiplicative)
  {
    if (cipher.Brute_Force){
      mode = 'b';
    }
    var multi = new Multi(cipher.Key,cipher.multiplicative,mode);
    multi.doConsole();
    //multi.testInput();
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
