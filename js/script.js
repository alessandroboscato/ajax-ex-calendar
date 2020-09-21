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

    var source = $("#entry-template").html();
    var template = Handlebars.compile(source);

    var startDate = moment("2018-01-01");
    var daysInMonth = startDate.daysInMonth();

    // 1° chiamata ajax -- Gennaio 2018
    var month = 0;
    $.ajax(
      {
      "url": "https://flynn.boolean.careers/exercises/api/holidays",
      "data": {
        "year": 2018,
        "month": month
      },
      "method": "GET",
      "success": function (data) {
        printDays();
        printHolyday(data.response);
      },
      "error": function (richiesta, stato, errori) {
      alert("E' avvenuto un errore. " + errore);
      }
      });

    //click next
    $("#next").click(
      function() {
        if (month < 11) {
          $("#calendar").html("");
          $.ajax(
            {
            "url": "https://flynn.boolean.careers/exercises/api/holidays",
            "data": {
              "year": 2018,
              "month": month + 1
            },
            "method": "GET",
            "success": function (data) {
              month += 1;
              startDate.add(1, "months");
              daysInMonth = startDate.daysInMonth();
              printDays();
              printHolyday(data.response);
            },
            "error": function (richiesta, stato, errori) {
            alert("E' avvenuto un errore. " + errore);
            }
            });
        } else {
          alert("Attenzione! Il presente calendario non va oltre dicembre 2018.")
        }

      });
      //click prev
      $("#prev").click(
        function() {
          if (month > 0) {
            $("#calendar").html("");
            $.ajax(
              {
              "url": "https://flynn.boolean.careers/exercises/api/holidays",
              "data": {
                "year": 2018,
                "month": month - 1
              },
              "method": "GET",
              "success": function (data) {
                month -= 1;
                startDate.subtract(1, "months");
                daysInMonth = startDate.daysInMonth();
                printDays();
                printHolyday(data.response);
              },
              "error": function (richiesta, stato, errori) {
              alert("E' avvenuto un errore. " + errore);
              }
              });
          } else {
            alert("Attenzione! Il presente calendario non può andare prima di gennaio 2018.")
          }

        });


      // ------------functions--------------

      function printDays() {
        // TEMPLATE HANDLEBARS

        for (var i = 0; i < daysInMonth; i++) {
          var actualDate = moment(startDate).add(i, "d"); //clone data --!importante
          var counterDays = actualDate.format("YYYY-MM-DD"); // format --!importante
          var context = {
            "numero": 1 + i,
            "mese": actualDate.format("MMMM"),
            "date": counterDays
          };
          // render handlebars
          var html = template(context);
          $("#calendar").append(html);
        }
      }

      function printHolyday(data) {
        for (var j = 0; j < data.length; j++) {
          var holydayDate = data[j].date;
          var holydayName = data[j].name;
          $(".day[data-attribute='"+holydayDate+"']").addClass("holyday");

          $(".day[data-attribute='"+holydayDate+"'] .holydayType").text(" - "+holydayName);
        }
      }

  });
