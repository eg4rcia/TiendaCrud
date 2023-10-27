function EnviarCorreo(){
    $("#loading").show();

    var mail = document.getElementById("txtUsu").value;
   
    $.ajax({
        type: "GET",
        crossDomain: true,   
        url: cn + "RecuperarPwd&Email="+mail,

        success: function (result) {

        console.log(result);

          location.href="codigo.html";


            
        },
        error: function (jqXmlHttpRequest, textStatus, errorThrown) {
            ToastError('Verifique su conexión');
        
        }
    });

}