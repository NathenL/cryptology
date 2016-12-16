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

/**
 * [decryptByKey description]
 * @param  {[type]} key    [description]
 * @param  {[type]} cipher [description]
 * @return {[type]}        [description]
 */
Transposition.prototype.decryptByKey = function(key, cipher)
{
  temp_cipher = cipher.replace(/\s/g, ''); // Copy of input text for doing work on
  in_order = key.split('').sort(); // Key in alpha-numeric order
  text = ""; // Return text
  pt = new Array(); // Transposition table

  /*
    [grab] and [extra] are only used if the input cipher text did not include padding
    such as when using an ADFGX cipher.
   */
  grab = Math.floor(temp_cipher.length / key.length);
  extra = temp_cipher.length % key.length;

  for (var i = 0; i < key.length; i++)
  {

    index = key.indexOf(in_order[i]);
    pt[index] = (index < extra) ? temp_cipher.substring(0, grab + 1) :
      temp_cipher.substring(0, grab);
    temp_cipher = (index < extra) ? temp_cipher.substring(grab + 1,
      temp_cipher.length) : temp_cipher.substring(grab, temp_cipher.length);
  }
  for (var i = 0; i <= key.length; i++)
  {
    for (var j = 0; j < pt.length; j++)
    {
      if (pt[j][i] != null) text += pt[j][i];
    }
  }

  return text;
};
