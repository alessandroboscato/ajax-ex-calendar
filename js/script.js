$(document).ready(
  function() {
    // Creiamo un calendario dinamico con le festività.
    // Il calendario partirà da gennaio 2018 e si concluderà a dicembre 2018 (unici dati disponibili sull’API).
    // Milestone 1
    // Creiamo il mese di Gennaio, e con la chiamata all'API inseriamo le festività.
    // API: https://flynn.boolean.careers/exercises/api/holidays?year=2018&month=0
    var startDate = moment("2018-01-01");
    console.log(startDate);
    var daysInMonth = startDate.daysInMonth();
    console.log(daysInMonth);
    var counter = startDate._i;
    console.log(counter);
    // compilo il template handlebars
    var source = document.getElementById("entry-template").innerHTML;
    var template = Handlebars.compile(source);

    // chiamata ajax
    $.ajax(
      {
      "url": "https://flynn.boolean.careers/exercises/api/holidays?year=2018&month=0",
      "method": "GET",
      "success": function (data) {
        console.log(data.response);
        //renderizzo handlebars
        for (var i = 1; i < daysInMonth + 1; i++) {
          var counter = startDate._i;
          var context = {
            "numero": i,
            "mese": startDate.format("MMMM")
            
          };
          var html = template(context);
          $("#calendar").append(html);
        }

      },
      "error": function (richiesta, stato, errori) {
      alert("E' avvenuto un errore. " + errore);
      }
      });

  });
