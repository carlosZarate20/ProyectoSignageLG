(function() {
    
    function darFormatoAldia(day, month, year) {
        var formato = "";
        switch (day) {
         case "clear-day":
             info.set('IconClimaBlock', jsonData.climaSunny);
         case "clear-night":
             info.set('IconClimaBlock', jsonData.climaCloudy);
         case "rain":
             info.set('IconClimaBlock', jsonData.climaRain);
         case "snow":
             info.set('IconClimaBlock', jsonData.climaSunny);

         case "sleet":
             info.set('IconClimaBlock', jsonData.climaCloudy);
         case "wind":
             info.set('IconClimaBlock', jsonData.climaCloudy);

         case "fog":
             info.set('IconClimaBlock', jsonData.climaCloudy);

         case "cloudy":
             info.set('IconClimaBlock', jsonData.climaCloudy);
         case "partly-cloudy-day":
             info.set('IconClimaBlock', jsonData.climaCloudy);

         case "partly-cloudy-night":
             info.set('IconClimaBlock', jsonData.climaCloudy);

         default:
             info.set('IconClimaBlock', jsonData.climaSunny);
        }
    }

    function updateTime() {
        var dt = new Date();
        var time = dt.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
        info.set('asideBlock1Content1', time);
    }

    function bindData(jsonData){
        info = new BindClass('templateSix');

        updateTime();
        noti();
        calendariolocal();
        var meses = [
            "enero", "febrero", "marzo",
            "abril", "mayo", "junio", "julio",
            "agosto", "septiembre", "octubre",
            "noviembre", "diciembre"
        ]

        var dias = ["Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sábado"];

        var date = new Date();

        var dia = date.getDate();
        var mes = date.getMonth();
        var yyy = date.getFullYear();
        var fecha_formateada = dias[date.getUTCDay()] + ', ' + dia + ' de ' + meses[mes];
    }

    info.set('borderClima', jsonData.borderClima);

    // Block 11
    info.set('IconClimaBlock', jsonData.asideBlock11Content1);
    info.set('asideBlock11Content2', jsonData.asideBlock11Content2);
    info.set('asideBlock11Content3', jsonData.asideBlock11Content3);


})






function bindData(jsonData) {
    info = new BindClass('templateSix');
    console.log("ssds");

    updateTime();
    noti();
    calendariolocal();
    var meses = [
    "enero", "febrero", "marzo",
    "abril", "mayo", "junio", "julio",
    "agosto", "septiembre", "octubre",
    "noviembre", "diciembre"
    ]
    var dias = ["Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sábado"];

    var date = new Date();

    var dia = date.getDate();
    var mes = date.getMonth();
    var yyy = date.getFullYear();
    var fecha_formateada = dias[date.getUTCDay()] + ', ' + dia + ' de ' + meses[mes];





    var dateDay = fecha_formateada;


    info.set('asideBlock1Content3', dateDay);

    //  info.set('asideBlock1Content3', jsonData.asideBlock1Content3);

    window.setInterval(updateTime, 60000);
    window.setInterval(updateTime, 1800000);
    window.setInterval(calendariolocal, 10000);


    $.ajax({
        method: "GET",
        url: "https://api.darksky.net/forecast/7af51a01e29c8ddb7a548fad3cf35a05/-12.193731,-76.708493?units=si",
        crossDomain: true,
        dataType: 'jsonp',

    }).done(function(data) {
        console.log("Data Saved: ");



        info.set('asideBlock11Content2', "↑" + changeicon2(data.daily.data[0].icon, Math.round(data.daily.data[0].temperatureMax)));
        info.set('asideBlock11Content3', "↓" + changeicon2(data.daily.data[0].icon, Math.round(data.daily.data[0].temperatureMin)));

        function changeiconTitle(icon, temp) {
            switch (icon) {
             case "clear-day":
                 return info.set('asideBlock11Content1', jsonData.weather_clear);
             case "clear-night":
                 return info.set('asideBlock11Content1', jsonData.weather_clearnight);
             case "cloudy":
                 return info.set('asideBlock11Content1', jsonData.weather_cloudy);
             case "fog":
                 return info.set('asideBlock11Content1', jsonData.weather_fog);
             case "partly-cloudy-day":
                 return info.set('asideBlock11Content1', jsonData.weather_partlycloudy);
             case "partly-cloudy-night":
                 return info.set('asideBlock11Content1', jsonData.weather_partlycloudynight);
             case "rain":
                 return info.set('asideBlock11Content1', jsonData.weather_rain);
             case "sleet":
                 return info.set('asideBlock11Content1', jsonData.weather_sleet);
             case "snow":
                 return info.set('asideBlock11Content1', jsonData.weather_snow);
             case "sunny":
                 return info.set('asideBlock11Content1', jsonData.weather_sunny);
             case "wind":
                 return info.set('asideBlock11Content1', jsonData.weather_sleet);
            }
        }




        function changeicon(icon, temp) {
        return temp + "°";
        }

        function changeicon2(icon, temp) {
        return temp + "°C";
        }

        function getDayString(number) {
        switch (number) {
         case 0:
             return "D";
         case 1:
             return "L";
         case 2:
             return "M";
         case 3:
             return "M";

         case 4:
             return "J";
         case 5:
             return "V";

         case 6:
             return "S";

        }
        }

        var html = "";

        html += "<tr>"
        for (var i = 0; i < 7; ++i) {
        var date = new Date();
        date.setDate(date.getDate() + i);
        html += "<td>" + getDayString(date.getDay()) + "</td>";
        }
        html += "</tr>"


        html += "<tr>"
        for (var i = 0; i < 7; ++i) {
        html += "<td>" + changeicon(data.daily.data[i].icon, Math.round(data.daily.data[i].temperatureMax)) + "</td>"
        }
        html += "</tr>"

        html += "<tr>"
        for (var i = 0; i < 7; ++i) {
        html += "<td>" + changeicon(data.daily.data[i].icon, Math.round(data.daily.data[i].temperatureMin)) + "</td>"
        }


        getCurrency("USD", "PEN", "#111", 'https://marketdata.websol.barchart.com/getQuote.json?apikey=f40b136c6dc4451f9136bb53b9e70ffa&symbols=ZC*1,IBM,GOOGL,ADES,EEUU,ADES,ASIX,AEGN,AMTX,APD,AKS,AIN,ALB,ATI,AMRK,AMRC,AVD,AMWD,AMRS,AQMS,RKDA,AGX,ATIS,ATISW,AXTA,%5EEURUSD');
        getCurrency("EUR", "PEN", "#222", 'https://marketdata.websol.barchart.com/getQuote.json?apikey=f40b136c6dc4451f9136bb53b9e70ffa&symbols=ZC*1,ACH,APWC,BHP,BAK,EVGN,MT,CSTM,GOLD,TS,LYB,TX,TS,UN,UL,RIO,PKX,SHI,TANH,NEWA,GURE,%5EEURUSD');

        $("#tablaClima").html(html);

        changeiconTitle(data.currently.icon, Math.round(data.currently.temperature));

        var html2 = changeicon2(data.currently.icon, Math.round(data.currently.temperature));


        function levenshtein(s1, s2) {
        var l1 = s1.length;
        var l2 = s2.length;
        var d = [];
        var c = 0;
        var a = 0;

        if (l1 == 0)
         return l2;

        if (l2 == 0)
         return l1;

        var d = new Array((l1 + 1) * (l2 + 1));
        a = l1 + 1;

        for (var i = 0; i <= l1; d[i] = i++);
        for (var j = 0; j <= l2; d[j * a] = j++);

        for (var i = 1; i <= l1; i++) {
         for (var j = 1; j <= l2; j++) {
             if (s1[i - 1] == s2[j - 1])
                 c = 0;
             else
                 c = 1;
             var r = d[j * a + i - 1] + 1;
             var s = d[(j - 1) * a + i] + 1;
             var t = d[(j - 1) * a + i - 1] + c;

             d[j * a + i] = Math.min(Math.min(r, s), t);
         }
        }

        return (d[l2 * a + l1]);
        }
        ///indica la cantidad de cambios de caracterees para que sean iguales  == 5
        console.log(levenshtein("Lonche con mamá", "El Lonche con mi mamá"));

        $("#logoClima").html(html2);

    });
