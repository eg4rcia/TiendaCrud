function domicilioElejido(){
    $("#loading").show();

      var filtro = localStorage.getItem("idu");
        $.ajax({
          type: "GET",
          url: cn + "DomicilioElegido&id="+filtro, 
           success: function (result) {
     
            result = result.split("<");
              result = result[0];
          var x = result.replace(/\\r\\n/g, '');   
          var data = JSON.parse(x)  
          var html = ""; 
          var activo = "";           
          for (var i = 0; i < data.length; i++) {
           
if(data[i].activo == true){
    activo = 'checked="checked"';
}
else{
    activo = "";
}

            html = html + data[i].nexterior+' '+data[i].calle+',<br>'+data[i].estado+',<br>'+data[i].municipio+' '+data[i].colonia+' '+data[i].codigopostal+'<span class="d-block mb-0 pt-2">'+data[i].telefono+'</span>';
           // html = html + '<div class="col-sm-6 col-md-4"><div class="card overflow-hidden" style="min-width:12rem"><div class="bg-holder bg-card" style="background-image:url(assets/img/corner-3.png)"></div><div class="card-body position-relative"><center><h6>'+data[i].NomAnalisis+'</span></h6></center><div class="display-4 fs-4 mb-2 fw-normal font-sans-serif" data-countup="{&quot;endValue&quot;:58.386,&quot;decimalPlaces&quot;:2,&quot;suffix&quot;:&quot;k&quot;}">'+data[i].Descripcion+'</div><table style="width:100%"><tr><td style="text-align:left"><a href="#" name=\"'+data[i].Instrucciones+'\" onclick="instrucciones(this.name)"><span class="badge badge-soft-info rounded-pill">indicaciones<span class="fas fa-angle-right ms-1" data-fa-transform="down-1"></span></span></a></td><td style="text-align:right"><a href="#" id=\"'+data[i].IdAnalisis +'|'+ data[i].NomAnalisis +'\" style="cursor:pointer" name=\"'+data[i].Precio+'\" onclick="addcarro(this)"><span class="badge badge-soft-success rounded-pill">$ '+data[i].Precio+'<span class="fas fa-angle-right ms-1" data-fa-transform="down-1"></span></span></a></td></tr></table></div></div></div>';
         activo="";
        }
            if(html == ""){html = "<br><br><center>No se encontraron resultados</center>"}
          document.getElementById("domicilio").innerHTML = html;
       
          $("#loading").hide();
          },
          error: function (jqXmlHttpRequest, textStatus, errorThrown) {
          }
      });
      
  }