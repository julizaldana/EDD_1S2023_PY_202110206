function login(){
    var user, password
    user = document.getElementById("usuario").value;
    password = document.getElementById("contrasena").value;

    if (user == "Admin" && password == "Admin") { 
        window.location = "dashboardadmin.html";
    } else {
        alert("El usuario no se encuentra en el sistema")
    }

}