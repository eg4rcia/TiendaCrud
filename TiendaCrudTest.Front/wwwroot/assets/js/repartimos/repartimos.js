function AuthRepartimos() {

    var appId = "7fd43b0ed5ee13807f01a88808af7af9";
    var appSecret =  "a004f2bdda793b027a05a005a7e1981e4614033b181f23e74c66591b6d720d82";
    
    $.ajax({
        type: "POST",
        url: 'https://api.repartimos.mx/api/developer/auth',
        data: { 
            appId:appId,
            appSecret:appSecret
        },
        error: function () {
            /* HideWait();*/
        },
        success: function (response) {
          
            if (typeof (response.Success) === "undefined" || response.Success) {
                var ResponseObj = JSON.stringify(response)
                var responseJson2 = JSON.parse(ResponseObj);    
                // Obtener el valor del token
                var token = responseJson2            
                // Hacer lo que necesites con el token
                
                localStorage.setItem("TokenRepartimos", token.token);  
                console.log("se termino de guardar el token :", token.token);   
                GetGeoDataUser();                  
                              
            }
            else {
                /* mensajeSys(response.MessageDescription, 2);*/
            }
        }
    });

}

function addTotal() {
    let totalson =  $("#Finaltotal").value;
    let total = localStorage.setItem("Total", totalson);   
    //$("#Finaltotal").text("$"+shoppingCart.totalCart());
  }

  function addTotal2() {    
    
    let a = parseInt(localStorage.getItem("Total"));
    let b = parseInt(localStorage.getItem("finalPriceTotal")); 
    finalPrice = a + b;

    
    localStorage.setItem("finalPrice", finalPrice);
  }


 //const funcionInit = () => {
    function GetGeoDataUser() {
        if (!"geolocation" in navigator) {
          return alert("Tu navegador no soporta el acceso a la ubicación. Intenta con otro");
        }
      
        const $latitud = document.querySelector("#latitud"),
          $longitud = document.querySelector("#longitud"),
          $enlace = document.querySelector("#enlace");
      
      
        const onUbicacionConcedida = ubicacion => {
          console.log("Tengo la ubicación: ", ubicacion);
          const coordenadas = ubicacion.coords;
          $latitud.innerText = coordenadas.latitude;
          $longitud.innerText = coordenadas.longitude;
          $enlace.href = `https://www.google.com/maps/@${coordenadas.latitude},${coordenadas.longitude},20z`;
            var lat = document.getElementById("latitud").value;
            var long = document.getElementById("longitud").value;
            alert("lat"+lat+"long "+long);
          localStorage.setItem("latitude", lat);
          localStorage.setItem("longitude",long);

        }
        const onErrorDeUbicacion = err => {
      
          $latitud.innerText = "Error obteniendo ubicación: " + err.message;
          $longitud.innerText = "Error obteniendo ubicación: " + err.message;
          console.log("Error obteniendo ubicación: ", err);
        }
      
        const opcionesDeSolicitud = {
          enableHighAccuracy: true, // Alta precisión
          maximumAge: 0, // No queremos caché
          timeout: 5000 // Esperar solo 5 segundos
        };
      
       
      const geolocationID = navigator.geolocation.getCurrentPosition(onUbicacionConcedida, onErrorDeUbicacion, opcionesDeSolicitud);
        
        console.log("termino de guardar geoposicion");

        navigator.geolocation.clearWatch(geolocationID);
      };
      
      
      //document.addEventListener("DOMContentLoaded", funcionInit);









function CotizarServicio() {
    //conseguir businessId,latitude,longitude
    var lat = $('#latitud').text();
    var long = $('#longitud').text();
    //alert("lat"+lat+"long "+long);
    localStorage.setItem("latitude", lat);
    localStorage.setItem("longitude",long);


    var authToken = localStorage.getItem("TokenRepartimos");
    //Business data
    //var latitude = localStorage.getItem("latitudeProveedor");
    //var longitude = localStorage.getItem("longitudeProveedor");
    var addressBusines = "freyre 135"//localStorage.getItem("address");
    var instructions = "Recoger mercancia"//document.getElementById("instructions");
   
    var transportSlug = "motorcycle";//localStorage.getItem("transportSlug");
    var paymentMethod = localStorage.getItem("paymentMethod");
    var requiredCash =  localStorage.getItem("total");
    var businessId = "64d96828417dc835b81e2a16"//localStorage.getItem("businessId");
 
 
    //Cliente data
    var latitudeC = localStorage.getItem("latitude");  //$("#latitud").text();
    var longitudeC = localStorage.getItem("longitude"); //$("#longitud").text(); 
    var addressC = localStorage.getItem("address");
    var instructionsC = localStorage.getItem("instrucciones");

    const deliveryQuoteId = "";
    //var paymentMethod = "cash"//localStorage.getItem("paymentMethod");  // SE CAMBIO COMO SUGERENCIA POR PARTE DE REPARTIMOS

    var paymentMethod = "credit"//localStorage.getItem("paymentMethod");

    var requiredCash = localStorage.getItem("total");

    var businessEstablishmentId = "64e5be6e8565bb7c621970d8";//localStorage.getItem("businessEstablishmentId");

    const jsonData = {
        "locations": [
            {
                "latitude": "19.1758323",
                "longitude": "-96.1976207",
                "address": addressBusines,
                "instructions": instructions,
                "contactName": "Artur",
                "contactPhoneNumber": "2295313154",
                "businessEstablishmentId": businessEstablishmentId,
                "orderValue": requiredCash  // SE CAMBIO COMO SUGERENCIA POR PARTE DE REPARTIMOS
            },
            {
                "latitude": latitudeC,
                "longitude": longitudeC,
                "address": addressC,
                "instructions": instructionsC,
                "contactName": "Nombre de contacto",
                "contactPhoneNumber": "2841128040"
            }
        ],
        "transportSlug": transportSlug,
        "paymentMethod": paymentMethod,
        "requiredCash": requiredCash,
        "businessId": businessId
    };
    
    $.ajax({
        type: "POST",
        url: 'https://api.repartimos.mx/api/deliveryservice/price',
        data: jsonData,
        async: false,
        beforeSend: function(xhr) {
            // Agregar el token de autorización en la cabecera
            xhr.setRequestHeader("Authorization", authToken);
          },    
        error: function () {
            /* HideWait();*/
        },
        success: function (response) {
            
            if (typeof (response.Success) === "undefined" || response.Success) {
                
                var ResponseObj = JSON.stringify(response)
                var responseJson2 = JSON.parse(ResponseObj);    
                // Obtener el valor del token
                var resp = responseJson2            
                // Hacer lo que necesites con el token
                
                localStorage.setItem("finalPriceTotal", resp.finalPriceTotal);
                
                
                localStorage.setItem("deliveryQuoteId", resp.deliveryQuoteId); 
                console.log("se termino de guardar el precio de envio :", resp.finalPriceTotal + " y idEvio " + resp.deliveryQuoteId);   
                
                

                Swal.fire({
                    title: 'Confirmar Cargo por envio',
                    text: "Agregaremos la siguiente cantidad : "+localStorage.getItem("finalPriceTotal")+" por costo de envio. Estas de acuerdo?",
                    icon: 'warning',
                    showCancelButton: false,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Si, Enviarlo a mi ubicacion!'
                  }).then((result) => {
                    if (result.isConfirmed) {
                     
                      Swal.fire(
                        'Listo!',
                        'Se puede proceder al pago.',
                        'success'
                      )
                     
                      localStorage.setItem("Finaltotal", resp.finalPriceTotal + localStorage.getItem("Total"));
                     // $("#Finaltotal").text(finalPrice.toString());
                      document.getElementById("Finaltotal").value = resp.finalPriceTotal + localStorage.getItem("Total");
                      
                      //solicitar servicio
            
                    }
                  })
            }
            else {
                /* mensajeSys(response.MessageDescription, 2);*/ 
            }
        }
    });

}

function PedirServicio() {

    var authToken = localStorage.getItem("TokenRepartimos");

    const deliveryQuoteId = localStorage.getItem("deliveryQuoteId");

    var latitude = "19.17418";//localStorage.getItem("latitude");
    var longitude = "-96.1263916"//localStorage.getItem("longitude");
    var address = localStorage.getItem("addressProvedor"); 
    var instructions = localStorage.getItem("instrucciones"); 


    var transportSlug = localStorage.getItem("latitude");
    var paymentMethod = localStorage.getItem("paymentMethod");
    var requiredCash =  localStorage.getItem("address"); 
    var businessId = "64d96828417dc835b81e2a16";
    var latitudeC = $("#latitud").text();
    var latitudeC = $("#longitud").text();

    const finalPriceTotal  = localStorage.getItem("Total"); + localStorage.getItem("finalPriceTotal"); 
    //Client data 

    var latitudeC = localStorage.getItem("latitude");
    var longitudeC = localStorage.getItem("longitude");
    var addressC = localStorage.getItem("address");
    var instructionsC = localStorage.getItem("instrucciones");
    

    const jsonData = {
        "locations": [
            {          
                "latitude": latitude,
                "longitude": longitude,
                "address": "rafael freyre 135",
                "instructions": instructions,           
                "businessEstablishmentId": "64e5be6e8565bb7c621970d8"
            },
            {
                "latitude": latitudeC,
                "longitude": longitudeC,
                "address": addressC,
                "instructions": instructionsC
            }
        ],
        "businessId": businessId,
        "deliveryQuoteId": deliveryQuoteId,
        "transportSlug": "motorcycle",
        "paymentMethod": "credit",
        "requiredCash": finalPriceTotal    
    };
    


    $.ajax({
        type: "POST",
        url: 'https://api.repartimos.mx/api/deliveryservice/request',
        data: jsonData,
        async: false,
        beforeSend: function(xhr) {
            // Agregar el token de autorización en la cabecera
            xhr.setRequestHeader("Authorization", authToken);
          },
        error: function () {
            /* HideWait();*/
        },
        success: function (response) {

            if (typeof (response.Success) === "undefined" || response.Success) {
                var ResponseObj = JSON.stringify(response)
                var responseJson2 = JSON.parse(ResponseObj);    
                // Obtener el valor del token
                var resp = responseJson2            
                // Hacer lo que necesites con el token
                
                localStorage.setItem("PublicUrl", resp.publicURL);  
                var url = resp.publicURL;     
                showHelp2(url)
                console.log("buscando repartidor :", resp.deliveryQuoteId );  


            }
            else {
                /* mensajeSys(response.MessageDescription, 2);*/
            }
        }
    });

}


function showHelp2(url) {
    //let newWindow = open(url, '', "fullscreen=yes,location=yes,hidden=no,beforeload=yes")      
    var target = "_blank";

    var options = "fullscreen=yes,location=yes,hidden=no,beforeload=yes";
    
    inAppBrowserRef = cordova.InAppBrowser.open(url, target, options);
  }





function ConsultarServicio(id) {

    var authToken = localStorage.getItem("TokenRepartimos");

    var id = localStorage.getItem("idServicio"); 

    $.ajax({
        type: "GET",
        url: 'https://api.repartimos.mx/api/deliveryservice/{serviceId}'+id,
        data: form_data,
        async: false,
        beforeSend: function(xhr) {
            // Agregar el token de autorización en la cabecera
            xhr.setRequestHeader("Authorization", authToken);
          },
        error: function () {
            /* HideWait();*/
        },
        success: function (response) {

            if (typeof (response.Success) === "undefined" || response.Success) {
                if (tblReporte != null) {
                  /*  tblReporte.destroy()*/;
                }

                //$("#tblHistory tbody tr").remove();
                //var trHTML = '';

                if (response.ResultService != null && response.ResultService != "undefined") {

                    alert(response.ResultService);

                }
            }
            else {
                /* mensajeSys(response.MessageDescription, 2);*/
            }
        }
    });

}


function CancelarServicio(id) {
    var authToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGQ1YWY1YTgwMzkwYmRlN2JhMWRiNmUiLCJ1c2VyVHlwZSI6ImFwaURldmVsb3BlciIsImlhdCI6MTY5MTk2NzcxMSwiZXhwIjoxNjkyMDU0MTExfQ.8We4D455bXBiBxChpr5HXfoZJZyeB9P3V9LBIo3gbYw";
    $.ajax({
        type: "GET",
        url: 'https://api.repartimos.mx/api/deliveryservice/cancel/{serviceId}'+id,
        data: form_data,
        async: false,
        beforeSend: function(xhr) {
            // Agregar el token de autorización en la cabecera
            xhr.setRequestHeader("Authorization", authToken);
          },
        error: function () {
            /* HideWait();*/
        },
        success: function (response) {

            if (typeof (response.Success) === "undefined" || response.Success) {
                if (tblReporte != null) {
                  /*  tblReporte.destroy()*/;
                }

                //$("#tblHistory tbody tr").remove();
                //var trHTML = '';

                if (response.ResultService != null && response.ResultService != "undefined") {

                    alert(response.ResultService);

                }
            }
            else {
                /* mensajeSys(response.MessageDescription, 2);*/
            }
        }
    });

}


