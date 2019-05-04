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

         //var proxyurl = "https://cors-anywhere.herokuapp.com/";
         var proxyurl = "";
         var urlpost = proxyurl + 'http://edumoreno27-001-site2.etempurl.com/GetGadgetStatusSmart';

         var urlpost2 = proxyurl + 'http://edumoreno27-001-site2.etempurl.com/GetUser';

         var urlpost3 = proxyurl + 'http://edumoreno27-001-site2.etempurl.com/GetGadgetOrderSmart';

         var urlpost4 = proxyurl + 'http://edumoreno27-001-site2.etempurl.com/UpdateBooleans';

         var urlpost5 = proxyurl + 'http://edumoreno27-001-site2.etempurl.com/SaveDiaries';
         var urlpost6 = proxyurl + 'http://edumoreno27-001-site2.etempurl.com/GetDiaries';

         var urlpost7 = proxyurl + 'http://edumoreno27-001-site2.etempurl.com/SaveDiaryInformations';

         var urlpost8 = proxyurl + 'http://edumoreno27-001-site2.etempurl.com/SaveEmailInformations';

         var urlpost9 = proxyurl + 'http://edumoreno27-001-site2.etempurl.com/GetEmailInformations2';

         var urlpost11 = proxyurl +'http://edumoreno27-001-site2.etempurl.com/GetHotelServices'

         var urlpost12 = proxyurl +'http://edumoreno27-001-site2.etempurl.com/GetMusicAction'

         var urlpost13 = proxyurl +'http://edumoreno27-001-site2.etempurl.com/GetMusicActionWithoutUser'
            
         var UsuarioID = undefined;
         var RefreshToken = undefined;

         var ArregloCorreo = [];
         var TamanioInicial = 0;
         var TamanioInicialCorreo = 0;
         var agendaData;

         function UpdateBooleans(idesito) {
             var enviar2 = JSON.stringify({ "id": idesito });

             eventoPost(urlpost4, enviar2, function(data) {

             });
         }


         function SaveDiaryInformation(idesito, objeto) {
             var enviar2 = JSON.stringify({ "userId": idesito, "objectReference": objeto });

             eventoPost(urlpost7, enviar2, function(data) {

             });
         }



         function SaveEmailInformation(idesito, objeto) {
             var enviar2 = JSON.stringify({ "userId": idesito, "objectReference": objeto });

             eventoPost(urlpost8, enviar2, function(data) {

             });
         }

         function GuardarIndexAgenda(parametro1, parametro2) {

             var enviar3 = JSON.stringify({ "userId": parametro1, "list": parametro2 });

             eventoPost(urlpost5, enviar3, function(data) {
                 // var arreglo = JSON.parse(data);


             });
         }

         var orderAgenda = [];
         var orderCorreos = [];

         function obtenerUsuario() {
             var enviar = JSON.stringify({ "mirrorId": 1 });

             eventoPost(urlpost2, enviar,
                 function(data) {

                     var usuario = JSON.parse(data);
                     UsuarioID = usuario.id;
                     if(UsuarioID == undefined){
                            window.setInterval(ObtenerAccionMusica2, 1000);
                                
                        }else{
                            console.log("Music");
                            window.setInterval(ObtenerAccionMusica, 1000);
                        }
                     serviciosHotel();
                     UpdateBooleans(UsuarioID);
                     RefreshToken = usuario.refreshtoken;
                     console.log(UsuarioID);
                     console.log(RefreshToken);
                     getGoogleData(RefreshToken, function(data) {
                         var indexIncrement = 0
                         console.log("Agenda: ", data);
                         agendaData = data;
                         orderAgenda = [];
                         //for(var i = data.length-5; i< data.length; i++){
                         //Validacion de fechas para agenda
                         validateDatesAgenda(data, indexIncrement);
                         TamanioInicial = orderAgenda.length;
                         GuardarIndexAgenda(UsuarioID, orderAgenda);
                     }, function(data1) {

                         var correo = data1;

                         ArregloCorreo.push(correo);
                         console.log("tamanio", ArregloCorreo.length);
                         //var string = '<div class="carousel-item"><label class="carrouselAsunto" style = "color: white; font-family: b-medium; font-size: 20px;">'+ temp +'</label> <label class="carrouselFrom" style="word-break: break-word; float: left; display: inline-block; margin-left: 5px;">'+ correo.sender +'</label><label class="carrouselDate">'+ fecha_formateada +'</label><label class="carrouselDesc" >'+ correo.message +'</label></div>';
                         if (ArregloCorreo.length == 5) {
                             for (var j = 0; j < ArregloCorreo.length; j++) {
                                 var temp = "";
                                 if (ArregloCorreo[j].subject.length <= 45) {
                                     temp = ArregloCorreo[j].subject;
                                 } else {
                                     temp = ArregloCorreo[j].subject.substring(0, 44) + "...";
                                 }

                                 var timeItem = new Date(ArregloCorreo[j].sendAt);
                                 var correoTime = ArregloCorreo[j].sendAt;

                                 var dias = ["Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sábado"];
                                 var dia = timeItem.getDate();
                                 var formatedTime = timeItem.toLocaleTimeString('en-PE', { hour: '2-digit', minute: '2-digit', hour12: true });
                                 var fecha_formateada = dias[timeItem.getUTCDay()] + ', ' + formatedTime;
                                 var string = '<div id="email' + j.toString() + '" class="carousel-item"><label class="carrouselAsunto" style = "color: white; font-family: b-medium; font-size: 20px;">' + temp + '</label> <label class="carrouselFrom" style="word-break: break-all; float: left; display: inline-block; margin-left: 5px;">' + ArregloCorreo[j].sender + '</label><label class="carrouselDate">' + fecha_formateada + '</label><label class="carrouselDesc" >' + ArregloCorreo[j].message + '</label></div>';
                                 $("#elements").append(string);
                                 $("#elements .carousel-item").first().addClass('active');
                             }
                             console.log("INGRESO A INICIAR EL CARRUSEL");
                             console.log("PRIMER OBJETO", ArregloCorreo[0]);
                             var objeto = {
                                 sender: ArregloCorreo[0].sender,
                                 subject: ArregloCorreo[0].subject,
                                 senderAt: ArregloCorreo[0].sendAt,
                                 message: ArregloCorreo[0].message
                             }

                             SaveEmailInformation(UsuarioID, objeto);

                             $('#correoCarousel').carousel({ interval: 6000 });

                             $('#correoCarousel').on('slid.bs.carousel', function(e) { console.log("SLIDING") });
                             $('#correoCarousel').bind('slid.bs.carousel', function(e) {
                                 console.log("SLIDING CORREO");
                                 var objeto = {
                                     sender: ArregloCorreo[e.to].sender,
                                     subject: ArregloCorreo[e.to].subject,
                                     senderAt: ArregloCorreo[e.to].sendAt,
                                     message: ArregloCorreo[e.to].message
                                 }

                                 SaveEmailInformation(UsuarioID, objeto);
                             });
                         }

                     });
                 });
         }

         obtenerUsuario();
         console.log(ArregloCorreo);


         function validateDatesAgenda(data, indexIncrement) {
             for (var i = 0; i < data.length; i++) {
                 orderAgenda.push(i);
                 var agenda1 = agendaData[i];
                 var d = new Date(agenda1.start.dateTime);
                 var d2 = new Date(agenda1.start.dateTime);
                 var time = d.toLocaleString("en-PE");
                 var today = new Date();

                 var timeToday = today.toLocaleString("en-PE");
                 console.log("FechaFormato", time);
                 console.log("Fecha Hoy", timeToday);
                 var difference_ms = today.getTime() - d.getTime();

                 var difference_hr = today.getHours() - d.getHours();
                 var difference_minute = today.getMinutes() - d.getMinutes();
                 var difference_day = d.getDate() - today.getDate();


                 difference_ms = difference_ms / 1000;
                 var seconds = Math.floor(difference_ms % 60);

                 difference_ms = difference_ms / 60;
                 var hours = Math.floor(difference_hr % 12);
                 var days = Math.floor(difference_ms / 24);

                 var serviocAgenda1 = agenda1.summary;
                 var htmlAgenda;
                 var variableTimer = d.toLocaleTimeString('en-PE', { hour: '2-digit', minute: '2-digit', hour12: true });
                 var variableTimerMinutes = d2.toLocaleTimeString('en-PE', { minute: '2-digit' });
                 var jsonHours = d.toLocaleTimeString('en-PE', { hour: '2-digit' });
                 var todayDataHour = today.toLocaleTimeString('en-PE', { hour: '2-digit' });
                 console.log("Hora siguiente: ", jsonHours + 1);

                 var variable = undefined;
                 if (today.getDate() == d.getDate()) {

                     if (hours <= 0) {
                         hours *= -1;
                         if (jsonHours == todayDataHour) {
                             if (difference_minute <= 0) {
                                 variable = "En " + difference_minute + " minutos";
                                 difference_minute *= -1;
                                 htmlAgenda = '<label  style = "color: white; font-family: b-light-condensed; font-size: 24px; display: inline-block;">' + "En " + difference_minute + " minutos" + '</label>' +
                                     '<label style = "color: white; font-family: b-medium; font-size: 24px; margin-left: 25px; margin-left: 5px;">' + serviocAgenda1 + '</label> </br>'
                             }

                         } else if (d.getHours() >= 12) {
                             variable = "Hoy " + variableTimer;
                             htmlAgenda = '<label  style = "color: white; font-family: b-light-condensed; font-size: 24px; display: inline-block;">' + "Hoy " + variableTimer + '</label>' +
                                 '<label style = "color: white; font-family: b-medium; font-size: 24px; margin-left: 25px; margin-left: 5px;">' + serviocAgenda1 + '</label> </br>'
                         } else if (d.getHours() <= 12) {
                             variable = "Hoy " + variableTimer;
                             htmlAgenda = '<label  style = "color: white; font-family: b-light-condensed; font-size: 24px; display: inline-block;">' + "Hoy " + variableTimer + '</label>' +
                                 '<label style = "color: white; font-family: b-medium; font-size: 24px; margin-left: 25px; margin-left: 5px;">' + serviocAgenda1 + '</label> </br>'
                         }
                     } else {
                         if (d.getHours() >= 12) {
                             variable = "Hoy " + variableTimer;
                             htmlAgenda = '<label  style = "color: white; font-family: b-light-condensed; font-size: 24px; display: inline-block;">' + "Hoy " + variableTimer + '</label>' +
                                 '<label style = "color: white; font-family: b-medium; font-size: 24px; margin-left: 25px; margin-left: 5px;">' + serviocAgenda1 + '</label> </br>'
                         } else if (d.getHours() <= 12) {
                             variable = "Hoy " + variableTimer;
                             htmlAgenda = '<label  style = "color: white; font-family: b-light-condensed; font-size: 24px; display: inline-block;">' + "Hoy " + variableTimer + '</label>' +
                                 '<label style = "color: white; font-family: b-medium; font-size: 24px; margin-left: 25px; margin-left: 5px;">' + serviocAgenda1 + '</label> </br>'
                         }
                     }
                 } else if (d.getDate() > today.getDate()) {
                     if (difference_day == 1) {
                         if (hours <= 0) {
                             hours *= -1;
                             if (d.getHours() >= 12) {
                                 variable = "Mañana " + variableTimer;
                                 htmlAgenda = '<label  style = "color: white; font-family: b-light-condensed; font-size: 24px; display: inline-block;">' + "Mañana " + variableTimer + '</label>' +
                                     '<label style = "color: white; font-family: b-medium; font-size: 24px; margin-left: 25px; margin-left: 5px;">' + serviocAgenda1 + '</label> </br>'
                             } else if (d.getHours() <= 12) {
                                 variable = "Mañana " + variableTimer;
                                 htmlAgenda = '<label  style = "color: white; font-family: b-light-condensed; font-size: 24px; display: inline-block;">' + "Mañana " + variableTimer + '</label>' +
                                     '<label style = "color: white; font-family: b-medium; font-size: 24px; margin-left: 25px; margin-left: 5px;">' + serviocAgenda1 + '</label> </br>'
                             }
                         }
                         if (hours >= 0) {
                             if (d.getHours() >= 12) {
                                 variable = "Mañana " + variableTimer;
                                 htmlAgenda = '<label  style = "color: white; font-family: b-light-condensed; font-size: 24px; display: inline-block;">' + "Mañana " + variableTimer + '</label>' +
                                     '<label style = "color: white; font-family: b-medium; font-size: 24px; margin-left: 25px; margin-left: 5px;">' + serviocAgenda1 + '</label> </br>'
                             } else if (d.getHours() <= 12) {
                                 variable = "Mañana " + variableTimer;
                                 htmlAgenda = '<label  style = "color: white; font-family: b-light-condensed; font-size: 24px; display: inline-block;">' + "Mañana " + variableTimer + '</label>' +
                                     '<label style = "color: white; font-family: b-medium; font-size: 24px; margin-left: 25px; margin-left: 5px;">' + serviocAgenda1 + '</label> </br>'
                             }
                         }
                     } else {
                         variable = "En " + difference_day + " días";
                         htmlAgenda = '<label  style = "color: white; font-family: b-light-condensed; font-size: 24px; display: inline-block;">' + "En " + difference_day + " días" + '</label>' +
                             '<label style = "color: white; font-family: b-medium; font-size: 24px; margin-left: 25px; margin-left: 5px;">' + serviocAgenda1 + '</label> </br>'

                     }

                 }
                 agendaData[i].horatransformada = variable;
                 var stringNumber = "#f" + indexIncrement.toString();
                 $(stringNumber).html(htmlAgenda);
                 indexIncrement++;
             }
             return indexIncrement;
         }

         function validarHoraAgendaDetalle(today, dayJson) {
             var htmlDescripcion
             var difference_minute = today.getMinutes() - dayJson.getMinutes();
             var difference_day = dayJson.getDate() - today.getDate();
             var difference_hr = today.getHours() - dayJson.getHours();

             var jsonHours = dayJson.toLocaleTimeString('en-PE', { hour: '2-digit' });
             var todayDataHour = today.toLocaleTimeString('en-PE', { hour: '2-digit' });
             var difference_hr = today.getHours() - dayJson.getHours();
             var hours = Math.floor(difference_hr % 12);
             var variableTimer = dayJson.toLocaleTimeString('en-PE', { hour: '2-digit', minute: '2-digit', hour12: true });;
             var variable;
             if (today.getDate() == dayJson.getDate()) {

                 if (hours <= 0) {
                     hours *= -1;
                     if (jsonHours == todayDataHour) {
                         if (difference_minute <= 0) {
                             difference_minute *= -1;
                             variable = "En " + difference_minute + " minutos";

                         }

                     } else if (dayJson.getHours() >= 12) {
                         variable = "Hoy " + variableTimer;
                     } else if (dayJson.getHours() <= 12) {
                         variable = "Hoy " + variableTimer;
                     }
                 } else {
                     if (dayJson.getHours() >= 12) {
                         variable = "Hoy " + variableTimer;
                     } else if (dayJson.getHours() <= 12) {
                         variable = "Hoy " + variableTimer;
                     }
                 }
             } else if (dayJson.getDate() > today.getDate()) {
                 if (difference_day == 1) {
                     if (hours <= 0) {
                         hours *= -1;
                         if (dayJson.getHours() >= 12) {
                             variable = "Mañana " + variableTimer;
                         } else if (d.getHours() <= 12) {
                             variable = "Mañana " + variableTimer;
                         }
                     }
                     if (hours >= 0) {
                         if (dayJson.getHours() >= 12) {
                             variable = "Mañana " + variableTimer;
                         } else if (dayJson.getHours() <= 12) {
                             variable = "Mañana " + variableTimer;
                         }
                     }
                 } else {
                     variable = "En " + difference_day + " días";

                 }

             }
             return variable;
         }

         function ontenerParametroAgenda(indice) {

             console.log("OrderAgendaRecibida", indice);

             var index = indice;
             var sumary = "";
             var description = "";
             var location = "";
             var botDesLoc = "";

             console.log("index", index)


             //ESTE OBJ ES EL QUE VAS A MOSTRAR
             var obj = agendaData[index];
             console.log("obj", obj);

             var dayJson = new Date(obj.start.dateTime);
             console.log("Dia json: ", dayJson);
             var today = new Date();
             var valueHora = ""
             valueHora = validarHoraAgendaDetalle(today, dayJson);
             console.log("ValueHora", valueHora);


             var htmlDescripcion;
             $("#Agenda").hide(1000, function() {
                 sumary = "No se encuentra un detalle para la descripcion";
                 location = "No se encuentra un detalle para la localizacion";
                 if (obj.description === undefined && obj.location !== undefined) {
                     htmlDescripcion = '<div> <label  style = "color: white; font-family: b-medium; font-size: 24px; display: inline-block;">' + valueHora + ": " + '<label style = "color: white; font-family: b-medium; font-size: 24px; margin-left: 25px; margin-left: 5px;">' + obj.summary + "</label></div>" + "<div><p>" + obj.location + "</p></div>" + "<div><p>" + sumary + "</p></div>";
                 } else if (obj.location === undefined && obj.description !== undefined) {

                     htmlDescripcion = '<div> <label  style = "color: white; font-family: b-medium; font-size: 24px; display: inline-block;">' + valueHora + ": " + '<label style = "color: white; font-family: b-medium; font-size: 24px; margin-left: 25px; margin-left: 5px;">' + obj.summary + "</label></div>" + "<div><p>" + location + "</p></div>" + "<div><p>" + obj.description + "</p></div>"
                 } else if (obj.description === undefined && obj.location === undefined) {
                     htmlDescripcion = '<div> <label  style = "color: white; font-family: b-medium; font-size: 24px; display: inline-block;">' + valueHora + ": " + '<label style = "color: white; font-family: b-medium; font-size: 24px; margin-left: 25px; margin-left: 5px;">' + obj.summary + "</label></div>" + "<div><p>" + location + "</p></div>" + "<div><p>" + sumary + "</p></div>";
                 } else {
                     htmlDescripcion = '<div> <label  style = "color: white; font-family: b-medium; font-size: 24px; display: inline-block;">' + valueHora + ": " + '<label style = "color: white; font-family: b-medium; font-size: 24px; margin-left: 25px; margin-left: 5px;">' + obj.summary + "</label></div>" + "<div><p>" + obj.location + "</p></div>" + "<div><p>" + obj.description + "</p></div>"
                 }


                 $('#Agenda2').html(htmlDescripcion);
             });

             //ACA VA LA MAGIA DEL HTML

         }


         function obtenerEstadodefinitivo() {

             var enviar = JSON.stringify({ "id": UsuarioID });

             eventoPost(urlpost, enviar, function(data) {
                 var arreglo = JSON.parse(data);
                 if (arreglo.status) {

                 } else {
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

             var enviar = JSON.stringify({ "id": UsuarioID });

             eventoPost(urlpost3, enviar, function(data) {
                 // OBTENGO LA LISTA DE BOOLEANOS
                 var arreglo = JSON.parse(data);


                 if (arreglo.order) {

                 } else {

                     //OBTENIENDO HTML DE CADA GADGET
                     var bolsahtml = undefined;
                     var climahtml = undefined;
                     var horahtml = undefined;
                     var noticiashtml = undefined;
                     var agendahtml = undefined;
                     var correohtml = undefined;
                     var musicahtml = undefined;
                     var servicioshtml = undefined;
                     for (var a = 1; a < 9; a++) {
                         var element = '#Order' + a;

                         if ($(element).children()[0].id == 'Bolsa') {

                             bolsahtml = $(element).html();

                         } else if ($(element).children()[0].id == 'Clima') {

                             climahtml = $(element).html();
                             console.log(climahtml);

                         } else if ($(element).children()[0].id == 'Hora') {

                             horahtml = $(element).html();

                         } else if ($(element).children()[0].id == 'NoticiasContenedor') {

                             noticiashtml = $(element).html();

                         } else if ($(element).children()[0].id == 'Agenda') {

                             agendahtml = $(element).html();

                         } else if ($(element).children()[0].id == 'Correo') {

                             correohtml = $(element).html();

                         } else if ($(element).children()[0].id == 'Musica') {

                             musicahtml = $(element).html();
                         } else if ($(element).children()[0].id == 'HotelServiceContenedor') {

                             servicioshtml = $(element).html();

                         }



                     }



                     for (var j = 0; j < arreglo.length; j++) {
                         if (arreglo[j].contentHtml == 'Clima') {
                             $('#Order' + arreglo[j].order).html(climahtml);
                         }
                         if (arreglo[j].contentHtml == 'Bolsa') {
                             $('#Order' + arreglo[j].order).html(bolsahtml);
                         }
                         if (arreglo[j].contentHtml == 'Hora') {
                             $('#Order' + arreglo[j].order).html(horahtml);
                         }
                         if (arreglo[j].contentHtml == 'NoticiasContenedor') {
                             $('#Order' + arreglo[j].order).html(noticiashtml);
                         }
                         if (arreglo[j].contentHtml == 'Agenda') {
                             $('#Order' + arreglo[j].order).html(agendahtml);
                         }
                         if (arreglo[j].contentHtml == 'Correo') {
                             $('#Order' + arreglo[j].order).html(correohtml);
                         }
                         if (arreglo[j].contentHtml == 'Musica') {
                             $('#Order' + arreglo[j].order).html(musicahtml);
                         }
                         if (arreglo[j].contentHtml == 'HotelServiceContenedor') {
                             $('#Order' + arreglo[j].order).html(servicioshtml);
                         }

                     }
                     $('#elements').html('');
                     for (var k = 0; k < ArregloCorreo.length; k++) {
                         console.log('agregando coerreo');
                         var temp = "";
                         if (ArregloCorreo[k].subject.length <= 45) {
                             temp = ArregloCorreo[k].subject;
                         } else {
                             temp = ArregloCorreo[k].subject.substring(0, 44) + "...";
                         }

                         var timeItem = new Date(ArregloCorreo[k].sendAt);
                         var correoTime = ArregloCorreo[k].sendAt;

                         var dias = ["Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sábado"];
                         var dia = timeItem.getDate();
                         var formatedTime = timeItem.toLocaleTimeString('en-PE', { hour: '2-digit', minute: '2-digit', hour12: true });
                         var fecha_formateada = dias[timeItem.getUTCDay()] + ', ' + formatedTime;

                         var string = '<div id="email' + k.toString() + '" class="carousel-item"><label class="carrouselAsunto" style = "color: white; font-family: b-medium; font-size: 20px;">' + temp + '</label> <label class="carrouselFrom" style"word-break: break-all; float: left; display: inline-block; margin-left: 5px;">' + ArregloCorreo[k].sender + '</label><label class="carrouselDate">' + fecha_formateada + '</label><label class="carrouselDesc">' + ArregloCorreo[k].message + '</label></div>';
                         $("#elements").append(string);
                         $("#elements .carousel-item").first().addClass('active');

                     }
                     console.log("INGRESO A INICIAR EL CARRUSEL");
                     console.log("PRIMER OBJETO", ArregloCorreo[0]);
                     var objeto = {
                         sender: ArregloCorreo[0].sender,
                         subject: ArregloCorreo[0].subject,
                         senderAt: ArregloCorreo[0].sendAt,
                         message: ArregloCorreo[0].message
                     }

                     SaveEmailInformation(UsuarioID, objeto);

                     $('#correoCarousel').carousel({ interval: 6000 });
                     $('#carouselNews').carousel({ interval: 4000 });

                     $('#tablaClima').html('');
                     $('#correoCarousel').on('slid.bs.carousel', function(e) { console.log("SLIDING") });
                     $('#correoCarousel').bind('slid.bs.carousel', function(e) {
                         console.log("SLIDING CORREO");
                         var objeto = {
                             sender: ArregloCorreo[e.to].sender,
                             subject: ArregloCorreo[e.to].subject,
                             senderAt: ArregloCorreo[e.to].sendAt,
                             message: ArregloCorreo[e.to].message
                         }

                         SaveEmailInformation(UsuarioID, objeto);
                     });
                     GetWeather();

                 }


             });
         }

         // obtenerOrderfinitivo();
         //EJECUTO CADA SEGUNDO LA FUNCION PARA ACTUALIZAR EL ORDEN DE LOS GADGET
         window.setInterval(obtenerOrderfinitivo, 1000);

         function obtenerEmailInformationDefinitivo() {

             var enviar = JSON.stringify({ "userID": UsuarioID });

             eventoPost(urlpost9, enviar, function(data) {
                 var arreglo = JSON.parse(data);
                 if (arreglo.status == 1) {
                     $('#correoCarousel').carousel('pause');
                 } else if (arreglo.status == 2) {

                 } else if (arreglo.status == 3) {
                     $('#correoCarousel').carousel('cycle');
                 }

             });
         }

         window.setInterval(obtenerEmailInformationDefinitivo, 1000);

         function updateDiariesInfinite() {
             if (RefreshToken != undefined && TamanioInicial != 0) {

                 getGoogleData(RefreshToken, function(data) {
                     var nuevotamanio = data.length;
                     var booelanAgenda = false;

                     var today = new Date();
                     var dataToday = "";
                     var agendaDataToday = "";

                     for (var i = 0; i < data.length; i++) {
                         for (var j = 0; j < agendaData.length; j++) {
                             dataToday = data[i];
                             agendaDataToday = agendaData[j];

                             var oriDataToday = new Date(dataToday.start.dateTime);
                             var newDataToday = new Date(agendaDataToday.start.dateTime);
                             var difference_agendaData = today.getMinutes() - newDataToday.getMinutes();
                             var difference_data = today.getMinutes() - oriDataToday.getMinutes();
                             var jsonToday = today.toLocaleTimeString('en-PE', { hour: '2-digit' });
                             var jsonData = oriDataToday.toLocaleTimeString('en-PE', { hour: '2-digit' });
                             var jsonAgenData = newDataToday.toLocaleTimeString('en-PE', { hour: '2-digit' });

                             if (today.getDate() == oriDataToday.getDate()) {

                                 if (jsonToday === jsonAgenData || jsonToday === jsonData) {
                                     //booelanAgenda = true;
                                 }
                             }


                             if (data[i].id === agendaData[j].id) {
                                 if (data[i].summary !== agendaData[j].summary || data[i].description !== agendaData[j].description ||
                                     data[i].start.dateTime !== agendaData[j].start.dateTime || data[i].location !== agendaData[j].location) {
                                     booelanAgenda = true;
                                 }
                             }
                         }
                     }
                     if (nuevotamanio != TamanioInicial) {
                         booelanAgenda = true;
                     }

                     if (booelanAgenda) {
                         booelanAgenda = false;
                         for (var j = 0; j < TamanioInicial; j++) {
                             var stringNumber = "#f" + j.toString();
                             $(stringNumber).html("");
                         }

                         TamanioInicial = nuevotamanio;
                         var indexIncrement = 0;
                         agendaData = data;
                         orderAgenda = [];
                         //Validacion de fechas para agenda
                         validateDatesAgenda(data, indexIncrement);

                         GuardarIndexAgenda(UsuarioID, orderAgenda);
                     }
                 }, function(data1) {
                     // var correo = data1;  
                     // console.log(correo);
                     // var temp = correo.subject.substring(0, 45);

                     // var timeItem = new Date(correo.sendAt);
                     // var correoTime = correo.sendAt;

                     // var dias = ["Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sábado"];
                     // var dia = timeItem.getDate();
                     // var formatedTime = timeItem.toLocaleTimeString('en-PE', {hour: '2-digit', minute: '2-digit', hour12: true});
                     // var fecha_formateada = dias[timeItem.getUTCDay()] + ', ' + formatedTime ;  

                     // ArregloCorreo.push(correo);               
                     // //var string = '<div class="carousel-item"><label class="carrouselAsunto" style = "color: white; font-family: b-medium; font-size: 20px;">'+ temp +'</label> <label class="carrouselFrom" style="word-break: break-word; float: left; display: inline-block; margin-left: 5px;">'+ correo.sender +'</label><label class="carrouselDate">'+ fecha_formateada +'</label><label class="carrouselDesc" >'+ correo.message +'</label></div>';
                     // var string = '<div class="carousel-item"><label class="carrouselAsunto" style = "color: white; font-family: b-medium; font-size: 20px;">'+ temp +'</label> <label class="carrouselFrom" style="word-break: break-word; float: left; display: inline-block; margin-left: 5px;">'+ correo.sender +'</label><label class="carrouselDate">'+ fecha_formateada +'</label><label class="carrouselDesc" >'+ correo.message +'</label></div>';
                     // $('#elements').html('');
                     // $("#elements").append(string);   
                     // $("#elements .carousel-item").first().addClass('active');

                 });
                 // });  
             }
         }

         window.setInterval(updateDiariesInfinite, 2000);

         function obtenerDiaries() {

             var enviar = JSON.stringify({ "userId": UsuarioID });

             eventoPost(urlpost6, enviar, function(data) {
                 // OBTENGO LA LISTA DE BOOLEANOS
                 var arreglo = JSON.parse(data);

                 if (arreglo.respuesta == 1) {
                     $('#Agenda2').show();

                     var objeto1 = agendaData[arreglo.order];
                     var objetoenviar = {
                         summary: objeto1.summary,
                         location: objeto1.location,
                         description: objeto1.description,
                         dateTime: objeto1.horatransformada
                     }
                     console.log("SE GUARDO");
                     SaveDiaryInformation(UsuarioID, objetoenviar)
                     ontenerParametroAgenda(arreglo.order);

                 } else if (arreglo.respuesta == 2) {
                     $('#Agenda2').hide();
                     $('#Agenda').show();

                 } else {

                 }


             });
         }
         window.setInterval(obtenerDiaries, 1000);

          function obtenerHotelServices() {

             var enviar = JSON.stringify({ "userId": UsuarioID });
             console.log("Enviar user: ", enviar);
             eventoPost(urlpost11, enviar, function(data) {
                 // OBTENGO LA LISTA DE BOOLEANOS
                 var arreglo = JSON.parse(data);

                 if (arreglo.respuesta == 1) {
                     $('#HotelService2').show();

                     ontenerParametroHotel(arreglo.order);

                 } else if (arreglo.respuesta == 2) {
                     $('#HotelService2').hide();
                     $('#HotelService').show();

                 } else {

                 }


             });
         }
         window.setInterval(obtenerHotelServices, 1000);


         function ObtenerAccionMusica() {

             var enviar = JSON.stringify({ "mirrorId": 1, "userId": UsuarioID });
             console.log("Enviar user: ", enviar);
             eventoPost(urlpost12, enviar, function(data) {
                 // OBTENGO LA LISTA DE BOOLEANOS
                 var arreglo = JSON.parse(data);    

                 if(arreglo.status){
                    var stringrespuesta=arreglo.action.toLowerCase();
                    var indice= Number(localStorage.current);
                    switch (stringrespuesta){
                        case 'reproducir':
                            var inform = new BindClass('templateSix');
                            inform.set('NowPlayingImage',imagen[indice] );
                            inform.set('asideBlock17Content2',artist[indice] );
                            inform.set('asideBlock17Content3',album[indice] );
                            inform.set('asideBlock18Content1',songName[indice] );
                            var audio = $('#audio');
                            var promise = audio[0].play();
                            if (promise) {
                                //Older browsers may not return a promise, according to the MDN website
                                promise.catch(function(error) { console.error(error); });
                            }
                            

                            break;
                        case 'pausar':

                            // var inform = new BindClass('templateSix');
                            // inform.set('NowPlayingImage',imagen[0] );
                            var audio = $('#audio');
                            var promise = audio[0].pause();
                            if (promise) {
                                //Older browsers may not return a promise, according to the MDN website
                                promise.catch(function(error) { console.error(error); });
                            }
                            
                            break;
                        case 'adelantar':
                            // var inform = new BindClass('templateSix');
                            // inform.set('NowPlayingImage',imagen[0] );

                            var audio = $('#audio');
                            audio[0].pause();
                            localStorage.current=indice+1;    
                            var indice2 = localStorage.current;
                            audio[0].src = playlist[Number(localStorage.current)];
                            audio[0].load();
                            var inform = new BindClass('templateSix');
                            inform.set('NowPlayingImage',imagen[indice2] );
                            inform.set('asideBlock17Content2',artist[indice2] );
                            inform.set('asideBlock17Content3',album[indice2] );
                            inform.set('asideBlock18Content1',songName[indice2] );
                            audio[0].play();
                            // var promise = audio[0].stop();
                            // if (promise) {
                            //     //Older browsers may not return a promise, according to the MDN website
                            //     promise.catch(function(error) { console.error(error); });
                            // }
                            break;  
                        case 'retroceder':
                            // var inform = new BindClass('templateSix');
                            // inform.set('NowPlayingImage',imagen[0] );

                            var audio = $('#audio');
                            audio[0].pause();
                            localStorage.current=indice-1;    
                            var indice2 = localStorage.current;
                            audio[0].src = playlist[Number(localStorage.current)];
                            audio[0].load();
                            var inform = new BindClass('templateSix');
                            inform.set('NowPlayingImage',imagen[indice2] );
                            inform.set('asideBlock17Content2',artist[indice2] );
                            inform.set('asideBlock17Content3',album[indice2] );
                            inform.set('asideBlock18Content1',songName[indice2] );
                            audio[0].play();
                            // var promise = audio[0].stop();
                            // if (promise) {
                            //     //Older browsers may not return a promise, according to the MDN website
                            //     promise.catch(function(error) { console.error(error); });
                            // }
                            break; 
                        }

                 } else{

                 } 

             });
         }
         function ObtenerAccionMusica2() {

             var enviar = JSON.stringify({ "mirrorId": 1 });
             console.log("Enviar user: ", enviar);
             eventoPost(urlpost13, enviar, function(data) {
                 // OBTENGO LA LISTA DE BOOLEANOS
                 var arreglo = JSON.parse(data);    

                 if(arreglo.status){
                    var stringrespuesta=arreglo.action.toLowerCase();
                    var indice= Number(localStorage.current);
                    switch (stringrespuesta){
                        case 'reproducir':
                            var inform = new BindClass('templateSix');
                            inform.set('NowPlayingImage',imagen[indice] );
                            inform.set('asideBlock17Content2',artist[indice] );
                            inform.set('asideBlock17Content3',album[indice] );
                            inform.set('asideBlock18Content1',songName[indice] );
                            var audio = $('#audio');
                            var promise = audio[0].play();
                            if (promise) {
                                //Older browsers may not return a promise, according to the MDN website
                                promise.catch(function(error) { console.error(error); });
                            }
                            

                            break;
                        case 'pausar':

                            // var inform = new BindClass('templateSix');
                            // inform.set('NowPlayingImage',imagen[0] );
                            var audio = $('#audio');
                            var promise = audio[0].pause();
                            if (promise) {
                                //Older browsers may not return a promise, according to the MDN website
                                promise.catch(function(error) { console.error(error); });
                            }
                            

                            break;
                        case 'adelantar':
                            // var inform = new BindClass('templateSix');
                            // inform.set('NowPlayingImage',imagen[0] );

                            var audio = $('#audio');
                            audio[0].pause();
                            localStorage.current=indice+1;    
                            var indice2 = localStorage.current;
                            audio[0].src = playlist[Number(localStorage.current)];
                            audio[0].load();
                            var inform = new BindClass('templateSix');
                            inform.set('NowPlayingImage',imagen[indice2] );
                            inform.set('asideBlock17Content2',artist[indice2] );
                            inform.set('asideBlock17Content3',album[indice2] );
                            inform.set('asideBlock18Content1',songName[indice2] );
                            audio[0].play();
                            // var promise = audio[0].stop();
                            // if (promise) {
                            //     //Older browsers may not return a promise, according to the MDN website
                            //     promise.catch(function(error) { console.error(error); });
                            // }
                            break;  
                        case 'retroceder':
                            

                            // var inform = new BindClass('templateSix');
                            // inform.set('NowPlayingImage',imagen[0] );

                            var audio = $('#audio');
                            audio[0].pause();
                            localStorage.current=indice-1;    
                            var indice2 = localStorage.current;
                            audio[0].src = playlist[Number(localStorage.current)];
                            audio[0].load();
                            var inform = new BindClass('templateSix');
                            inform.set('NowPlayingImage',imagen[indice2] );
                            inform.set('asideBlock17Content2',artist[indice2] );
                            inform.set('asideBlock17Content3',album[indice2] );
                            inform.set('asideBlock18Content1',songName[indice2] );
                            audio[0].play();
                            // var promise = audio[0].stop();
                            // if (promise) {
                            //     //Older browsers may not return a promise, according to the MDN website
                            //     promise.catch(function(error) { console.error(error); });
                            // }
                            break; 
                        }

                 } else{

                 }

             });
         }
        
        
        //window.setInterval(ObtenerAccionMusica2, 1000);
        
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
                 success: function(result) {
                     $.ajax({
                         type: "GET",
                         url: "https://www.googleapis.com/calendar/v3/calendars/primary/events",
                         headers: { 'Authorization': result.token_type + " " + result.access_token },
                         success: function(calendarResult) {
                             var calendario = calendarResult.items

                             var listaArrayError = [];
                             var listaArrayCorrect = [];
                             for (var i = 0; i < calendario.length; i++) {

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

                                 if (yearToday > valueFullYear) {
                                     listaArrayError.push(agenda1);
                                 } else {
                                     if (monthToday > valueMonth) {
                                         listaArrayError.push(agenda1);
                                     } else {
                                         if (dayToday == valueDay) {
                                             if (hourToday == valueHour) {
                                                 if (difference_minutes >= 0) {
                                                     listaArrayError.push(agenda1);
                                                 } else {
                                                     listaArrayCorrect.push(agenda1);
                                                 }
                                             } else if (hourToday > valueHour) {
                                                 listaArrayError.push(agenda1);
                                             } else {
                                                 listaArrayCorrect.push(agenda1);
                                             }
                                         } else if (dayToday > valueDay) {
                                             listaArrayError.push(agenda1);
                                         } else {
                                             listaArrayCorrect.push(agenda1);
                                         }
                                     }
                                 }
                             }
                             constArray = listaArrayCorrect.sort((a, b) => new Date(a.start.dateTime) - new Date(b.start.dateTime));
                             //var constArray = _.orderBy(listaArrayCorrect, ['start.dateTime']);
                             //var constArray = listaArrayCorrect.sort((a, b) => a['start.dateTime'] - b['start.dateTime']);
                             calendarCallback(constArray);

                         }
                     });
                     $.ajax({
                         type: "GET",
                         url: "https://www.googleapis.com/gmail/v1/users/me/messages?q=is:inbox",
                         headers: { 'Authorization': result.token_type + " " + result.access_token },
                         success: function(mailsResult) {
                             var messages = mailsResult.messages;
                             var max = messages.length > 5 ? 5 : messages.length;
                             //var max = 1;
                             var arreglocorreos = []
                             for (var i = 0; i < max; i++) {
                                 var objetoauxiliar = undefined;
                                 $.ajax({
                                     type: "GET",
                                     url: "https://www.googleapis.com/gmail/v1/users/me/messages/" + messages[i].id,
                                     headers: { 'Authorization': result.token_type + " " + result.access_token },
                                     success: function(mailResult) {

                                         objetoauxiliar = serializeMail((mailResult), i);
                                         mailCallback(objetoauxiliar);
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
             // console.log(result);

             var object = { id: "", sender: "", subject: "", sendAt: "", message: "" };
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

         }
         var arregloServiciosHotel = [];

         function serviciosHotel() {
             $.ajax({
                 method: "GET",
                 url: "https://tp-ires-api.azurewebsites.net/v1/services",
                 crossDomain: true,
                 dataType: 'json',
             }).done(function(data) {
                 var servicio = data.result.list;
                 /*for(var i = servicio.length-5; i< servicio.length; i++){

                 }*/
                 var ArregloPush = [];
                 for (var i = 0; i < 4; i++) {
                     arregloServiciosHotel.push(servicio[i]);
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

                     var htmlView = '<label  style = "color: white; font-family: b-light-condensed; font-size: 24px; margin-left: 30px; display: inline-block;">' + serType1 + '</label>' +
                         '<label style = "color: white; font-family: b-medium; font-size: 24px; margin-left: 25px; margin-left: 5px;">' + nameService1 + '</label> </br>' +
                         '<label  style = "color: white; font-family: b-light-condensed; font-size: 24px; margin-left: 30px; display: inline-block;">' + serType2 + '</label>' +
                         '<label style = "color: white; font-family: b-medium; font-size: 24px; margin-left: 25px; margin-left: 5px;">' + nameService2 + '</label> </br>' +
                         '<label  style = "color: white; font-family: b-light-condensed; font-size: 24px; margin-left: 30px; display: inline-block;">' + serType3 + '</label>' +
                         '<label style = "color: white; font-family: b-medium; font-size: 24px; margin-left: 25px; margin-left: 5px;">' + nameService3 + '</label> </br>' +
                         '<label  style = "color: white; font-family: b-light-condensed; font-size: 24px; margin-left: 30px; display: inline-block;">' + serType4 + '</label>' +
                         '<label style = "color: white; font-family: b-medium; font-size: 24px; margin-left: 25px; margin-left: 5px;">' + nameService4 + '</label>';

                     ArregloPush.push({ serviceId: servicio[i].serviceId, index: i });

                     $('#HotelService').html(htmlView);
                 }
             
                var enviar2 = JSON.stringify({ "userId": UsuarioID,"listHotelServices": ArregloPush });
                console.log("Envio 2 ", UsuarioID);
                 $.ajax({
                     type: "POST",
                     //dataType: 'jsonp',
                     url: proxyurl + "http://edumoreno27-001-site2.etempurl.com/SaveHotelServices",
                     headers: { 'Content-Type': "application/json" },
                     data: enviar2,
                     success: function(mailsResult) {
                        //ontenerParametroHotel(arregloServiciosHotel.index);
                     }
                 });
             });
         }
        function ontenerParametroHotel(indice) {

             console.log("OrderHotelRecibida", indice);

             var index = indice;
             var name = "";
             var description = "";

             console.log("index", index)

             var obj = arregloServiciosHotel[index];
             console.log("obj", obj);
             var htmlDescripcion;
             $("#HotelService").hide(1000, function() {
                //'<div> <label  style = "color: white; font-family: b-medium; font-size: 24px; display: inline-block;">' + valueHora + ": " + '<label style = "color: white; font-family: b-medium; font-size: 24px; margin-left: 25px; margin-left: 5px;">' + obj.summary + "</label></div>" + "<div><p>" + obj.location + "</p></div>" + "<div><p>" + sumary + "</p></div>";
                htmlDescripcion = '<div> <label  style = "color: white; font-family: b-light-condensed; font-size: 24px; margin-left: 30px; display: inline-block;">' + obj.name + '</label> </div>" + "<div><label  style = "color: white; font-family: b-light-condensed; font-size: 20px; margin-left: 30px; display: inline-block; text-align : justify; white-space: normal;">' + obj.description + "</label></div>" ;
                $('#HotelService2').html(htmlDescripcion);
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
                             temp = noti.title.substring(0, 60) + "...";
                             efect = "";
                             // effect prueba
                         }

                         if (i == 0) {
                             //full = full + '<div class="carousel-item active"> <img src="'+ foto +'" style="height: 250px; width:220px; float:left;" /> <label style ="color: white;display:table;font-size: 20px;margin-left: 234px;margin-top:-6px;font-family: &quot;b-medium&quot;height: 87px; word-wrap:break-word;"> ' + title +' </label> <label style = "display:block; word-wrap:break-word; color: white; font-family: &quot;b-light-condensed&quot;; margin-left: 234px;margin-top:-7px; height: 100px;">'+ desc+' </label> </div>';
                             full = full + '<div class="carousel-item active"> <div style="display: inline;"><img src="' + foto + '" style="height: 150px; width: 200px;" /></div>  <div style="color: white;font-size: 20px;font-family: &quot;b-medium&quot;;float: right; display: inline;margin-left: 203px;margin-top: -153px; white-space: normal; text-align : justify;"> <p  class=' + efect + '>' + temp + ' </p></div>       <div style="color: white;font-size: 14px;font-family: &quot;b-light-condensed&quot;;margin-left: 203px;margin-top: -55px;height: 63px;float:left; text-align : justify;">' + desc + '</div></div>';
                         } else {
                             //full = full + '<div class="carousel-item"> <img src="'+ foto +'" style="height: 250px; width:220px; float:left;" /> <label style ="color: white;display:table;font-size: 20px;margin-left: 234px;margin-top:-6px;font-family: &quot;b-medium&quot; height: 87px; word-wrap:break-word;"> ' + title +' </label> <label style = "display:block; color: white; font-family: &quot;b-light-condensed&quot;; margin-left: 234px;margin-top:-7px; height: 100px; word-wrap:break-word;">'+ desc+' </label> </div>';
                             full = full + '<div class="carousel-item"> <div style="display: inline;"><img src="' + foto + '" style="height: 150px; width: 200px;" /></div>  <div style="color: white;font-size: 20px;font-family: &quot;b-medium&quot;;float: right; display: inline;margin-left: 203px;margin-top: -153px; white-space: normal; text-align : justify;"> <p  class=' + efect + '>' + temp + ' </p></div>       <div style="color: white;font-size: 14px;font-family: &quot;b-light-condensed&quot;;margin-left: 203px;margin-top: -55px;height: 63px;float:left; text-align : justify;">' + desc + '</div></div>';

                         }


                     }
                     $("#333").html('<div id="carouselNews" style="margin-left: 25px;" class="carousel slide" data-ride="carousel"> <div class="carousel-inner">' + full + '</div> <a class="hidden carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev"> <span class="carousel-control-prev-icon" aria-hidden="true"></span"> <span class="sr-only">Previous</span> </a> <a class="hidden carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next"> <span class="carousel-control-next-icon" aria-hidden="true"></span> <span class="sr-only">Next</span> </a> </div>')
                     $('#carouselNews').carousel({ interval: 4000 });
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


         function GetWeather() {
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


                     getCurrency("USD", "PEN", "#111", 'https://marketdata.websol.barchart.com/getQuote.json?apikey=25c96dd9a466f8b93902a472297c165b&symbols=ZC*1,IBM,GOOGL,ADES,EEUU,ADES,ASIX,AEGN,AMTX,APD,AKS,AIN,ALB,ATI,AMRK,AMRC,AVD,AMWD,AMRS,AQMS,RKDA,AGX,ATIS,ATISW,AXTA,%5EEURUSD');
                     getCurrency("EUR", "PEN", "#222", 'https://marketdata.websol.barchart.com/getQuote.json?apikey=25c96dd9a466f8b93902a472297c165b&symbols=ZC*1,ACH,APWC,BHP,BAK,EVGN,MT,CSTM,GOLD,TS,LYB,TX,TS,UN,UL,RIO,PKX,SHI,TANH,NEWA,GURE,%5EEURUSD');
                      
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



         // $('.carousel').bind('slid', function (e) {
         //      console.log("cambio el slide");
         // })

         // alert("invoked");

        var playlist = ["/music/musica_lg/musica1.mp3", "/music/musica_lg/musica2.mp3", "/music/musica_lg/musica3.mp3", "/music/musica_lg/musica4.mp3","/music/musica_lg/musica5.mp3"];
        var imagen = ["/music/album/imagen1.jpg", "/music/album/imagen2.jpg", "/music/album/imagen3.jpg", "/music/album/imagen4.jpg","/music/album/imagen5.jpg"];
        var artist = ["System of a Down", "Audioslave", "Queen", "Guns N' Roses","Maroon 5"];
        var album = ["Toxicity", "Audioslave", "News of the World", "Appetite for destruction","Songs About Jane"];
        var songName = ["Chop suey ", "Like a Stone ", "We Will Rock You ", "Sweet child o' mine","This love "];
         init();
        function init() {

            localStorage.current = 0;
             var audio = $('#audio');
         
            var len = playlist.length;
            audio[0].volume = .80;
            // audio[0].play();
            audio[0].addEventListener('ended', function (e) {
             var c = Number(localStorage.current);
            var link = playlist[0];
            var img=imagen[0];
            var art = artist[0];
            var album = album[0];
            var nam = songName[0];
            c++;
            if (c == len) {
                 c = 0;
            } else {
                link = playlist[c];
                img=imagen[c];
                art = artist[c];
                album = album[c];
                nam = songName[c];
            }
            localStorage.current = c;
            run(link, audio[0],img, art,album, nam);
        });
}
function run(link, player,imagen, artist,album, songName) {
    console.log(artist, songName);
    player.src = link;
    var inform = new BindClass('templateSix');
    inform.set('NowPlayingImage',imagen );
    inform.set('asideBlock17Content2',artist );
    inform.set('asideBlock17Content3',album );
    inform.set('asideBlock18Content1',songName );
    // document.getElementById("playerArtist").innerHTML = artist;
    // document.getElementById("playerSong").innerHTML = songName;
    player.load();
    player.play();
}



         function bindData(jsonData) {


             info = new BindClass('templateSix');

             updateTime();
             noti();
             calendariolocal();
             // serviciosHotel();
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
             window.setInterval(serviciosHotel, 100000);
             //window.setInterval(obtenerUsuario, 10000);

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


                     /*getCurrency("USD", "PEN", "#111", 'https://marketdata.websol.barchart.com/getQuote.json?apikey=25c96dd9a466f8b93902a472297c165b&symbols=ZC*1,IBM,GOOGL,ADES,EEUU,ADES,ASIX,AEGN,AMTX,APD,AKS,AIN,ALB,ATI,AMRK,AMRC,AVD,AMWD,AMRS,AQMS,RKDA,AGX,ATIS,ATISW,AXTA,%5EEURUSD');
                     getCurrency("EUR", "PEN", "#222", 'https://marketdata.websol.barchart.com/getQuote.json?apikey=25c96dd9a466f8b93902a472297c165b&symbols=ZC*1,ACH,APWC,BHP,BAK,EVGN,MT,CSTM,GOLD,TS,LYB,TX,TS,UN,UL,RIO,PKX,SHI,TANH,NEWA,GURE,%5EEURUSD');
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