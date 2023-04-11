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

function check() {

    // stored data from the register-form
    var carne = localStorage.getItem('carnet');
    var pass = localStorage.getItem('password');

    // check if stored data from register-form is equal to data from login form
    if(user == carne && password == pass) {
        alert('You are loged in.');
    }else {
        alert('ERROR.');
    }
}