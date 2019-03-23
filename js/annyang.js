if(annyang){
   var element = document.getElementById("labelCalendar");
   var element2 = document.getElementById("BlockOpa");
   var element3 = document.getElementById('Block1');
   var element4 = document.getElementById('Block3');
   var element5 = document.getElementById('BlockOpa');
   var element6 = document.getElementById('labelTask');
   var element7 = document.getElementById('Block4');
   var element8 = document.getElementById('Block5');
   var plan1 = document.getElementById('Plan1');
   var check1 = document.getElementById('check1');
    // Let's define a command.
    var commands = {
      'Mirror Mirror': function() { 
        element.style.display = 'block';
        element.style.opacity = "1";
        element2.style.opacity = "0.5";
        element3.style.opacity = "0.5";
        element4.style.opacity = "0.5";
        element5.style.opacity = "0.5";
        element6.style.display = 'block';
        element7.style.opacity = "0.5";
        element8.style.opacity = "0.5";
        responsiveVoice.speak("Buenos días, Carlos", "Spanish Latin American Male");
      },
      'Cerrar': function(){
        element.style.display = 'none';
        element2.style.opacity = '1';
        element3.style.opacity = '1';
        element4.style.opacity = '1';
        element5.style.opacity = '1';
        element6.style.display = 'none';
        element7.style.opacity = "1";
        element8.style.opacity = "1";
        plan1.style.background = "none";
        check1.style.background = "none";
        check2.style.background = "none";
        responsiveVoice.speak("Hasta Luego", "Spanish Latin American Male");
      },
      'Ver agenda 1': function(){
        element.style.display = 'block';
        plan1.style.background = "#e3e3e3";
        element4.style.opacity = '1';
        check1.style.background = "none";
        check2.style.background = "none";
        responsiveVoice.speak("En 15 minutos lonche con mamá", "Spanish Latin American Male");
      },
      'Ver pendiente 1': function(){
        element6.style.display = 'block';
        plan1.style.background = "none";
        check1.style.background = "#e3e3e3";
        check2.style.background = "none";
        element5.style.opacity = '1';
        element2.style.opacity = '1';
        responsiveVoice.speak("Coordinar reunión empleados", "Spanish Latin American Male");
      },
      'Ver pendiente 2': function(){
        element6.style.display = 'block';
        plan1.style.background = "none";
        check1.style.background = "none";
        check2.style.background = "#e3e3e3";
        element5.style.opacity = '1';
        element2.style.opacity = '1';
        responsiveVoice.speak("Sacar cita al dentista", "Spanish Latin American Male");
      }
    }
    annyang.debug();
    //  annyang.setLanguage('en-US');
    annyang.setLanguage('es-PE');
    annyang.addCommands(commands);
    
    annyang.start({ continuous: false });
}
