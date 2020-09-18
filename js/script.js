$(document).ready(
  function() {
    // Creiamo un calendario dinamico con le festività.
    // Il calendario partirà da gennaio 2018 e si concluderà a dicembre 2018 (unici dati disponibili sull’API).
    // Milestone 1
    // Creiamo il mese di Gennaio, e con la chiamata all'API inseriamo le festività.
    // API: https://flynn.boolean.careers/exercises/api/holidays?year=2018&month=0
    var date = "2018-01-01";
    var startDate = moment(date);

    var daysInMonth = startDate.daysInMonth();

    // compilo il template handlebars
    var source = document.getElementById("entry-template").innerHTML;
    var template = Handlebars.compile(source);

    // chiamata ajax
    $.ajax(
      {
      "url": "https://flynn.boolean.careers/exercises/api/holidays?year=2018&month=0",
      "method": "GET",
      "success": function (data) {
        //renderizzo handlebars
        for (var i = 0; i < daysInMonth; i++) {
          var actualDate = moment(startDate).add(i, "d");
          var counterDays = actualDate.format("YYYY-MM-DD");
          var context = {
            "numero": 1 + i,
            "mese": startDate.format("MMMM"),
            "date": counterDays
          };
          var html = template(context);
          $("#calendar").append(html);

        }
        printHolyday(data.response);
      },
      "error": function (richiesta, stato, errori) {
      alert("E' avvenuto un errore. " + errore);
      }
      });

      // ------------functions--------------
      function printHolyday(data) {
        for (var j = 0; j < data.length; j++) {
          var holydayDate = data[j].date;
          var holydayName = data[j].name;
          $(".day[data-attribute='"+holydayDate+"']").addClass("holyday");

          $(".day[data-attribute='"+holydayDate+"'] .holydayType").text(" - "+holydayName);
        }
      }

  });
