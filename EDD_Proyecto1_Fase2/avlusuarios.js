//ARBOL-AVL para usuarios aceptados en el sistema
//Se van ordenando conforme orden de carnet, de archivo JSON.

class nodoArbol {
    constructor(valor,nombre,password,carpetar,arbolnario,listacircular){
        this.izquierdo = null;
        this.derecho = null;
        this.valor = valor; //valor = carnet estudiante
        this.nombre = nombre; //nombre = nombre estudiante
        this.password = password; //passsword = contraseña estudiante
        this.carpetar = carpetar; //carpeta raiz = carpeta raiz de estudiante
        this.altura = 1;
        this.factor_equilibrio = 0;
        this.arbolnario = arbolnario;
        this.listacircular = listacircular;
        //this.arboln = arbolnario
        //this.listac = new ListaCircular()
    }

    getArbolNario(){
        return this.arbol
    }

}

class ArbolAVL {
    constructor(){
        this.raiz = null;
    }

    Altura(raiz){
        return raiz === null ? 0: raiz.altura
    }

    Equilibrio(raiz){
        return raiz === null ? 0: (this.Altura(raiz.derecho)-this.Altura(raiz.izquierdo))
    }

//ROTACION A LA IZQUIERDA
//REVISAR HASTA QUE ALTURA LLEGAN LOS NODOS HOJAS.
//CUANDO EL LADO DERECHO TIENE MAS PESO O ALTURA
    RotacionI(raiz){ 
        let raiz_derecho = raiz.derecho 
        let hijo_izquierdo = raiz_derecho.izquierdo
        //cuando recibimos una raiz, almacenar del lado derecho e izquierdo del mismo hijo. 
        raiz_derecho.izquierdo = raiz 
        raiz.derecho = hijo_izquierdo 
        raiz.altura = 1 + Math.max(this.Altura(raiz.izquierdo),this.Altura(raiz.derecho))
        //la altura va a cambiar.
        raiz_derecho.altura = 1 + Math.max(this.Altura(raiz_derecho.izquierdo),this.Altura(raiz_derecho.derecho))
        raiz.factor_equilibrio = this.Equilibrio(raiz)
        raiz_derecho.factor_equilibrio = this.Equilibrio(raiz_derecho)
        return raiz_derecho
    }


    RotacionD(raiz){
        let raiz_izquierdo = raiz.izquierdo
        let hijo_derecho = raiz_izquierdo.derecho //Derecho de la misma raiz izquierda
        raiz_izquierdo.derecho = raiz
        raiz.izquierdo = hijo_derecho
        raiz.altura = 1 + Math.max(this.Altura(raiz.izquierdo),this.Altura(raiz.derecho))
        raiz_izquierdo.altura = 1 + Math.max(this.Altura(raiz_izquierdo.izquierdo),this.Altura(raiz_izquierdo.derecho))
        raiz.factor_equilibrio =  this.Equilibrio(raiz)
        raiz_izquierdo.factor_equilibrio = this.Equilibrio(raiz_izquierdo)
        return raiz_izquierdo
    }

//Cada vez que se crea un nuevo nodo, la altura del arbol va ser igual a 1.
//Math es una funcion nativa de JAVASCRIPT; va a seleccionar el mayor.
//Como izquierdo y derecho son iguales a 0.
//Sumarle + 1, cada vez que se ingresa un nodo, para saber cual es la altura mas grande del arbol.
//PARA VERIFICAR LA PROFUNDIDAD MAS ALTA DELA ARBOL.
    insertarValorHijo(nodo, raiz){
        if (raiz === null){
            raiz = nodo
        }else{
            if (raiz.valor === nodo.valor){
                raiz.valor = nodo.valor
            }else if (raiz.valor < nodo.valor) {
                raiz.derecho = this.insertarValorHijo(nodo, raiz.derecho);
            }else{
                raiz.izquierdo = this.insertarValorHijo(nodo, raiz.izquierdo);
            }
        }
        raiz.altura = 1 + Math.max(this.Altura(raiz.izquierdo),this.Altura(raiz.derecho))
        let balanceo = this.Equilibrio(raiz) //(-2)
        raiz.factor_equilibrio = balanceo
        //Rotacion Simple a la Izquierda
        if(balanceo > 1 && nodo.valor > raiz.derecho.valor){
            return this.RotacionI(raiz)
        }
        //Rotacion Simple a la Derecha
        if(balanceo < -1 && nodo.valor < raiz.izquierdo.valor){
            return this.RotacionD(raiz)
        }
        //Rotacion Doble a la Izquierda
        if(balanceo > 1 && nodo.valor < raiz.derecho.valor){
            raiz.derecho = this.RotacionD(raiz.derecho)
            return this.RotacionI(raiz)
        }
        //Rotacion Doble a la Derecha
        if(balanceo < -1 && nodo.valor > raiz.izquierdo.valor){
            raiz.izquierdo = this.RotacionI(raiz.izquierdo)
            return this.RotacionD(raiz)
        }
        return raiz
    }


    insertaValor(valor,nombre,passsword,carpetar,arbolnario,listacircular){
        const nuevoNodo = new nodoArbol(valor,nombre,passsword,carpetar,arbolnario,listacircular);
        this.raiz = this.insertarValorHijo(nuevoNodo,this.raiz);
    }


    mostrarTabla(){
        this.raiz
    }


    // RECORRIDOS PARA MOSTRAR USUARIOS

    recorridoPreorden(raiz){
        var cadena = ""
        if(raiz !== null){
            cadena += "\<tr><td>" + raiz.valor + "\</td><td>" + raiz.nombre + "\</td></tr>"
            if(raiz.izquierdo !== null){
                cadena = cadena + this.recorridoPreorden(raiz.izquierdo)
            }
            if(raiz.derecho !== null){
                cadena = cadena + this.recorridoPreorden(raiz.derecho)
            }
        }
        return cadena
    }

    recorridoInorden(raiz){
        var cadena = ""
        if(raiz !== null){
            if(raiz.izquierdo !== null){ 
                cadena += this.recorridoInorden(raiz.izquierdo)
            }
            cadena += "\<tr><td>" + raiz.valor + "\</td><td>" + raiz.nombre + "\</td></tr>"
            if(raiz.derecho !== null){
                cadena += this.recorridoInorden(raiz.derecho)
            }
        }
        return cadena
    }

    recorridoPostOrden(raiz){
        var cadena = ""
        if(raiz !== null){
            if(raiz.izquierdo !== null){
                cadena += this.recorridoPostOrden(raiz.izquierdo)
            }
            if(raiz.derecho !== null){
                cadena += this.recorridoPostOrden(raiz.derecho)
            }
            cadena += "\<tr><td>" + raiz.valor + "\</td><td>" + raiz.nombre + "\</td></tr>"
        }
        return cadena
    }



    
    //FUNCIONES PARA GRAFICAR AVL GRAPHVIZ
    grafica_arbol(){
        var cadena = "";
        if(!(this.raiz === null)){
            cadena = "digraph arbol{ ";
            cadena = cadena + this.retornarValoresArbol(this.raiz, 0);
            cadena = cadena + "}";
        }else{
            cadena = "No hay valores en el arbol";
        }
        return cadena;
    }





    
    retornarValoresArbol(raiz, id){
        var cadena = "";
        var numero = id + 1;
        if(!(raiz === null)){
            cadena += "\"";
            cadena += raiz.valor + "\\n" + raiz.nombre + "\\n" + " Altura: " + raiz.altura;
            cadena += "\" ;";
            if(!(raiz.izquierdo === null) && !(raiz.derecho === null)){
                cadena += " x" + numero + " [label=\"\",width=.1,style=invis];"
                cadena += "\"";
                cadena += raiz.valor + "\\n" + raiz.nombre + "\\n" + " Altura: " + raiz.altura;
                cadena += "\" -> ";
                cadena += this.retornarValoresArbol(raiz.izquierdo, numero)
                cadena += "\"";
                cadena += raiz.valor + "\\n" + raiz.nombre + "\\n" + " Altura: " + raiz.altura;
                cadena += "\" -> ";
                cadena += this.retornarValoresArbol(raiz.derecho, numero)
                cadena += "{rank=same" + "\"" + raiz.izquierdo.valor + "\\n" + raiz.izquierdo.nombre + "\\n" + " Altura: " + raiz.izquierdo.altura  + "\"" + " -> " + "\"" + raiz.derecho.valor + "\\n" + raiz.derecho.nombre + "\\n" + " Altura: " + raiz.derecho.altura + "\""  + " [style=invis]}; "
            }else if(!(raiz.izquierdo === null) && (raiz.derecho === null)){
                cadena += " x" + numero + " [label=\"\",width=.1,style=invis];"
                cadena += "\"";
                cadena += raiz.valor + "\\n" + raiz.nombre + "\\n" + " Altura: " + raiz.altura;
                cadena += "\" -> ";
                cadena += this.retornarValoresArbol(raiz.izquierdo, numero)
                cadena += "\"";
                cadena += raiz.valor + "\\n" + raiz.nombre + "\\n" + " Altura: " + raiz.altura;
                cadena += "\" -> ";
                cadena += "x" + numero + "[style=invis]";
                cadena += "{rank=same" + "\"" + raiz.izquierdo.valor + "\\n" + raiz.izquierdo.nombre + "\\n" + " Altura: " + raiz.izquierdo.altura + "\"" + " -> " + "x" + numero + " [style=invis]}; "
            }else if((raiz.izquierdo === null) && !(raiz.derecho === null)){
                cadena += " x" + numero + " [label=\"\",width=.1,style=invis];"
                cadena += "\"";
                cadena += raiz.valor + "\\n" + raiz.nombre + "\\n" + " Altura: " + raiz.altura;
                cadena += "\" -> ";
                cadena += "x" + numero + "[style=invis]";
                cadena += "; \"";
                cadena += raiz.valor + "\\n" + raiz.nombre + "\\n" + " Altura: " + raiz.altura;
                cadena += "\" -> ";
                cadena += this.retornarValoresArbol(raiz.derecho, numero)
                cadena += "{rank=same" + " x" + numero + " -> \"" + raiz.derecho.valor + "\\n" + raiz.derecho.nombre + "\\n" + " Altura: " + raiz.derecho.altura + "\"" +  " [style=invis]}; "
            }
        }
        return cadena;
    }



    /** 
         * Contenido de graficar los diferentes recorridos del arbol
         */
    recorridosArbol(){
        console.log("Recorrido Pre-Orden")
        let url = 'https://quickchart.io/graphviz?graph=';
        let body = "digraph G { graph[label = \"Pre-Orden\" rankdir = LR labelloc = t] node [ shape=none fontname=Helvetica ] n3 [ label = <<table border=\"1\"> <tr><td bgcolor=\"yellow\">Carnet  </td><td bgcolor=\"yellow\"> Nombre </td></tr>" + this.recorridoPreorden(this.raiz) + " </table> > ] }";
        console.log(body)
        $("#image1").attr("src", url + body);
        console.log("Recorrido In-Orden")
        body = "digraph G { graph[label = \"In-Orden\" rankdir = LR labelloc = t] node [ shape=none fontname=Helvetica ] n3 [ label = <<table border=\"1\"> <tr><td bgcolor=\"yellow\">Carnet  </td><td bgcolor=\"yellow\"> Nombre </td></tr> " + this.recorridoInorden(this.raiz) + " </table> > ] }";
        $("#image2").attr("src", url + body);
        console.log("Recorrido Post-Orden")
        body = "digraph G { graph[label = \"Post-Orden\" rankdir = LR labelloc = t] node [ shape=none fontname=Helvetica ] n3 [ label = <<table border=\"1\"> <tr><td bgcolor=\"yellow\">Carnet  </td><td bgcolor=\"yellow\"> Nombre </td></tr>" + this.recorridoPostOrden(this.raiz) + " </table> > ] }";
        $("#image3").attr("src", url + body);
}

    recorrerPreOrden(){
        console.log("Recorrido Pre-Orden")
        let url = 'https://quickchart.io/graphviz?graph=';
        let body = "digraph G { graph[label = \"Pre-Orden\" rankdir = LR labelloc = t] node [ shape=none fontname=Helvetica ] n3 [ label = <<table border=\"1\"> <tr><td bgcolor=\"yellow\">Carnet  </td><td bgcolor=\"yellow\"> Nombre </td></tr>" + this.recorridoPreorden(this.raiz) + " </table> > ] }";
        console.log(body)
        $("#imagetable").attr("src", url + body);
    }


    recorrerEnOrden(){
        console.log("Recorrido In-Orden")
        let url = 'https://quickchart.io/graphviz?graph=';
        let body = "digraph G { graph[label = \"In-Orden\" rankdir = LR labelloc = t] node [ shape=none fontname=Helvetica ] n3 [ label = <<table border=\"1\"> <tr><td bgcolor=\"yellow\">Carnet  </td><td bgcolor=\"yellow\"> Nombre </td></tr> " + this.recorridoInorden(this.raiz) + " </table> > ] }";
        $("#imagetable").attr("src", url + body);
    }



    recorrerPostOrden(){
        console.log("Recorrido Post-Orden")
        let url = 'https://quickchart.io/graphviz?graph=';
        let body = "digraph G { graph[label = \"Post-Orden\" rankdir = LR labelloc = t] node [ shape=none fontname=Helvetica ] n3 [ label = <<table border=\"1\"> <tr><td bgcolor=\"yellow\">Carnet  </td><td bgcolor=\"yellow\"> Nombre </td></tr>" + this.recorridoPostOrden(this.raiz) + " </table> > ] }";
        $("#imagetable").attr("src", url + body);
    }


    eliminarTodo(){
        this.raiz = null;
    }

    getEstudiante(valor){
        var tmp = this.raiz
        while (tmp != null) {
            if(tmp.izquierdo !== null){
                if (valor == tmp.izquierdo.valor) {
                    return tmp
                } 
            }
            if(raiz.derecho !== null){
                if (valor == raiz.derecho.valor) {
                    return tmp
                } 
            }
            if (valor == tmp.valor) {
                return tmp
            }   
        } 
        return null
    }


}


const binaryTreeAVL = new ArbolAVL();

function limpiar(){
    binaryTreeAVL.eliminarTodo();
    let url = 'https://quickchart.io/graphviz?graph=digraph G { arbol }';
    $("#imageavl").attr("src", url);
    document.getElementById("valor").value = "";
    document.getElementById("nombre").value = "";
    document.getElementById("altura").value = "";
}

function refrescarArbol(){
    let url = 'https://quickchart.io/graphviz?graph=';
    let body = binaryTreeAVL.grafica_arbol();
    $("#imageavl").attr("src", url + body);
    document.getElementById("carnet").value = "";
}




// FUNCIONES PARA RECORRER ARBOLES

function recorrerArbol(){
    binaryTreeAVL.recorridosArbol();
}


function recorrerArbolInOrden(){
    binaryTreeAVL.recorrerEnOrden();
}

function recorrerArbolPreOrden(){
    binaryTreeAVL.recorrerPreOrden();
}

function recorrerArbolPosOrden(){
    binaryTreeAVL.recorrerPostOrden();
}


const inputElement = document.getElementById("input");
inputElement.addEventListener("change", onChange, false);
function onChange(event) {
    var reader = new FileReader();
    reader.onload = onReaderLoad;
    reader.readAsText(event.target.files[0]);
}

function onReaderLoad(event){
    var obj = JSON.parse(event.target.result);
    for(var i = 0; i < obj.alumnos.length; i++){
        localStorage.setItem('alumnos',JSON.stringify(obj.alumnos))
        binaryTreeAVL.insertaValor(obj.alumnos[i].carnet,obj.alumnos[i].nombre,obj.alumnos[i].password,obj.alumnos[i].Carpeta_Raiz,'{}','{}')
    }
    localStorage.setItem('arbol',JSON.stringify(binaryTreeAVL))
    console.log(localStorage.getItem('arbol'))
    refrescarArbol();
}


function llenarAVL(){

}



function agregarAVL(){
    var carnet = document.getElementById("carnet").value;
    var nombre = document.getElementById("nombre").value;
    var password =  document.getElementById("password").value;

    AVL.insertaValor(carnet,nombre,password,'/',arbolnario,'{}')
    console.log(AVL)
}


//RECORRIDO DE ARBOL AVL PARA FUNCION LOGIN DE USUARIOS
function recorridoAVL(raiz, usuario, password) {
    if (raiz == null) {
        alert("El usuario o contraseña es incorrecto");
        return;
    }

    if (usuario == raiz.valor && password == raiz.password) {
        alert("Se encontró al estudiante " + raiz.nombre + " en el sistema!");
        window.location = "userpage.html";
        return raiz;
    }

    if (usuario < raiz.valor) {
        return recorridoAVL(raiz.izquierdo, usuario, password);
    } else {
        return recorridoAVL(raiz.derecho, usuario, password);
    }

}


//RECORRIDO DE ARBOL AVL PARA INSERTAR ARBOL NARIO
function recorridoArbol(raiz, usuario, password) {
    var arboln = JSON.parse(localStorage.getItem('arbolnario'));
    var arbol = JSON.parse(localStorage.getItem('arbol'))

    if (raiz == null) {
        alert("El usuario o contraseña es incorrecto");
        return;
    }

    if (usuario == raiz.valor && password == raiz.password) {
        alert("Se guardan las carpetas a  " + raiz.nombre);
        arbol.raiz.arbolnario = arboln;
        localStorage.setItem('arbol',JSON.stringify(arbol));
        return raiz;
    }

    if (usuario < raiz.valor) {
        return recorridoAVL(raiz.izquierdo, usuario, password);
    } else {
        return recorridoAVL(raiz.derecho, usuario, password);
    }

}


function guardararbolnario(){
    var usuario, password
    usuario = document.getElementById("carnet").value;
    password = document.getElementById("password").value;

    var arbolavl2 = localStorage.getItem('arbol');
    var data2 = JSON.parse(arbolavl2);
    console.log(arbolavl2);
   

    var nodo = recorridoArbol(data2.raiz, usuario, password);
    if (nodo) {
        return nodo;
    } 
}


function generarImagenUserLog(raiz){
    var cadena = ""
    if(raiz !== null){
        if(raiz.izquierdo !== null){
            cadena += this.recorridoPostOrden(raiz.izquierdo)
        }
        if(raiz.derecho !== null){
            cadena += this.recorridoPostOrden(raiz.derecho)
        }
        cadena += "Bienvenido a la sesión" + raiz.valor + "!" 
    }
    return cadena
}

function mostrarLogUser(){
    var arbolavl = localStorage.getItem('arbol');
    var data = JSON.parse(arbolavl);

    console.log("Se entró al sistema")
    let url = 'https://quickchart.io/graphviz?graph=';
    let body = "digraph G { graph[label = \"Bienvenido a EDD GoDrive\" rankdir = LR labelloc = t] node [ shape=none fontname=Helvetica ]" + this.recorridoAVL(data.raiz) + "}";
    $("#imageuser").attr("src", url + body);
}




//LOGIN PARA USUARIOS DE ARBOL AVL
function login() {
    var usuario = document.getElementById("usuario").value;
    var password = document.getElementById("contrasena").value;

    if (usuario == "Admin" && password == "Admin") { 
        window.location = "dashboardadmin.html";
        return;
    }

    var arbolavl = localStorage.getItem('arbol');
    var data = JSON.parse(arbolavl);
    console.log(arbolavl);

    var nodo = recorridoAVL(data.raiz, usuario, password);
    if (nodo) {
        return nodo;
    } 
}



//////////////////////////////////

function cargarLocalaAVL(){
    var user, password
    user = document.getElementById("usuario").value;
    password = document.getElementById("contrasena").value;

    var arbolavl = localStorage.getItem('arbol');
    var data = JSON.parse(arbolavl);
    console.log(arbolavl);

    //for (var i = 0; i < stringify.length; i++) {
        //console.log(stringify[i]['valor']);
        //console.log(stringify[i]['password']);
    //}

    if (user == "Admin" && password == "Admin") { 
        window.location = "dashboardadmin.html";
    } else if (data.raiz != null) {
       binaryTreeAVL.getEstudiante(data.raiz.valor)
        
    } else {
        alert("El usuario no se encuentra en el sistema")
    }

}

