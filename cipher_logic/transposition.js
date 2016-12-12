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
  this.key = k.toUpperCase().replace(/[^A-Z]/ig, "").split('').reverse().join(
    '').replace(/(.)(?=.*\1)/g, "").split('').reverse().join('');
  this.text = t.replace(/[^A-Z]/ig, "");
  this.mode = m.replace(/[^A-Z]/ig, "");
}

Transposition.prototype.transpose = function()
{
  temp_text = this.text.match(new RegExp('.{1,' + this.key.length + '}', 'g'));
  in_order = this.key.split('').sort();
  cipher = "";

  for (var i = 0; i < this.key.length; i++)
  {
    index = this.key.indexOf(in_order[i]);

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
