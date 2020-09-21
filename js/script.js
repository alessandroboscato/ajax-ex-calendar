$(document).ready(
  function() {
    // MILESTONE 1
    // Creiamo un calendario dinamico con le festività.
    // Il calendario partirà da gennaio 2018 e si concluderà a dicembre 2018 (unici dati disponibili sull’API).
    // Creiamo il mese di Gennaio, e con la chiamata all'API inseriamo le festività.
    // API: https://flynn.boolean.careers/exercises/api/holidays?year=2018&month=0

    // MILESTONE 2
    // Diamo la possibilità di cambiare mese, gestendo il caso in cui l’API non possa ritornare festività.
    // Attenzione!
    // Ogni volta che cambio mese dovrò:
    // Controllare se il mese è valido (per ovviare al problema che l’API non carichi holiday non del 2018)
    // Controllare quanti giorni ha il mese scelto formando così una lista
    // Chiedere all’api quali sono le festività per il mese scelto
    // Evidenziare le festività nella lista

    

    var date = "2018-01-01";
    var startDate = moment(date);

    var daysInMonth = startDate.daysInMonth();

    // compilo il template handlebars
    var source = document.getElementById("entry-template").innerHTML;
    var template = Handlebars.compile(source);

    // chiamata ajax
    $.ajax(
      {
      "url": "https://flynn.boolean.careers/exercises/api/holidays",
      "data": {
        "year": 2018,
        "month": 0
      },
      "method": "GET",
      "success": function (data) {
        //renderizzo handlebars
        for (var i = 0; i < daysInMonth; i++) {

          //cloniamo l'oggetto moment per poterlo modificare e non avere problemi con il ciclo li che altrimenti andrebbe oltre i giorni del mese..
          var actualDate = moment(startDate).add(i, "d");

          //--!!importante il format()--!!
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
