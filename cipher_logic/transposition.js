module.exports = Transposition;

var key;
var text;
var mode;

/**
 *
 * @param {Array} [k=""]  [description]
 * @param {String} [t=""]  [description]
 * @param {String} [m=''] [description]
 *
 * Mode settings
 * 'e' = Encrypt
 * 'a' = Analyze
 * 'd' = Decrypt
 */
function Transposition(k = "", t = "", m = '')
{
  // Also removes duplicate letters
  this.key = k.toUpperCase().replace(/\W+/ig, "").split('').reverse().join(
    '').replace(/(.)(?=.*\1)/g, "").split('').reverse().join('');
  this.text = t.replace(/[^A-Z]/ig, "");
  this.mode = m.replace(/[^A-Z]/ig, "");
}

Transposition.prototype.encrypt = function()
{
  console.log(this.text);
  temp_text = this.text.match(new RegExp('.{1,' + this.key.length + '}', 'g'));
  in_order = this.key.split('').sort();
  cipher = "";

  for (var i = 0; i < this.key.length; i++)
  {
    index = this.key.indexOf(in_order[i]);
    console.log(index + " | "+in_order[i]+ " | "+temp_text);

    for (var j = 0; j < temp_text.length; j++)
    {
      if (temp_text[j][index] != null)
      {
        cipher += temp_text[j][index];
      }
    }
    cipher += " ";
    //cipher += temp_text[in_order.indexOf(this.key[i])];
  }

  return cipher;
}

Transposition.prototype.decryptByKey = function (key, cipher) {
  console.log(cipher.replace(/\s/g,''));
  temp_cipher = cipher.replace(/\s/g,'').match(new RegExp('.{1,' + key.length + '}', 'g'));
  in_order = key.split('').sort();
  text = "";

  for (var i = 0; i < key.length; i++)
  {
    index = in_order.indexOf(key[i]);
    console.log(index + " | "+key[i]+ " | "+temp_cipher);

    for (var j = 0; j < temp_cipher.length; j++)
    {
      if (temp_cipher[j][index] != null)
      {
        text += temp_cipher[j][index];
      }
    }
    text += " ";
    //text += temp_text[in_order.indexOf(this.key[i])];
  }

  return text;
};
