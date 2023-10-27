function login() {
  $("#loading").show();
    var user = document.getElementById("username").value;
    var recordar = document.getElementById("basic-checkbox").checked;
    localStorage.setItem('usuario', user);
    var pwd = document.getElementById("password").value;
    // user = window.btoa(user);  //quitar para el ws de ema
    // pwd = window.btoa(pwd);  //quitar para el ws de ema
    //alert( cn + "Loginapp&User="+user+"&Pwd="+pwd );
      if(user != '' && pwd != ''){  
        var tk = document.getElementById("miToken").value
        insertTk(user, tk);
      $.ajax({
          type: "GET",
          crossDomain: true,   
          url: cn + "Loginapp&User="+user+"&Pwd="+pwd ,
          success: function (result) {
        
              //var res1 = result.split('<');
              //var res2 = res1[0].split(',');
              if (result != "0") {
                  info(user);   
                  if(recordar == true){
                    localStorage.setItem("sesion", 1);
                  }
                  else{
                    localStorage.removeItem("sesion");
                  }
              }
              else{  
                  setTimeout($("#loading").hide(), 1000);
                  ToastError("Datos Incorrectos");
              }
          },
          error: function (jqXmlHttpRequest, textStatus, errorThrown) {
            setTimeout($("#loading").hide(), 1000);
            ToastWarning("Verifique su conexión");
          }
      });
      }
      else{
        setTimeout($("#loading").hide(), 1000);
        ToastWarning("Agregue los datos solicitados");
      }          
}

function cerrar(){
    localStorage.removeItem("sesion");
    window.location.href = "login.html"
}

function entrar(){
    window.location.href = "dashboard.html";
}

function info(user){
    $.ajax({
        type: "GET",
        url: cn + "Infouserapp&User=" + user,
        success: function (result) {
          console.log(result);
            var dato = result.split('|');
            
            localStorage.setItem("nombre", dato[0]);  //cambiar
            localStorage.setItem("email", dato[17]);
            localStorage.setItem("Apellido", dato[1] + ' ' + dato[2]);
            localStorage.setItem("matricula", dato[12]);  
            localStorage.setItem("telefono", dato[13]); 
            localStorage.setItem("semestre", dato[11]); 
            localStorage.setItem("nss", dato[15]);   
            localStorage.setItem("carrera", dato[10]); 
            localStorage.setItem("curp", dato[14]); 
            localStorage.setItem("rol", dato[9]);
            localStorage.setItem("usuario", user);
            localStorage.setItem("Nombre", dato[0]);
            localStorage.setItem("idu", dato[21]);

            if(dato[9] == "Paciente"){ // PACIENTE
              setTimeout(function(){location.href="inicio_cliente.html"} , 1000); 
            }
            if(dato[9] == "Proveedor"){// PROVEEDOR
              setTimeout(function(){location.href="inicio.html"} , 1000); 
            }
            if(dato[9] == "Doctor"){// DOCTOR
              setTimeout(function(){location.href="inicio.html"} , 1000); 
            }
            if(dato[9] == "Enfermero"){// ENFERMERO
              setTimeout(function(){location.href="inicio.html"} , 1000); 
            }
        },
        error: function (jqXmlHttpRequest, textStatus, errorThrown) {   
        }
    });
}

function registrarme(){
            localStorage.removeItem("nombre");  
            localStorage.removeItem("email");   
            localStorage.removeItem("matricula");  
            localStorage.removeItem("telefono"); 
            localStorage.removeItem("semestre"); 
            localStorage.removeItem("nss");   
            localStorage.removeItem("carrera"); 
            localStorage.removeItem("curp"); 
            localStorage.removeItem("domicilio");
            localStorage.removeItem("usuario");
            localStorage.setItem("registro", 1)
            window.location.href = "perfil.html";
}

function insertTk(email,tk){
  $.ajax({
    type: "GET",
    crossDomain: true,   
    url: cn + "Token&Email="+email+"&Token="+tk,
    success: function (result) {
    },
    error: function (jqXmlHttpRequest, textStatus, errorThrown) {
    }
});
}

function verificar(){
  var ses = localStorage.getItem("sesion");
  var rol = localStorage.getItem("rol");
  if(ses == "1"){
    if(rol == "Paciente"){ // PACIENTE
      setTimeout(function(){location.href="inicio_cliente.html"} , 1000); 
    }
    if(rol == "Proveedor"){// PROVEEDOR
      setTimeout(function(){location.href="inicio.html"} , 1000); 
    }
    if(rol == "Doctor"){// DOCTOR
      setTimeout(function(){location.href="inicio.html"} , 1000); 
    }
    if(rol == "Enfermero"){// ENFERMERO
      setTimeout(function(){location.href="inicio.html"} , 1000); 
    }
  }
  else{
    $("#loading").hide();
  }
}