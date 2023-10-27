
$(document).ready(function(){
    $("#loading").show();
    if(localStorage.getItem('tipoPlan') != undefined){
        var tipo = localStorage.getItem('tipoPlan');
        verPlan(tipo); 
    }
});


  function tipoPlan(){
    if (document.getElementById('customSwitch1').checked)
    {
        document.getElementById("pBasicoMes").style.display = 'none';
        document.getElementById("pBasicoAño").style.display = 'block';  
        document.getElementById("pPremiumMes").style.display = 'none';
        document.getElementById("pPremiumAño").style.display = 'block';  
    }
    else{
        document.getElementById("pBasicoMes").style.display = 'block';
        document.getElementById("pBasicoAño").style.display = 'none';
        document.getElementById("pPremiumMes").style.display = 'block';
        document.getElementById("pPremiumAño").style.display = 'none';
    }
  }

  function obtenerB(){
    var precio="";
    if (document.getElementById('customSwitch1').checked)
    {
         precio = document.getElementById("pBasicoAño").innerText;  
    }
    else{
         precio = document.getElementById("pBasicoMes").innerText;
    }
    localStorage.setItem("precioPlan", precio);
    setTimeout(function(){location.href="pagoPlan.html"} , 1000); 
  }
  function obtenerP(){
    var precio="";
    if (document.getElementById('customSwitch1').checked)
    {
         precio = document.getElementById("pPremiumAño").innerText;  
    }
    else{
         precio = document.getElementById("pPremiumMes").innerText;
    }
    localStorage.setItem("precioPlan", precio);
    setTimeout(function(){location.href="pagoPlan.html"} , 1000); 
  }

  function verPlan(tipo) {
     $.ajax({
         url: cn + "SeleccionarPlan&Tipo="+tipo, 
         success: function (result) {   
           var x = result.replace(/\\r\\n/g, '');  
           var data = JSON.parse(x);
           document.getElementById("pBasicoMes").innerHTML = '<sup class="fw-normal fs-2 me-1">$</sup>'+data[0].PrecioBasicoMes+'<small class="fs--1 text-700">/mes</small>';
           document.getElementById("pBasicoAño").innerHTML = '<sup class="fw-normal fs-2 me-1">$</sup>'+data[0].PrecioBasicoAño+'<small class="fs--1 text-700">/año</small>';
           document.getElementById("pPremiumMes").innerHTML = '<sup class="fw-normal fs-2 me-1">$</sup>'+data[0].PrecioPremiumMes+'<small class="fs--1 text-700">/mes</small>';
           document.getElementById("pPremiumAño").innerHTML = '<sup class="fw-normal fs-2 me-1">$</sup>'+data[0].PrecioPremiumAño+'<small class="fs--1 text-700">/año</small>';
           BeneficiosPlan();
           $("#loading").hide();
        }
     });
 }

function BeneficiosPlan() {
    var basico = "";
    var premium = "";
    $.ajax({
        url: cn + "BeneficiosPlan", 
        success: function (result) {   
          var x = result.replace(/\\r\\n/g, '');  
          var data = JSON.parse(x);
          for (var i = 0; i < data.length; i++) {
            if(data[i].Modalidad == "Basico"){
                basico = basico + '<li class="py-1"><span class="me-2 fas fa-check text-success"> </span>'+data[i].Beneficio+'</li>';
            }
            if(data[i].Modalidad == "Premium"){
                premium = premium + '<li class="py-1"><span class="me-2 fas fa-check text-success"> </span>'+data[i].Beneficio+'</li>';
            }
          }
          document.getElementById("divBeneficiosB").innerHTML = basico;
          document.getElementById("divBeneficiosP").innerHTML = premium;
          $("#loading").hide();
       }
    });
}