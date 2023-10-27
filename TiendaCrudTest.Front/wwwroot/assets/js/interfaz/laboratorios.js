
$(document).ready(function(){
    search();
    verLaboratorios();
  });

function verLaboratorios(){
   // $("#loading").show();
      var filtro = document.getElementById("txtBuscaLab").value;
      if(filtro == ""){filtro = "-1";}
        $.ajax({
          type: "GET",
          url: cn + "SeleccionarLabs&Tipo="+filtro, 
           success: function (result) {
            //console.log(result);
            result = result.split("<");
              result = result[0];
          var x = result.replace(/\\r\\n/g, '');   
          var data = JSON.parse(x)  
          var html = "";            
          for (var i = 0; i < data.length; i++) {
            if(data[i].Logo == null){data[i].Logo = "img/labs/lab.png";}
            html = html + '<div class="col-6 col-md-4"><div class="bg-white dark__bg-1100 p-3 h-100"><a href="#" name=\"'+data[i].IdLab+'\" onclick="verAnalisisLab(this.name)"><img class="img-thumbnail img-fluid rounded-circle mb-3 shadow-sm" src=\"'+data[i].Logo+'\" alt="" width="100"></a><h6 class="mb-1"><a href="#" name=\"'+data[i].IdLab+'\" onclick="verAnalisisLab(this.name)">'+data[i].NomLab+'</a></h6><p class="fs--2 mb-1"><a class="text-700" href="#!">'+data[i].Direccion+'</a></p></div></div>';
          }
            if(html == ""){html = "<br><br><center>No se encontraron resultados</center>"}
          document.getElementById("divLabs").innerHTML = html + '<br><br>';
          $("#loading").hide();
          },
          error: function (jqXmlHttpRequest, textStatus, errorThrown) {
            //console.log(jqXmlHttpRequest + textStatus + errorThrown);
          }
      });
  }
  
  function buscar(){
    var filtro = document.getElementById("txtBuscaLab").value;
    if(filtro.length == 2){search();}
    if(filtro.length >= 4 || filtro.length == 0){verLaboratorios();}
  }

  function verAnalisisLab(valor){
    localStorage.setItem("IdLab", valor);
    setTimeout(function(){location.href="analisis_laboratorio.html"} , 500); 
  }

  function search() {
        $.ajax({
          type: "GET",
          url: cn + "SeleccionarLabs&Tipo=-1", 
          success: function (result) {
          result = result.split("<");
          result = result[0];
          var x = result.replace(/\\r\\n/g, '');   
          var data = JSON.parse(x)  
          var html = "";            
          for (var i = 0; i < data.length; i++) {
            html = html + data[i].NomLab +',';
          }
          var productos = html.split(',');
            $( "#txtBuscaLab" ).autocomplete({
              source: productos
            });
          $("#loading").hide();
          },
          error: function (jqXmlHttpRequest, textStatus, errorThrown) {
          }
      });
  }