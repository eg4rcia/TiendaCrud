

$(document).ready(function(){

  $('#divContenido').css('height',$(window).height()-125);
  $('#myTabContent').css('height',$('#divContenido').height()-115);
  
    verAnalisisLab();
    verPaquetesLab();
  });


function verAnalisisLab(){
    $("#loading").show();
    var nombre = document.getElementById("txtBuscaAnalisis").value;
    if(nombre == ""){nombre = "|";}

      var filtro = localStorage.getItem("IdLab");
        $.ajax({
          type: "GET",
          url: cn + "SeleccionarAnalisisLab&Tipo="+filtro+"&Nom="+nombre, 
           success: function (result) {
            //console.log(result);
            result = result.split("<");
              result = result[0];
          var x = result.replace(/\\r\\n/g, '');   
          var data = JSON.parse(x)  
          var html = "";            
          for (var i = 0; i < data.length; i++) {
            html = html + '<div class="col-sm-6 col-md-4"><div class="card overflow-hidden" style="min-width:12rem"><div class="bg-holder bg-card" style="background-image:url(assets/img/corner-3.png)"></div><div class="card-body position-relative"><center><h6>'+data[i].NomAnalisis+'</span></h6></center><div class="display-4 fs-4 mb-2 fw-normal font-sans-serif" data-countup="{&quot;endValue&quot;:58.386,&quot;decimalPlaces&quot;:2,&quot;suffix&quot;:&quot;k&quot;}">'+data[i].Descripcion+'</div><table style="width:100%"><tr><td style="text-align:left"><a href="#" name=\"'+data[i].Instrucciones+'\" onclick="instrucciones(this.name)"><span class="badge badge-soft-info rounded-pill">indicaciones<span class="fas fa-angle-right ms-1" data-fa-transform="down-1"></span></span></a></td><td style="text-align:right"><a href="#" id=\"'+data[i].IdAnalisis +'|'+ data[i].NomAnalisis +'\" style="cursor:pointer" name=\"'+data[i].Precio+'\" onclick="addcarro(this)"><span class="badge badge-soft-success rounded-pill">$ '+data[i].Precio+'<span class="fas fa-angle-right ms-1" data-fa-transform="down-1"></span></span></a></td></tr></table></div></div></div>';
          //  html = html + '<div class="border border-1 border-300 rounded-2 p-3 ask-analytics-item position-relative mb-3"><div class="d-flex"><span class="d-flex"><img src="img/labs/test-tube.png" width="20px" height="20px" alt="">&nbsp;&nbsp;<h4>'+data[i].NomAnalisis+'</h4></span></div><h5 class="fs--1 text-800">'+data[i].Descripcion+'</h5><div class="d-flex "><button class="btn btn-success btn-sm " type="button">$'+data[i].Precio+'</button><button class="btn btn-info btn-sm me-2" type="button" name=\"'+data[i].Instrucciones+'\" onclick="instrucciones(this.name)"><span class="fas fa-eye fs--2" ></span></button></div></div>';
          }
            if(html == ""){html = "<br><br><center>No se encontraron resultados</center>"}
          document.getElementById("divAnalisisLab").innerHTML = html + '<br><br>';
          $("#loading").hide();
          },
          error: function (jqXmlHttpRequest, textStatus, errorThrown) {
          }
      });
  }
  
function instrucciones(valor){
    document.getElementById("divInstruccion").innerHTML = valor;
    $("#detalleAnalisis").modal("show");
}

function verPaquetesLab(){
  $("#loading").show();
  var nombre = document.getElementById("txtBuscaAnalisis").value;
  if(nombre == ""){nombre = "|";}

    var filtro = localStorage.getItem("IdLab");
      $.ajax({
        type: "GET",
        url: cn + "SeleccionarPaquetesLab&Tipo="+filtro+"&Nom="+nombre, 
         success: function (result) {
          //console.log(result);
          result = result.split("<");
            result = result[0];
        var x = result.replace(/\\r\\n/g, '');   
        var data = JSON.parse(x)  
        var html = "";            
        for (var i = 0; i < data.length; i++) {
          html = html + '<div class="col-sm-6 col-md-4"><div class="card overflow-hidden" style="min-width:12rem"><div class="bg-holder bg-card" style="background-image:url(assets/img/corner-3.png)"></div><div class="card-body position-relative"><center><h6>'+data[i].NomPaquete+'</span></h6></center><div class="display-4 fs-4 mb-2 fw-normal font-sans-serif" data-countup="{&quot;endValue&quot;:58.386,&quot;decimalPlaces&quot;:2,&quot;suffix&quot;:&quot;k&quot;}">'+data[i].Descripcion+'</div><table style="width:100%"><tr><td style="text-align:left"><a href="#" name=\"'+data[i].Instrucciones+'\" onclick="instrucciones(this.name)"><span class="badge badge-soft-info rounded-pill">indicaciones<span class="fas fa-angle-right ms-1" data-fa-transform="down-1"></span></span></a></td><td style="text-align:right"><a href="#" id=\"'+data[i].IdPaquete +'|'+ data[i].NomAnalisis +'\" style="cursor:pointer" name=\"'+data[i].Precio+'\" onclick="addcarro(this)"><span class="badge badge-soft-success rounded-pill">$ '+data[i].Precio+'<span class="fas fa-angle-right ms-1" data-fa-transform="down-1"></span></span></a></td></tr></table></div></div></div>';
        //  html = html + '<div class="border border-1 border-300 rounded-2 p-3 ask-analytics-item position-relative mb-3"><div class="d-flex"><span class="d-flex"><img src="img/labs/test-tube.png" width="20px" height="20px" alt="">&nbsp;&nbsp;<h4>'+data[i].NomAnalisis+'</h4></span></div><h5 class="fs--1 text-800">'+data[i].Descripcion+'</h5><div class="d-flex "><button class="btn btn-success btn-sm " type="button">$'+data[i].Precio+'</button><button class="btn btn-info btn-sm me-2" type="button" name=\"'+data[i].Instrucciones+'\" onclick="instrucciones(this.name)"><span class="fas fa-eye fs--2" ></span></button></div></div>';
        }
          if(html == ""){html = "<br><br><center>No se encontraron resultados para: " + nombre + "</center>"}
        document.getElementById("divPaquetesLab").innerHTML = html + '<br><br>';
        $("#loading").hide();
        },
        error: function (jqXmlHttpRequest, textStatus, errorThrown) {
        }
    });
}
