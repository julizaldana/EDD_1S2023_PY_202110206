//CLASE Y FUNCIONES PARA TABLA HASH - Para almacenar estudiantes/usuarios

class nodoHash{
    constructor(carnet, usuario, password, arbolnario){
        this.carnet = carnet
        this.usuario = usuario
        this.password = password
        this.arbolnario = arbolnario
    }
}

class TablaHash{
    constructor(){
        this.tabla = new Array(7)
        this.capacidad = 7
        this.utilizacion = 0
    }

    insertar(carnet, usuario, password, arbolnario){
        let indice = this.calculoIndice(carnet)
        const nuevoNodo = new nodoHash(carnet, usuario, password, arbolnario)
        if(indice < this.capacidad){
            try{
                if(this.tabla[indice] == null){
                    console.log("Entre")
                    this.tabla[indice] = nuevoNodo
                    this.utilizacion++
                    this.capacidad_tabla()
                }else{
                    let contador = 1
                    indice = this.RecalculoIndice(carnet,contador)
                    while(this.tabla[indice] != null){
                        contador++
                        indice = this.RecalculoIndice(carnet, contador)
                    }
                    this.tabla[indice] = nuevoNodo
                    this.utilizacion++
                    this.capacidad_tabla()
                }
            }catch(err){
                console.log("Hubo un error en insercion")
            }
        }
    }

    calculoIndice(carnet){ 
        let carnet_cadena = carnet.toString()
        let divisor = 0
        for(let i = 0; i < carnet_cadena.length; i++){
            divisor = divisor + carnet_cadena.charCodeAt(i)
        }
        let indice_final = divisor % this.capacidad
        return indice_final
    }

    capacidad_tabla(){
        let aux_utilizacion = this.capacidad*0.75
        if(this.utilizacion > aux_utilizacion){
            this.capacidad = this.nueva_capacidad()
            this.utilizacion = 0
            this.ReInsertar()
        } 
    }

    nueva_capacidad(){ //Sustituir por un algoritmo del siguiente numero primo
        let numero = this.capacidad + 1;
        while (!this.isPrime(numero)) {
          numero++;
        }
        return numero;
    }

    ReInsertar(){
        const auxiliar_tabla = this.tabla
        this.tabla = new Array(this.capacidad)
        auxiliar_tabla.forEach((alumno) => {
            this.insertar(alumno.carnet, alumno.usuario, alumno.password, alumno.arbolnario)
        })
    }

    RecalculoIndice(carnet, intento){
        let nuevo_indice = this.calculoIndice(carnet) + intento*intento
        let nuevo = this.nuevo_Indice(nuevo_indice)
        return nuevo
    }

    nuevo_Indice(numero){
        let nueva_posicion = 0
        if(numero < this.capacidad){
            nueva_posicion = numero
        }else{
            nueva_posicion = numero - this.capacidad
            nueva_posicion = this.nuevo_Indice(nueva_posicion)
        }
        return nueva_posicion
    }

    busquedaLogin(carnet, pass_log){
        var user, contrasena
        user = document.getElementById("usuario").value;
        contrasena = document.getElementById("contrasena").value;

        let indice = this.calculoIndice(carnet)
        if(indice < this.capacidad){
            try{
                if(this.tabla[indice] == null){
                    alert("No se encontró al alumno")
                }else if(this.tabla[indice] != null && this.tabla[indice].carnet == carnet){
                    if (this.tabla[indice].password = pass_log) {
                        alert("Bienvenido " + this.tabla[indice].usuario)
                        window.location = "userpagef3.html"
                    }
                    alert("Bienvenido " + this.tabla[indice].usuario)
                    
                }else{
                    let contador = 1
                    indice = this.RecalculoIndice(carnet,contador)
                    while(this.tabla[indice] != null){
                        if(this.tabla[indice].carnet == carnet){
                            if(this.tabla[indice].password == pass_log) {
                                alert("Bienvenido " + this.tabla[indice].usuario)
                                window.location = "userpagef3.html"
                            } else {
                                alert("Contraseña es incorrecta")
                            }
                            return
                        }  
                        contador++
                        indice = this.RecalculoIndice(carnet,contador)         
                    }
                }
            }catch(err){
                console.log("Hubo un error al encontrar el usuario")
            }
        }
    }

    //TABLA PARA MOSTRAR USUARIOS

    genera_tabla() {
        // Obtener la referencia del elemento body
        var body = document.getElementsByTagName("body")[0];
      
        // Crea un elemento <table> y un elemento <tbody>
        var divtable = document.createElement("div");
        var tabla   = document.createElement("table");
        var tblBody = document.createElement("tbody");
        var salto_html = document.createElement("br")
        divtable.className = "container"
        tabla.className = "table"
        //carnet
        var encabezado = document.createElement("tr")
        var celda_encabezado = document.createElement("td");
        var encabezado_contenido = document.createTextNode("Carnet")
        celda_encabezado.appendChild(encabezado_contenido);
        encabezado.appendChild(celda_encabezado)
        tblBody.appendChild(encabezado)
        //Nombre
        celda_encabezado = document.createElement("td");
        encabezado_contenido = document.createTextNode("Nombre")
        celda_encabezado.appendChild(encabezado_contenido);
        encabezado.appendChild(celda_encabezado)
        tblBody.appendChild(encabezado)
        //Password
        celda_encabezado = document.createElement("td");
        encabezado_contenido = document.createTextNode("Password")
        celda_encabezado.appendChild(encabezado_contenido);
        encabezado.appendChild(celda_encabezado)
        tblBody.appendChild(encabezado)

        for(var i = 0; i < this.capacidad; i++){
            if(this.tabla[i] != null){
                var hilera = document.createElement("tr");
                var arreglo = new Array(4)
                arreglo[0] = this.tabla[i].carnet
                arreglo[1] = this.tabla[i].usuario
                arreglo[2] = this.tabla[i].password
                arreglo[3] = this.tabla[i].arboln
                for(var j = 0; j < 3; j++){
                    var celda = document.createElement("td");
                    var textoCelda = document.createTextNode(arreglo[j]);
                    celda.appendChild(textoCelda);
                    hilera.appendChild(celda);
                }
                tblBody.appendChild(hilera);
            }
        }


        divtable.appendChild(tabla)
        // posiciona el <tbody> debajo del elemento <table>
        tabla.appendChild(tblBody);
        // appends <table> into <body>
        body.appendChild(salto_html);
        body.appendChild(divtable);
        // modifica el atributo "border" de la tabla y lo fija a "2";
        tabla.setAttribute("border", "2");
    }

    isPrime(numero) {
        if (numero <= 1) {return false}
        if (numero === 2) {return true}
        if (numero % 2 === 0) {return false}
        for (let i = 3; i <= Math.sqrt(numero); i += 2) {
          if (numero % i === 0) {return false};
        }
        return true;
    }

    async sha256(mensaje) {
        let cadenaFinal
        const enconder = new TextEncoder();
        const mensajeCodificado = enconder.encode(mensaje)
        await crypto.subtle.digest("SHA-256", mensajeCodificado)
        .then(result => { 
            const hashArray = Array.from(new Uint8Array(result))
            const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
            cadenaFinal = hashHex
        })
        .catch(error => console.log(error))
        return cadenaFinal;
    }
    

}

const tablaHash = new TablaHash()





const inputElement = document.getElementById("input");
inputElement.addEventListener("change", onChange, false);
function onChange(event) {
    var reader = new FileReader();
    reader.onload = onReaderLoad;
    reader.readAsText(event.target.files[0]);
}

//FUNCION PARA PODER CARGAR USUARIOS CON JSON.
async function onReaderLoad(event){
    var obj = JSON.parse(event.target.result);
    for(var i = 0; i < obj.alumnos.length; i++){
        tablaHash.insertar(obj.alumnos[i].carnet, obj.alumnos[i].nombre, await tablaHash.sha256(obj.alumnos[i].password))
    }
    console.log(tablaHash.tabla)
    localStorage.setItem('tablahashusers',JSON.stringify(tablaHash.tabla))
    console.log(localStorage.getItem('tablahashusers'))
    tablaHash.genera_tabla()
}

//FUNCION LOGIN CON TABLA HASH
function loginHash(){
    var carnet = document.getElementById("usuario").value;
    var contraseña = document.getElementById("contrasena").value;

    if (carnet == "Admin" && contraseña == "Admin") {
        window.location = "dashboardadminf3.html";
    } else {
        try {
            verificarLoginHash()
        }
        catch(err){
            console.log("No se encuentra al usuario")
        }
    } 
}


async function busqueda(){
    let carnet = document.getElementById("valor").value;
    let passw = document.getElementById("passw").value;
    let pass_log = await tablaHash.sha256(passw)
    tablaHash.busquedaLogin(carnet, pass_log);

}


//ESTE NO SE USA
async function loginHashV2() {
    var hasht = localStorage.getItem('tablahashusers');
    const data = JSON.parse(hasht)
    console.log(hasht)

    for (let i = 0; i < data.length; i++) {
        const obj = data[i];
        if (obj) { // check if the element is not null
          var carnet = obj.carnet;
          var password = obj.password;
          console.log(carnet, password);
        }
      }
}


//LOGIN QUE REVISAMOS
async function verificarLoginHash() {
    var carne = document.getElementById("usuario").value;
    var contraseña = document.getElementById("contrasena").value;

    var hashtabla = localStorage.getItem('tablahashusers');
    const data = JSON.parse(hashtabla)
    console.log(hashtabla)

        for (let i = 0; i < data.length; i++) {
            const obj = data[i];
            if (obj) { 
                if (obj.carnet == carne &&  obj.password == await tablaHash.sha256(contraseña)) {
                    alert("El usuario " + " " + obj.usuario  + " " + " ha sido encontrado en el sistema!"),
                    window.location = "userpagef3.html";  
                }
            } 
        }
}





//FUNCION PARA CARGAR DE AVL A TABLA HASH CON RECORRIDO INORDEN.
async function avltoHashtable(nodo) {
    if (nodo != null) {
        if (nodo.izquierdo != null) {
            avltoHashtable(nodo.izquierdo);
        }
        console.log(`valor: ${nodo.valor}, nombre: ${nodo.nombre}, password: ${nodo.password}, arbolnario: ${ JSON.stringify(nodo.arbolnario)}`);
        AVLinfotoHASH(nodo)
        if (nodo.derecho != null) {
            avltoHashtable(nodo.derecho);
        }
    }
    console.log(tablaHash.tabla) 
}

async function AVLinfotoHASH(nodo){
    tablaHash.insertar(nodo.valor, nodo.nombre, await tablaHash.sha256(nodo.password), nodo.arbolnario);
}

function cargarAVLtoHash(){
    var arbolavl = JSON.parse(localStorage.getItem('arbol'));
    avltoHashtable(arbolavl.raiz);
}

function motrarTablaHash(){
    tablaHash.genera_tabla()
    localStorage.setItem('tablahashusers',JSON.stringify(tablaHash.tabla))
}
