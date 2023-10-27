$(document).ready(function(){
  $("#loading").show();
});


function verSignos() {
    
         var user = localStorage.getItem("usuario");
       
          $.ajax({
              url: cn + "VerSignos&User="+user, 
              success: function (result) {   

                var x = result.replace(/\\r\\n/g, '');  
                var data = JSON.parse(x);
                document.getElementById("divFc").innerHTML = data[0].FrecuenciaCardiaca + '<span class=" fs--2" >bpm</span>';
                document.getElementById("divTemp").innerHTML = data[0].Temperatura + "°" + '<span class=" fs--2" >C</span>';
                document.getElementById("divFr").innerHTML = data[0].FrecuenciaRespiratoria + '<span class=" fs--2" >rpm</span>';
                document.getElementById("divSpo2").innerHTML = data[0].spo + '<span class=" fs--2" >%</span>';
                document.getElementById("divTa").innerHTML = data[0].TensionArterial + '/' + data[0].TensionArterialMin + '<span class=" fs--2" >mmHg</span>';
                document.getElementById("divGlu").innerHTML = data[0].Glucosa + '<span class=" fs--2" >mg/dl</span>';
                $("#loading").hide();
              }
          });
      }