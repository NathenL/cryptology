jQuery(document).ready(function()
{
  var letters = ["A", "D", "F", "G", "X"];
  var html = "";
  for (var i = 0; i < letters.length; i++)
  {
    html += "<tr><th>" + letters[i]
    "</th>";
    for (var j = 0; j < 5; j++)
    {
      html += "<td><input type=\"Text \" id=\"" + letters[i] + "" + j +
        "\"></td>";
    }
  }
  jQuery("#dataTable  tr:last").after(html);


  jQuery("#random").click(function()
  {
    console.log("RANDOM");
    var adfgx = new ADFGX();
    randomKey = adfgx.randomKey();
    keyText = "";
    var letters = ["A", "D", "F", "G", "X"];

    for (var i = 0; i < randomKey.length; i++)
    {
      for (var j = 0; j < randomKey[i].length; j++)
      {
        jQuery("#" + letters[i] + "" + j).val(randomKey[i][j]);
        jQuery("#" + letters[i] + "" + j).keyup(function()
        {
          jQuery("#" + letters[i] + "" + j).val(jQuery("#" +
            letters[i] + "" + j).val().substring(0, 1));
          var text = jQuery("#dataString").val();
          console.log(text);
        });
        keyText += randomKey[i][j];
      }
    }

    jQuery("#dataString").val(keyText);
  });

  jQuery("#encrypt").click(function()
  {
    console.log("ENCRYPT");
    var key = jQuery("#dataString").val();
    var keyword = jQuery("#keyWord").val().replace(
      /[^a-z]/gi, '').split('').reverse().join('').replace(
      /(.)(?=.*\1)/g, "").split('').reverse().join('');
    var text = jQuery("#input").val().replace(/[^a-z]/gi, '');
    var adfgx = new ADFGX(key, keyword, text, 'd');
    adfgx.setUpKey(key);

    jQuery("#output").html(adfgx.encrypt());
  });

  jQuery("#decrypt").click(function()
  {
    console.log("DECRYPT");
    var key = jQuery("#dataString").val();
    var keyword = jQuery("#keyWord").val().replace(
      /[^a-z]/gi, '').split('').reverse().join('').replace(
      /(.)(?=.*\1)/g, "").split('').reverse().join('');
    var text = jQuery("#input").val().replace(/[^a-z]/gi, '');
    var adfgx = new ADFGX(key, keyword, text, 'd');
    adfgx.setUpKey(key);

    jQuery("#output").html(adfgx.decrypt());
  });

  jQuery("#dataString").keyup(function()
  {
    jQuery("#dataString").val(jQuery("#dataString").val().replace(
      /[^a-z]/gi, '').split('').reverse().join('').replace(
      /(.)(?=.*\1)/g, "").split('').reverse().join(''));

    var split = jQuery("#dataString").val().replace(/[^a-z]/gi, '').split(
        '').reverse().join('').replace(/(.)(?=.*\1)/g, "").split('').reverse()
      .join('').match(/.{1,5}/g);

    for (var i = 0; i < split.length; i++)
    {
      for (var j = 0; j < split[i].length; j++)
      {
        jQuery("#" + letters[i] + "" + j).val(split[i][j]);
        //keyText += randomKey[i][j];
      }
    }
    console.log(split);
  });

  jQuery("#t1").click(function()
  {
    jQuery("#dataString").val("BTALPDHOZKQFVSNGJCUXMREWY");
    jQuery("#dataString").keyup();
    jQuery("#input").val("Attack at once");
    jQuery("#keyWord").val("cargo");
  });

  jQuery("#t2").click(function()
  {
    jQuery("#dataString").val("PHQGMEAYNOFDXKRCVSZWBUTIL");
    jQuery("#dataString").keyup();
    jQuery("#input").val("Attack");
    jQuery("#keyWord").val("german");
  });

  jQuery("#t3").click(function()
  {
    jQuery("#dataString").val("SJMCEYNADZTHFGPLUOVXWBKRQ");
    jQuery("#dataString").keyup();
    jQuery("#input").val("ambassadorshot");
    jQuery("#keyWord").val("charm");
  });

  jQuery("#t4").click(function()
  {
    jQuery("#dataString").val("UNAMOCVYWPGQKTEBLDSFXHJZR");
    jQuery("#dataString").keyup();
    jQuery("#input").val("this is a test of the adfgx system");
    jQuery("#keyWord").val("cryptology");
  });
});
