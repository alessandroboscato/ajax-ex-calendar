$(document).ready(
  function() {
    // Creiamo un calendario dinamico con le festività.
    // Il calendario partirà da gennaio 2018 e si concluderà a dicembre 2018 (unici dati disponibili sull’API).
    // Milestone 1
    // Creiamo il mese di Gennaio, e con la chiamata all'API inseriamo le festività.
    // API: https://flynn.boolean.careers/exercises/api/holidays?year=2018&month=0
    var startDate = moment("01-01-2018", "DD-MM-YYYY");
    console.log(startDate);
    var daysInMonth = startDate.daysInMonth();
    console.log(daysInMonth);

    var source = document.getElementById("entry-template").innerHTML;
    var template = Handlebars.compile(source);
    for (var i = 1; i < daysInMonth + 1; i++) {

      var context = {
        "numero": i,
        "mese": "Gennaio",
        "anno": 2018,
        "festività": "Capodanno"
      };
      var html = template(context);
      $("#calendar").append(html);
    }

    $.ajax(
      {
      "url": "https://flynn.boolean.careers/exercises/api/holidays?year=2018&month=0",
      "method": "GET",
      "success": function (data) {
      console.log(data.response);
      },
      "error": function (richiesta, stato, errori) {
      alert("E' avvenuto un errore. " + errore);
      }
      });




  });
