     /*global BindClass */
     /*jslint browser: true, indent: 4*/

     /**
      * @file Manages the configuration of the HTML application. 
      * Loading the JSON data in application to binding the data into the page.
      * @author LG CSP-1
      */

     /**
      * Description of module, defines module for whole file
      * @lends module: closureFunction
      * @module closureFunction
      */
     (function() {
         'use strict';
         /** @type {object} */
         var info,
             /** @type {string} */
             dataSet;
         /**
          * Binds data to HTML Page.
          * @method bindData
          * @param {Object} jsonData - Object contains data to put into HTML
          * @example
          * For Example : 
          * 'jsonData.headerImage' will hold the path of an image to be set into the html page.
          * For Img Tag attribute 'data-bind-templateSix', we set value as 'headerImage'(See Below).
          *               
          *     //  img data-bind-templateSix = "headerImage"
          *       
          * To set the value from Object to html tag, we need to put the code : 
          *     //  info.set('headerImage', jsonData.headerImage)
          *
          * here, first argument is the name of html tag's attribute value and,
          *             second is the value from javascript Object.
          */
         function init() {

         }



         //FUNCION POST  
         function eventoPost(url, data, success) {
             var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
             xhr.open('POST', url);
             xhr.onreadystatechange = function() {
                 if (xhr.readyState > 3 && xhr.status == 200) { success(xhr.responseText); }
             };
             
             xhr.setRequestHeader("Content-Type", "application/json");
             xhr.send(data);
             return xhr;
         }

         var proxyurl = "https://cors-anywhere.herokuapp.com/";
         var urlpost = proxyurl + 'http://smartmirror-api.azurewebsites.net/GetGadgetStatusSmart';

         var urlpost2 = proxyurl + 'http://smartmirror-api.azurewebsites.net/GetUser';

         var urlpost3 = proxyurl + 'http://smartmirror-api.azurewebsites.net/GetGadgetOrderSmart';

         var urlpost4 = proxyurl + 'http://smartmirror-api.azurewebsites.net/UpdateBooleans';

         var UsuarioID=undefined;
         var RefreshToken=undefined;

         var ArregloCorreo=[];

       
             
        function UpdateBooleans(idesito) {
            var enviar2 = JSON.stringify({  "id": idesito });

             eventoPost(urlpost4, enviar2, function(data) {           
                 
             });
         }
         function obtenerUsuario(){
              var enviar = JSON.stringify({  "roomNumber": 140 });

               eventoPost(urlpost2 ,enviar,
                function(data) {

                 var usuario = JSON.parse(data);
                UsuarioID=usuario.id;
                UpdateBooleans(UsuarioID);
                RefreshToken=usuario.refreshtoken;
                console.log(UsuarioID);
                console.log(RefreshToken);
                getGoogleData(RefreshToken, function(data) {
                    var indexIncrement = 0
                    console.log("Agenda: ", data);
                    var agendaData = data;
                    //for(var i = data.length-5; i< data.length; i++){
                    for(var i = 0; i< data.length; i++){

                        var agenda1 = agendaData[i];
                        var d = new Date(agenda1.start.dateTime);
                        var d2 = new Date(agenda1.start.dateTime);
                        var time = d.toLocaleString("en-PE");
                        var today = new Date();
                    
                        var timeToday = today.toLocaleString("en-PE");
                        console.log("FechaFormato", time);
                        console.log("Fecha Hoy", timeToday);
                        var difference_ms  = today.getTime() - d.getTime();
                        
                        var difference_hr = today.getHours() - d.getHours();
                        var difference_minute = today.getMinutes() - d.getMinutes();
                        console.log("Horas: " + difference_hr);
                        console.log("Minutes: ", difference_minute);
                        console.log("Minutes2: ", difference_ms);


                        difference_ms = difference_ms/1000;
                        var seconds = Math.floor(difference_ms % 60);
                        /*difference_minute = difference_minute/60; 
                        var minutes = Math.floor(difference_minute % 60);*/

                        //console.log("Minutes: ", minutes);
                        difference_ms = difference_ms/60; 
                        var hours = Math.floor(difference_hr % 12);  
                        var days = Math.floor(difference_ms/24);

                        var serviocAgenda1 = agenda1.summary;
                        var htmlAgenda;
                        var variableTimer = d.toLocaleTimeString('en-PE', {hour: '2-digit', hour12: true});
                        var variableTimerMinutes = d2.toLocaleTimeString('en-PE', {minute: '2-digit'});
                        if(today.getDate() == d.getDate()){
                            
                            if(hours <= 0){
                                hours *= -1;
                                if( d.getHours() <= 1){
                                    if(difference_minute <= 0)
                                    {
                                        difference_minute *= -1;
                                        htmlAgenda = '<label  style = "color: white; font-family: b-light-condensed; font-size: 24px; display: inline-block;">'+ "En " + difference_minute  + " minutos" +'</label>'
                                            + '<label style = "color: white; font-family: b-medium; font-size: 24px; margin-left: 25px; margin-left: 5px;">' + serviocAgenda1+ '</label> </br>'
                                    }
                                        
                                } else
                                if( d.getHours() >= 12){
                                     htmlAgenda = '<label  style = "color: white; font-family: b-light-condensed; font-size: 24px; display: inline-block;">'+ "Hoy " + variableTimer  +'</label>'
                                        + '<label style = "color: white; font-family: b-medium; font-size: 24px; margin-left: 25px; margin-left: 5px;">' + serviocAgenda1+ '</label> </br>'
                                }else if(d.getHours() <= 12){
                                     htmlAgenda = '<label  style = "color: white; font-family: b-light-condensed; font-size: 24px; display: inline-block;">'+ "Hoy " + variableTimer  +'</label>'
                                        + '<label style = "color: white; font-family: b-medium; font-size: 24px; margin-left: 25px; margin-left: 5px;">' + serviocAgenda1+ '</label> </br>'
                                }
                            }else{
                                if( d.getHours()>=12){
                                     htmlAgenda = '<label  style = "color: white; font-family: b-light-condensed; font-size: 24px; display: inline-block;">'+ "Hoy " + variableTimer +'</label>'
                                        + '<label style = "color: white; font-family: b-medium; font-size: 24px; margin-left: 25px; margin-left: 5px;">' + serviocAgenda1+ '</label> </br>'
                                }else if(d.getHours()<=12){
                                     htmlAgenda = '<label  style = "color: white; font-family: b-light-condensed; font-size: 24px; display: inline-block;">'+ "Hoy " + variableTimer +'</label>'
                                        + '<label style = "color: white; font-family: b-medium; font-size: 24px; margin-left: 25px; margin-left: 5px;">' + serviocAgenda1+ '</label> </br>'
                                } 
                            }
                        }else if(d.getDate() > today.getDate()){
                            if(hours <= 0){
                                hours *= -1;
                                if( d.getHours()>=12){
                                     htmlAgenda = '<label  style = "color: white; font-family: b-light-condensed; font-size: 24px; display: inline-block;">'+ "Mañana " + variableTimer+'</label>'
                                        + '<label style = "color: white; font-family: b-medium; font-size: 24px; margin-left: 25px; margin-left: 5px;">' + serviocAgenda1+ '</label> </br>'
                                }else if(d.getHours()<=12){
                                     htmlAgenda = '<label  style = "color: white; font-family: b-light-condensed; font-size: 24px; display: inline-block;">'+ "Mañana " + variableTimer +'</label>'
                                        + '<label style = "color: white; font-family: b-medium; font-size: 24px; margin-left: 25px; margin-left: 5px;">' + serviocAgenda1+ '</label> </br>'
                                }
                            }
                            if(hours >= 0){
                                if( d.getHours() >= 12){
                                     htmlAgenda = '<label  style = "color: white; font-family: b-light-condensed; font-size: 24px; display: inline-block;">'+ "Mañana " + variableTimer +'</label>'
                                        + '<label style = "color: white; font-family: b-medium; font-size: 24px; margin-left: 25px; margin-left: 5px;">' + serviocAgenda1+ '</label> </br>'
                                }else if(d.getHours() <= 12){
                                     htmlAgenda = '<label  style = "color: white; font-family: b-light-condensed; font-size: 24px; display: inline-block;">'+ "Mañana " + variableTimer +'</label>'
                                        + '<label style = "color: white; font-family: b-medium; font-size: 24px; margin-left: 25px; margin-left: 5px;">' + serviocAgenda1+ '</label> </br>'
                                }
                            }
                        }

                        var stringNumber = "#f"+indexIncrement.toString(); 
                        $(stringNumber).html(htmlAgenda);
                        indexIncrement ++;
                    }
                }
                , function(data1) {
                    var correo = data1;  
                    var temp = correo.subject.substring(0, 45);

                    var timeItem = new Date(correo.sendAt);
                    var correoTime = correo.sendAt;

                    var dias = ["Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sábado"];
                    var dia = timeItem.getDate();
                    var formatedTime = timeItem.toLocaleTimeString('en-PE', {hour: '2-digit', minute: '2-digit', hour12: true});
                    var fecha_formateada = dias[timeItem.getUTCDay()] + ', ' + formatedTime ;  

                    ArregloCorreo.push(correo);               
                    var string = '<div class="carousel-item"><label class="carrouselAsunto" style = "color: white; font-family: b-medium; font-size: 20px;">'+ temp +'</label> <label class="carrouselFrom">'+ correo.sender +'</label><label class="carrouselDate">'+ fecha_formateada +'</label><label class="carrouselDesc">'+ correo.message +'</label></div>';
                    $("#elements").append(string);   
                    $("#elements .carousel-item").first().addClass('active');
              
                });
             });    
           }
        obtenerUsuario();    
         console.log(ArregloCorreo);
         function obtenerEstadodefinitivo() {

             var enviar = JSON.stringify({  "id": UsuarioID });

             eventoPost(urlpost, enviar, function(data) {
                var arreglo = JSON.parse(data);
                if(arreglo.status){
 
                } else{
                     // OBTENGO LA LISTA DE BOOLEANOS
                 
                 //SETEO EL VALOR DEL BOOLEANO DE CLIMA EN ESTE CASO SE ENCUENTRA EN AL POSICION 1 DEL ARREGLO
                 var bolsabooleano = arreglo[0].isActive;
                 if (bolsabooleano == true) {
                     document.getElementById('Clima').style.display = 'block';
                 } else {
                     document.getElementById('Clima').style.display = 'none';
                 }

                 var climabooleano = arreglo[1].isActive;
                 if (climabooleano == true) {
                     document.getElementById('Hora').style.display = 'block';
                 } else {
                     document.getElementById('Hora').style.display = 'none';
                 }

                 var horabooelan = arreglo[2].isActive;
                 if (horabooelan == true) {
                     document.getElementById('Agenda').style.display = 'block';
                 } else {
                     document.getElementById('Agenda').style.display = 'none';
                 }

                 var noticiabooelan = arreglo[3].isActive;
                 if (noticiabooelan == true) {
                     document.getElementById('Correo').style.display = 'block';
                 } else {
                     document.getElementById('Correo').style.display = 'none';
                 }

                 var agendabooelan = arreglo[4].isActive;
                 if (agendabooelan == true) {
                     document.getElementById('Bolsa').style.display = 'block';
                 } else {
                     document.getElementById('Bolsa').style.display = 'none';
                 }


                 var correobooelan = arreglo[5].isActive;
                 if (correobooelan == true) {
                     document.getElementById('HotelServiceContenedor').style.display = 'block';
                 } else {
                     document.getElementById('HotelServiceContenedor').style.display = 'none';
                 }

                 var musicaboolean = arreglo[6].isActive;
                 if (musicaboolean == true) {
                     document.getElementById('Musica').style.display = 'block';
                 } else {
                     document.getElementById('Musica').style.display = 'none';
                 }

                 var serviciosboolean = arreglo[7].isActive;
                 if (serviciosboolean == true) {
                     document.getElementById('NoticiasContenedor').style.display = 'block';
                 } else {
                     document.getElementById('NoticiasContenedor').style.display = 'none';
                 }     
                }

               
                 
             });
         }

         //EJECUTO CADA SEGUNDO LA FUNCION PARA ACTUALIZAR LOS ESTADOS DE LOS GADGETS
         window.setInterval(obtenerEstadodefinitivo, 1000);
         

        function obtenerOrderfinitivo() {

            var enviar = JSON.stringify({  "id": UsuarioID });

             eventoPost(urlpost3, enviar, function(data) {
                 // OBTENGO LA LISTA DE BOOLEANOS
                 var arreglo = JSON.parse(data);
                 

                 if(arreglo.order){

                 } else{

                 //OBTENIENDO HTML DE CADA GADGET
                 var bolsahtml=undefined;
                 var climahtml=undefined;
                 var horahtml=undefined;
                 var noticiashtml=undefined;
                 var agendahtml=undefined;
                 var correohtml=undefined;
                 var musicahtml=undefined;
                 var servicioshtml=undefined;
                 for (var a=1;a< 9;a++){
                    var element='#Order'+a;                   

                    if($(element).children()[0].id == 'Bolsa'){
                        
                        bolsahtml=$(element).html();
                        
                    } else if($(element).children()[0].id == 'Clima'){
                        
                        climahtml=$(element).html();
                        console.log(climahtml);
                        
                    } else if($(element).children()[0].id == 'Hora'){
                        
                        horahtml=$(element).html();
                        
                    } else if($(element).children()[0].id == 'NoticiasContenedor'){
                        
                        noticiashtml=$(element).html();
                        
                    } else if($(element).children()[0].id == 'Agenda'){
                        
                        agendahtml=$(element).html();
                        
                    } else if($(element).children()[0].id == 'Correo'){
                        
                        correohtml=$(element).html();
                        
                    } else if($(element).children()[0].id == 'Musica'){
                        
                        musicahtml=$(element).html();
                    } else if($(element).children()[0].id == 'HotelServiceContenedor'){
                        
                        servicioshtml=$(element).html();
                        
                    }      


                    
                 }

                

                 for (var j=0;j < arreglo.length;j++){
                    if(arreglo[j].contentHtml == 'Clima')
                    {
                        $('#Order'+arreglo[j].order).html(climahtml);
                    }
                    if(arreglo[j].contentHtml == 'Bolsa')
                    {
                        $('#Order'+arreglo[j].order).html(bolsahtml);
                    }
                    if(arreglo[j].contentHtml == 'Hora')
                    {
                        $('#Order'+arreglo[j].order).html(horahtml);
                    }
                    if(arreglo[j].contentHtml == 'NoticiasContenedor')
                    {
                        $('#Order'+arreglo[j].order).html(noticiashtml);
                    }
                    if(arreglo[j].contentHtml == 'Agenda')
                    {
                        $('#Order'+arreglo[j].order).html(agendahtml);
                    }
                    if(arreglo[j].contentHtml == 'Correo')
                    {
                        $('#Order'+arreglo[j].order).html(correohtml);
                    }
                    if(arreglo[j].contentHtml == 'Musica')
                    {
                        $('#Order'+arreglo[j].order).html(musicahtml);
                    }
                    if(arreglo[j].contentHtml == 'HotelServiceContenedor')
                    {
                        $('#Order'+arreglo[j].order).html(servicioshtml);
                    }
                 
                 }
                  $('#elements').html('');
                 for(var k=0;k<ArregloCorreo.length;k++){
                          var string = '<div class="carousel-item"><label class="carrouselAsunto">'+ ArregloCorreo[k].subject +'</label> <label class="carrouselFrom">'+ ArregloCorreo[k].sender +'</label><label class="carrouselDate">'+ ArregloCorreo[k].sendAt +'</label><label class="carrouselDesc">'+ ArregloCorreo[k].message +'</label></div>';
                    $("#elements").append(string);   
                   
                 }
                 $("#elements .carousel-item").first().addClass('active');
                 $('.carousel-item').carousel({ interval: 4000 });
                    $('.carousel').carousel({ interval: 4000 });

                    $('#tablaClima').html('');
                    GetWeather();

                 }

   
             });
         }
         // obtenerOrderfinitivo();
         //EJECUTO CADA SEGUNDO LA FUNCION PARA ACTUALIZAR EL ORDEN DE LOS GADGET
         window.setInterval(obtenerOrderfinitivo, 1000);

        // addEvent(document, "keydown", function (e) {
        //     console.log("Se presiono una tecla");
        //     console.log(e);
        //     if(e.code == "Space"){
        //         console.log("entro aca");
        //         obtenerOrderfinitivo();
        //         }
        //     });

        // function addEvent(element, eventName, callback) {
        //     if (element.addEventListener) {
        //         element.addEventListener(eventName, callback, false);
        //     } else if (element.attachEvent) {
        //       element.attachEvent("on" + eventName, callback);
        //     } else {
        //       element["on" + eventName] = callback;
        //      }
        // }


var clientId = "541429281292-8v02kma7fl8fhmiih66kdqnlh8b6opmn.apps.googleusercontent.com";
var clientSecret = "XbyAoBAIlUlqBbS1Lal0GrAF";

function getGoogleData(refreshToken, calendarCallback, mailCallback) {
    var mails = [];
    $.ajax({
        type: "POST",
        url: "https://www.googleapis.com/oauth2/v4/token",
        headers: { 'Content-Type': "application/x-www-form-urlencoded" },
        data: {
            'refresh_token': RefreshToken,
            'client_id': clientId,
            'client_secret': clientSecret,
            'grant_type': "refresh_token"
        },
        success: function (result) {
            $.ajax({
                type: "GET",
                url: "https://www.googleapis.com/calendar/v3/calendars/primary/events",
                headers: { 'Authorization': result.token_type + " " + result.access_token },
                success: function (calendarResult) {
                    var calendario = calendarResult.items
                    console.log("Agenda Original: ", calendario);
                    var listaArrayError = [];
                    var listaArrayCorrect = [];
                    for(var i = 0; i< calendario.length; i++){

                        var agenda1 = calendario[i];
                        var d = new Date(agenda1.start.dateTime);
                        var time = d.toLocaleString("en-PE");
                        var today = new Date();
                        var dayToday = today.getDate();
                        var yearToday = today.getFullYear();
                        var monthToday = today.getMonth();
                        var hourToday = today.getHours();
                        var minuteToday = today.getMinutes();

                        var difference_minutes = today.getMinutes() - d.getMinutes();
                        var valueFullYear = d.getFullYear();
                        var valueMonth = d.getMonth();
                        var valueDay = d.getDate();
                        var valueHour = d.getHours();
                        var valMinute = d.getMinutes();

                        var constArray = "";

                        if(yearToday > valueFullYear){
                            listaArrayError.push(agenda1);
                        }else{
                            if(monthToday > valueMonth){
                                listaArrayError.push(agenda1);
                            }else{
                                if(dayToday == valueDay){
                                    if(hourToday == valueHour){
                                        if(difference_minutes == 0){
                                            listaArrayError.push(agenda1);
                                        }else{
                                            listaArrayCorrect.push(agenda1); 
                                        }
                                    }else if(hourToday > valueHour){
                                        listaArrayError.push(agenda1);
                                    }else {
                                        listaArrayCorrect.push(agenda1); 
                                    }
                                }else if(dayToday > valueDay){
                                    listaArrayError.push(agenda1);
                                }else {
                                    listaArrayCorrect.push(agenda1); 
                                }
                            }                    
                        }
                    }
                    constArray = listaArrayCorrect.sort((a, b) => new Date(a.start.dateTime) - new Date(b.start.dateTime)   );
                    //var constArray = _.orderBy(listaArrayCorrect, ['start.dateTime']);
                    //var constArray = listaArrayCorrect.sort((a, b) => a['start.dateTime'] - b['start.dateTime']);
                    calendarCallback(constArray);
                    
                }
            });
            $.ajax({
                type: "GET",
                url: "https://www.googleapis.com/gmail/v1/users/me/messages?q=is:inbox",
                headers: { 'Authorization': result.token_type + " " + result.access_token },
                success: function (mailsResult) {
                    var messages = mailsResult.messages;
                    var max = messages.length > 5 ? 5 : messages.length;
                    for (var i = 0; i < max; i++) {
                      
                        $.ajax({
                            type: "GET",
                            url: "https://www.googleapis.com/gmail/v1/users/me/messages/" + messages[i].id,
                            headers: { 'Authorization': result.token_type + " " + result.access_token },
                            success: function (mailResult) {
                                mailCallback(serializeMail(mailResult, i));                                                    
                            }
                        });
                        
                        
                    }
                }
            });
        }
    });
    //asunto , from , date , descr
}
    function serializeMail(result, id) {
        var object = {id:"", sender:"", subject:"",sendAt:"",message:"" };
        object.id = findValue(result.payload.headers, "From");
        object.sender = findValue(result.payload.headers, "From");
        object.subject = findValue(result.payload.headers, "Subject");
        object.sendAt = findValue(result.payload.headers, "Date");
        object.message = result.snippet;
        return object;
    }
    function findValue(arrayObject, name) {
        var result = arrayObject.find(x => x.name === name);
        return result !== undefined ? removeExtraString(result.value) : "not found";
    }
    function removeExtraString(value) {
        return value.replace("<", "").replace(">", " ").replace(".", " ").replace("@", " ");
    }
    function parseDate(stringDate) { //as string like "Wed, 21 Jun 2017 18:39:35 -0700"
        var _date = new Date(stringDate);
        if (_date.getDate() === new Date().getDate()) {
            return extractTime(_date);
        } else {
            return toShortDate(_date);
        }
    }

    function extractTime(date) {
        var time = date.toLocaleString('es-PE', { hour: 'numeric', minute: 'numeric', hour12: true });
        return time.replace("p. m.", "PM").replace("a. m.", "AM");
    }
    function toShortDate(date) {
        return date.toLocaleString('es-PE', { day: 'numeric', month: 'long' });
    }

         function countdown(fechaevento) {
             return fechaevento;
         }

         function calendariolocal() {

             /*fetch('https://smartmirrorlg.azurewebsites.net/api/Values')
                 .then(function(response) {
                     return response.json();
                 })
                 .then(function(data) {
                     var correo = "";
                     var correo4 = "";
                     for (var i = 0; i < 5; i++) {
                         /*var d = new Date(data.events[i].date);
                              var time = d.toLocaleString("en-US");
                               var conversion = countdown(time);

                         var fecha = data.events[i].date;
                         var descripcion = data.events[i].desc;
                         if (data.labels[i].desc.length > 90) {
                             correo = data.labels[i].desc.substring(0, 87) + "...";
                         } else {
                             correo = data.labels[i].desc;
                         }

                         var correo2 = data.labels[i].from;
                         var correo3 = data.labels[i].date;
                         if (data.labels[i].desc.length > 90) {
                             correo4 = data.labels[i].subject.substring(0, 87) + "...";
                         } else {
                             correo4 = data.labels[i].subject;
                         }

                         if (i == 0) {
                             /*$("#f0").html(fecha);
                             $("#c0").html(descripcion);
                             //$("#e0").html(correo);
                             //$("#ci11").html(correo4);
                             $("#ci12").html(correo2);
                             $("#ci13").html(correo3);
                             $("#ci14").html(correo);

                         }
                         if (i == 1) {
                             $("#f1").html(fecha);
                             $("#c1").html(descripcion);
                             //$("#e1").html(correo);
                             $("#ci21").html(correo4);
                             $("#ci22").html(correo2);
                             $("#ci23").html(correo3);
                             $("#ci24").html(correo);
                         }
                         if (i == 2) {
                             $("#f2").html(fecha);
                             $("#c2").html(descripcion);
                             //$("#e2").html(correo);
                             $("#ci31").html(correo4);
                             $("#ci32").html(correo2);
                             $("#ci33").html(correo3);
                             $("#ci34").html(correo);

                         }
                         if (i == 3) {
                             $("#f3").html(fecha);
                             $("#c3").html(descripcion);
                             //$("#e3").html(correo);
                             $("#ci41").html(correo4);
                             $("#ci42").html(correo2);
                             $("#ci43").html(correo3);
                             $("#ci44").html(correo);
                         }
                         if (i == 4) {
                             $("#f4").html(fecha);
                             $("#c4").html(descripcion);
                             //$("#e4").html(correo);
                         }
                     }


                 })
                 .catch(function(err) {
                     console.log(err);
                 });

             //}, 2000); */
         }
         function serviciosHotel(){
            $.ajax({
                method: "GET",
                url: "https://tp-ires-api.azurewebsites.net/v1/services",
                crossDomain: true,
                dataType: 'json',
            }). done (function(data) {
                var servicio = data.result.list;
                for(var i = 0; i < servicio.length; i++){
                    var service1 = servicio[0];
                    var service2 = servicio[1];
                    var service3 = servicio[2];
                    var service4 = servicio[3];

                    var nameService1 = service1.name;
                    var nameService2 = service2.name;
                    var nameService3 = service3.name;
                    var nameService4 = service4.name;

                    var serType1 = service1.serviceType.name;
                    var serType2 = service2.serviceType.name;
                    var serType3 = service3.serviceType.name;
                    var serType4 = service4.serviceType.name;

                    var htmlView = '<label  style = "color: white; font-family: b-light-condensed; font-size: 24px; margin-left: 30px; display: inline-block;">'+ serType1+'</label>'
                                + '<label style = "color: white; font-family: b-medium; font-size: 24px; margin-left: 25px; margin-left: 5px;">' + nameService1 + '</label> </br>'
                                +'<label  style = "color: white; font-family: b-light-condensed; font-size: 24px; margin-left: 30px; display: inline-block;">'+ serType2+'</label>'
                                + '<label style = "color: white; font-family: b-medium; font-size: 24px; margin-left: 25px; margin-left: 5px;">' + nameService2 + '</label> </br>'
                                +'<label  style = "color: white; font-family: b-light-condensed; font-size: 24px; margin-left: 30px; display: inline-block;">'+ serType3+'</label>'
                                + '<label style = "color: white; font-family: b-medium; font-size: 24px; margin-left: 25px; margin-left: 5px;">' + nameService3 + '</label> </br>'
                                +'<label  style = "color: white; font-family: b-light-condensed; font-size: 24px; margin-left: 30px; display: inline-block;">'+ serType4+'</label>'
                                + '<label style = "color: white; font-family: b-medium; font-size: 24px; margin-left: 25px; margin-left: 5px;">' + nameService4 + '</label>';

                    $('#HotelService').html(htmlView);
                }
            });
         }


         function noti() {
             $.ajax({
                     method: "GET",
                     url: "https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Frpp.pe%2Ffeed%2Fperu%2Flima&api_key=pv54wn7elprq9yglfriyjj0efvh5sdtrrhmsjyjf",
                     crossDomain: true,
                     dataType: 'jsonp',

                 })
                 .done(function(data) {

                     var full = "";
                     var noticias = data.items;

                     for (var i = 0; i < noticias.length; i++) {
                         var efect = "";
                         var temp = "";
                         var noti = noticias[i];
                         var title = noti.title;
                         var foto = noti.enclosure.link;
                         var desc = noti.description;
                         if (title.length <= 67) {
                             temp = title;
                         } else {
                             temp = noti.title.substring(0, 64) + "...";
                             efect = "";
                             // effect prueba
                         }

                         if (i == 0) {
                             //full = full + '<div class="carousel-item active"> <img src="'+ foto +'" style="height: 250px; width:220px; float:left;" /> <label style ="color: white;display:table;font-size: 20px;margin-left: 234px;margin-top:-6px;font-family: &quot;b-medium&quot;height: 87px; word-wrap:break-word;"> ' + title +' </label> <label style = "display:block; word-wrap:break-word; color: white; font-family: &quot;b-light-condensed&quot;; margin-left: 234px;margin-top:-7px; height: 100px;">'+ desc+' </label> </div>';
                             full = full + '<div class="carousel-item active"> <div style="display: inline;"><img src="' + foto + '" style="height: 150px; width: 200px;" /></div>  <div style="color: white;font-size: 20px;font-family: &quot;b-medium&quot;;float: right;word-break: break-all;display: inline;margin-left: 203px;margin-top: -153px;"> <p  class=' + efect + '>' + temp + ' </p></div>       <div style="color: white;font-size: 14px;font-family: &quot;b-light-condensed&quot;;margin-left: 203px;margin-top: -55px;height: 63px;word-break: break-word;float:left">' + desc + '</div></div>';
                         } else {
                             //full = full + '<div class="carousel-item"> <img src="'+ foto +'" style="height: 250px; width:220px; float:left;" /> <label style ="color: white;display:table;font-size: 20px;margin-left: 234px;margin-top:-6px;font-family: &quot;b-medium&quot; height: 87px; word-wrap:break-word;"> ' + title +' </label> <label style = "display:block; color: white; font-family: &quot;b-light-condensed&quot;; margin-left: 234px;margin-top:-7px; height: 100px; word-wrap:break-word;">'+ desc+' </label> </div>';
                             full = full + '<div class="carousel-item"> <div style="display: inline;"><img src="' + foto + '" style="height: 150px; width: 200px;" /></div>  <div style="color: white;font-size: 20px;font-family: &quot;b-medium&quot;;float: right;word-break: break-all;display: inline;margin-left: 203px;margin-top: -153px;"> <p  class=' + efect + '>' + temp + ' </p></div>       <div style="color: white;font-size: 14px;font-family: &quot;b-light-condensed&quot;;margin-left: 203px;margin-top: -55px;height: 63px;word-break: break-word;float:left">' + desc + '</div></div>';

                         }


                     }
                     $("#333").html('<div id="carouselExampleControls" style="margin-left: 25px;" class="carousel slide" data-ride="carousel"> <div class="carousel-inner">' + full + '</div> <a class="hidden carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev"> <span class="carousel-control-prev-icon" aria-hidden="true"></span"> <span class="sr-only">Previous</span> </a> <a class="hidden carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next"> <span class="carousel-control-next-icon" aria-hidden="true"></span> <span class="sr-only">Next</span> </a> </div>')
                     $('.carousel').carousel({ interval: 4000 });
                 });

         }

         function darFormatoAldia(day, month, year) {
             var formato = "";
             switch (day) {
                 case "clear-day":
                     info.set('asideBlock11Content1', jsonData.climaSunny);
                 case "clear-night":
                     info.set('asideBlock11Content1', jsonData.climaCloudy);
                 case "rain":
                     info.set('asideBlock11Content1', jsonData.climaRain);
                 case "snow":
                     info.set('asideBlock11Content1', jsonData.climaSunny);

                 case "sleet":
                     info.set('asideBlock11Content1', jsonData.climaCloudy);
                 case "wind":
                     info.set('asideBlock11Content1', jsonData.climaCloudy);

                 case "fog":
                     info.set('asideBlock11Content1', jsonData.climaCloudy);

                 case "cloudy":
                     info.set('asideBlock11Content1', jsonData.climaCloudy);
                 case "partly-cloudy-day":
                     info.set('asideBlock11Content1', jsonData.climaCloudy);

                 case "partly-cloudy-night":
                     info.set('asideBlock11Content1', jsonData.climaCloudy);

                 default:
                     info.set('asideBlock11Content1', jsonData.climaSunny);
             }
         }


        function GetWeather(){
             $.ajax({
                     method: "GET",
                     url: "https://api.darksky.net/forecast/7af51a01e29c8ddb7a548fad3cf35a05/-12.193731,-76.708493?units=si",
                     crossDomain: true,
                     dataType: 'jsonp',

                 })
                 .done(function(data) {

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


                     /*getCurrency("USD", "PEN", "#111", 'https://marketdata.websol.barchart.com/getQuote.json?apikey=9af5e536b99470ee509a7a4c0e1e0f06&symbols=ZC*1,IBM,GOOGL,ADES,EEUU,ADES,ASIX,AEGN,AMTX,APD,AKS,AIN,ALB,ATI,AMRK,AMRC,AVD,AMWD,AMRS,AQMS,RKDA,AGX,ATIS,ATISW,AXTA,%5EEURUSD');
                     getCurrency("EUR", "PEN", "#222", 'https://marketdata.websol.barchart.com/getQuote.json?apikey=9af5e536b99470ee509a7a4c0e1e0f06&symbols=ZC*1,ACH,APWC,BHP,BAK,EVGN,MT,CSTM,GOLD,TS,LYB,TX,TS,UN,UL,RIO,PKX,SHI,TANH,NEWA,GURE,%5EEURUSD');
                     */  
                     $("#tablaClima").html(html);

                     changeiconTitle(data.currently.icon, Math.round(data.currently.temperature));

                     var html2 = changeicon2(data.currently.icon, Math.round(data.currently.temperature));


                     $("#logoClima").html(html2);

                 });

        }


         function getCurrency(from, to, textdesign, urls) {
             $.ajax({
                     method: "GET",
                     //url: "https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency="+from+"&to_currency="+to+"&apikey=2AS9DR6NX2GY2SW5",
                     url: urls,

                     crossDomain: true,
                     dataType: 'json',
                     async: true,

                 })
                 .done(function(data) {

                     var results1 = data.results;
                     var full = ""
                     for (var i = 0; i < results1.length; i++) {

                         var open1 = data.results[i].open

                         var close1 = data.results[i].close
                         var result = ((Math.round(close1 * 100 - open1 * 100)) / 100).toFixed(2)

                         if (result > 0) {
                             result = '<p style="color: green; display:inline;">↑</p>' + result
                         } else if (result == 0) {
                             result = '<p style="color: blue; display:inline;">-</p>' + result
                         } else if (result < 0) {
                             result = '<p style="color: red; display:inline;">↓</p>' + Math.abs(result)
                         }

                         full = full + " " + data.results[i].symbol + result + " "


                     }
                     $(textdesign).html('<marquee direction="left" scrolldelay="100" behavior="scroll">' + full + '</marquee>');
                     $(textdesign).html('<marquee direction="left" scrolldelay="100" behavior="scroll">' + full + '</marquee>');

                 });
         }

         function updateTime() {
             var dt = new Date();
             var time = dt.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
             info.set('asideBlock1Content1', time);
         }


         function bindData(jsonData) {
            

             info = new BindClass('templateSix');

             updateTime();
             noti();
             calendariolocal();
             serviciosHotel();
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
             window.setInterval(serviciosHotel, 10000);


             $.ajax({
                     method: "GET",
                     url: "https://api.darksky.net/forecast/7af51a01e29c8ddb7a548fad3cf35a05/-12.193731,-76.708493?units=si",
                     crossDomain: true,
                     dataType: 'jsonp',

                 })
                 .done(function(data) {

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


                     /*getCurrency("USD", "PEN", "#111", 'https://marketdata.websol.barchart.com/getQuote.json?apikey=9af5e536b99470ee509a7a4c0e1e0f06&symbols=ZC*1,IBM,GOOGL,ADES,EEUU,ADES,ASIX,AEGN,AMTX,APD,AKS,AIN,ALB,ATI,AMRK,AMRC,AVD,AMWD,AMRS,AQMS,RKDA,AGX,ATIS,ATISW,AXTA,%5EEURUSD');
                     getCurrency("EUR", "PEN", "#222", 'https://marketdata.websol.barchart.com/getQuote.json?apikey=9af5e536b99470ee509a7a4c0e1e0f06&symbols=ZC*1,ACH,APWC,BHP,BAK,EVGN,MT,CSTM,GOLD,TS,LYB,TX,TS,UN,UL,RIO,PKX,SHI,TANH,NEWA,GURE,%5EEURUSD');
                       */ 
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

                     $("#logoClima").html(html2);

                 });


             info.set('borderClima', jsonData.borderClima);
             /* Header Div */
             info.set('headerImage', jsonData.headerImage);
             /* Showcase Div */
             info.set('showcaseImg', jsonData.showcaseImg);
             info.set('heading1', jsonData.heading1);
             info.set('heading2', jsonData.heading2);
             info.set('heading3', jsonData.heading3);
             info.set('showcaseContent', jsonData.showcaseContent);
             /* Image Text Overlay */
             info.set('bannerImg', jsonData.bannerImg);
             info.set('NowNewsImage', jsonData.NowNewsImage);

             info.set('NowPlayingImage', jsonData.NowPlayingImage);
             info.set('bannerImgOverlayText', jsonData.bannerImgOverlayText);
             info.set('bannerImgOverlayContent', jsonData.bannerImgOverlayContent);
             /* Section Div */
             info.set('textSectionH1', jsonData.textSectionH1);
             info.set('textSectionH2', jsonData.textSectionH2);
             info.set('textSectionH3', jsonData.textSectionH3);
             info.set('textSectionH4', jsonData.textSectionH4);
             /* Side Div - 8 Blocks */
             // Block 1

             info.set('asideBlock1Content2', jsonData.asideBlock1Content2);

             // Block 2
             info.set('notificationtext', jsonData.notificationtext);
             info.set('notification0text', jsonData.notification0text);
             info.set('notification1text', jsonData.notification1text);
             info.set('notification2text', jsonData.notification2text);
             info.set('notification3text', jsonData.notification3text);
             info.set('notification4text', jsonData.notification4text);

             info.set('asideBlock3Content2', jsonData.asideBlock3Content2);
             info.set('asideBlock3Content3', jsonData.asideBlock3Content3);
             // Block 4
             info.set('asideBlock4Content1', jsonData.asideBlock4Content1);
             info.set('asideBlock4Content2', jsonData.asideBlock4Content2);
             info.set('asideBlock4Content3', jsonData.asideBlock4Content3);
             // Block 5
             info.set('asideBlock5Content1', jsonData.asideBlock5Content1);
             info.set('asideBlock5Content2', jsonData.asideBlock5Content2);
             info.set('asideBlock5Content3', jsonData.asideBlock5Content3);
             // Block 6
             info.set('asideBlock6Content1', jsonData.asideBlock6Content1);
             info.set('asideBlock6Content2', jsonData.asideBlock6Content2);
             info.set('asideBlock6Content3', jsonData.asideBlock6Content3);
             // Block 7
             info.set('asideBlock7Content1', jsonData.asideBlock7Content1);
             info.set('asideBlock7Content2', jsonData.asideBlock7Content2);
             info.set('asideBlock7Content3', jsonData.asideBlock7Content3);
             // Block 8
             info.set('asideBlock8Content1', jsonData.asideBlock8Content1);
             info.set('asideBlock8Content2', jsonData.asideBlock8Content2);
             info.set('asideBlock8Content3', jsonData.asideBlock8Content3);


             // Block 11
             info.set('asideBlock11Content1', jsonData.asideBlock11Content1);
             info.set('asideBlock11Content2', jsonData.asideBlock11Content2);
             info.set('asideBlock11Content3', jsonData.asideBlock11Content3);
             // Block 2
             info.set('asideBlock12Content1', jsonData.asideBlock12Content1);
             info.set('asideBlock12Content2', jsonData.asideBlock12Content2);
             info.set('asideBlock12Content3', jsonData.asideBlock12Content3);
             // Block 3
             info.set('asideBlock13Content1', jsonData.asideBlock13Content1);
             info.set('asideBlock13Content2', jsonData.asideBlock13Content2);
             info.set('asideBlock13Content3', jsonData.asideBlock13Content3);
             // Block 4
             info.set('asideBlock14Content1', jsonData.asideBlock14Content1);
             info.set('asideBlock14Content2', jsonData.asideBlock14Content2);
             info.set('asideBlock14Content3', jsonData.asideBlock14Content3);

             info.set('asideBlock13Content2X', jsonData.asideBlock13Content2X);
             info.set('asideBlock13Content3X', jsonData.asideBlock13Content3X);
             // Block 4
             info.set('asideBlock14Content1X', jsonData.asideBlock14Content1X);
             info.set('asideBlock14Content2X', jsonData.asideBlock14Content2X);
             info.set('asideBlock14Content3X', jsonData.asideBlock14Content3X);



             // Block 5
             info.set('asideBlock15Content1', jsonData.asideBlock15Content1);
             info.set('asideBlock15Content2', jsonData.asideBlock15Content2);
             info.set('asideBlock15Content3', jsonData.asideBlock15Content3);
             // Block 6
             info.set('asideBlock16Content1', jsonData.asideBlock16Content1);
             info.set('asideBlock16Content2', jsonData.asideBlock16Content2);
             info.set('asideBlock16Content3', jsonData.asideBlock16Content3);
             // Block 7
             info.set('asideBlock17Content1', jsonData.asideBlock17Content1);
             info.set('asideBlock17Content2', jsonData.asideBlock17Content2);
             info.set('asideBlock17Content3', jsonData.asideBlock17Content3);
             // Block 8
             info.set('asideBlock18Content1', jsonData.asideBlock18Content1);
             info.set('asideBlock18Content2', jsonData.asideBlock18Content2);
             info.set('asideBlock18Content3', jsonData.asideBlock18Content3);
         }
         /**
          * Represents Ajax Reauest.
          * @method loadDoc
          * @param {string} method - method of the request.
          * @param {string} url - url of the request.
          */
         function loadDoc(method, url) {
             var req = new XMLHttpRequest();
             req.open(method, url, true);
             req.onload = function() {
                 dataSet = JSON.parse(req.responseText);
                 bindData(dataSet);
             };
             req.onerror = function() {
                 throw 'Cannot load file ' + url;
             };
             req.send();
         }
         /** @function */
         loadDoc('GET', 'data/data.json');



     }());