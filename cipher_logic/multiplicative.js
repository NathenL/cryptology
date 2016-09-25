exports.encrypt = (k, t) => encrypt(k, t);

function encrypt(key, text)
{
  text = text.toLowerCase().split('');

  var cipher = "";
  text.forEach(function(letter, index)
  {
    if (letter.charCodeAt(0) < 97)
    {
      cipher += letter;
    }
    else
    {
      // 98 instead of 97 so a = 1 not 0
      num = ((letter.charCodeAt(0) - 96) * key) % 26;
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

exports.analyze = (c) => analyze(c);

function analyze(c)
{

}

exports.decrypt = (k, c) => decrypt(k, c);

function decrypt(key, cipher)
{
  var inverse = [1, 9, 21, 15, 3, 19, 7, 23, 11, 5, 17, 25];
  cipher = cipher.toLowerCase().split('');

  if (!key > 0 || inverse.indexOf(Number(key)) == -1)
  {
    console.log("No valid inverse key provided, useing brute force...");
    return brute(cipher);
  }

  else
  {
    var text = "";
    cipher.forEach(function(letter, index)
    {
      if (letter.charCodeAt(0) < 97)
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

exports.brute = (c) => brute(c);
// BRUTE FORCE
function brute(cipher)
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
