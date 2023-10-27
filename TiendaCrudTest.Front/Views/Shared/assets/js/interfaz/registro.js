

function registrar() {   
    var email = document.getElementById("txtCorreo").value;
    var pwd = document.getElementById("txtPwd1").value;
    var nom =  document.getElementById("txtNombre").value;
    var ap = document.getElementById("txtP").value;
    var am = document.getElementById("txtM").value;
    var rol = document.getElementById("txtRol").value;
    var telefono = document.getElementById("txtTel1").value;
    var telefono2 = document.getElementById("txtTel2").value;
    var curp = document.getElementById("txtCurp").value;
    var edad = document.getElementById("txtEdad").value;
    var peso = document.getElementById("txtPeso").value;
    var genero = document.getElementById("txtGenero").value;
    var sangre = document.getElementById("txtSangre").value;

    var codigopostal = document.getElementById("txtCp").value;
    var estado = document.getElementById("txtEstado").value;
    var municipio = document.getElementById("txtMunicipio").value;
    var colonia = document.getElementById("txtColonia").value;
    var calle = document.getElementById("txtCalle").value;
    var nexterior = document.getElementById("txtExterior").value;
    var ninterior = document.getElementById("txtInterior").value;
    var calle1 = document.getElementById("txtCalle1").value;
    var calle2 = document.getElementById("txtCalle2").value;
    var indicaciones = document.getElementById("txtIndicaciones").value;
    console.log(cn + "AgregarUsuario&Email=" + email 
    +"&Pwd="+pwd+"&Nom="+nom+"&Ap="+ap+"&Am="+am+"&Rol="+rol+"&tel="+telefono+"&Tel2="+telefono2+"&Curp="
    +curp+"&Edad="+edad+"&Peso="+peso+"&Genero="+genero+"&TipoS="+sangre+"&CP=" + codigopostal 
    +"&Estado="+estado+"&Municipio="+municipio+"&Colonia="+colonia+"&Calle="+calle+"&ExteriorN="
    +nexterior+"&InteriorN="+ninterior+"&Calle1="+calle1+"&Calle2="
    +calle2+"&Indicaciones="+indicaciones);
    $.ajax({
        type: "GET",
        url: cn + "AgregarUsuario&Email=" + email 
        +"&Pwd="+pwd+"&Nom="+nom+"&Ap="+ap+"&Am="+am+"&Rol="+rol+"&tel="+telefono+"&Tel2="+telefono2+"&Curp="
        +curp+"&Edad="+edad+"&Peso="+peso+"&Genero="+genero+"&TipoS="+sangre+"&CP=" + codigopostal 
        +"&Estado="+estado+"&Municipio="+municipio+"&Colonia="+colonia+"&Calle="+calle+"&ExteriorN="
        +nexterior+"&InteriorN="+ninterior+"&Calle1="+calle1+"&Calle2="
        +calle2+"&Indicaciones="+indicaciones,
        success: function (result) {  
	        console.log("Resultado: "+result);
         // setTimeout('login()', 2000);
        },
        error: function (jqXmlHttpRequest, textStatus, errorThrown) {
        }
    });
}   

function registrarDomicilio(){
    $.ajax({
        type: "GET",
        url: cn + "AgregarDomicilio&CP=" + codigopostal 
        + "&Estado="+estado+"&Municipio="+municipio+"&Colonia="+colonia+"&Calle="+calle+"&ExteriorN="+nexterior+"&InteriorN="+ninterior+"&Calle1="+calle1+"&Calle2="
        +calle2+"&Indicaciones="+indicaciones,
        success: function (result) {  
	        console.log("Resultado: "+result);
         // setTimeout('login()', 2000);
        },
        error: function (jqXmlHttpRequest, textStatus, errorThrown) {
            
        }
    });

}

