//ARBOL-AVL para usuarios aceptados en el sistema
//Se van ordenando conforme orden de carnet, de archivo JSON.

class nodoArbol {
    constructor(valor,nombre,password,carpetar){
        this.izquierdo = null;
        this.derecho = null;
        this.valor = valor; //valor = carnet estudiante
        this.nombre = nombre; //nombre = nombre estudiante
        this.password = password; //passsword = contraseña estudiante
        this.carpetar = carpetar; //carpeta raiz = carpeta raiz de estudiante
        this.altura = 1;
        this.factor_equilibrio = 0;
        this.arbol = new ArbolNArio()
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


    insertaValor(valor,nombre,passsword,carpetar){
        const nuevoNodo = new nodoArbol(valor,nombre,passsword,carpetar);
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
            if (tmp.valor == valor) {
                return tmp
            } 
            tmp = tmp.derecho
            tmp = tmp.izquierdo
            
        } return null
    }
    



}


const binaryTreeAVL = new ArbolAVL();

function agregarVariosNumeros(){
    let valor = document.getElementById("carnet").value;
    let valores = valor.split(',');
    try {
        valores.forEach((numero) => {
            binaryTreeAVL.insertaValor(parseInt(numero))
        });
    } catch (error) {
        console.log(error)
    }
    refrescarArbol();
}

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
        binaryTreeAVL.insertaValor(obj.alumnos[i].carnet,obj.alumnos[i].nombre,obj.alumnos[i].password,obj.alumnos[i].Carpeta_Raiz)
    }
    localStorage.setItem('arbol',JSON.stringify(binaryTreeAVL))
    console.log(localStorage.getItem('arbol'))
    refrescarArbol();
}


//RECORRIDO DE ARBOL AVL PARA FUNCION LOGIN DE USUARIOS
function recorridoAVL(raiz){
    usuario = document.getElementById("usuario").value;
    password = document.getElementById("contrasena").value;

    if(raiz !== null){
        if(raiz.izquierdo !== null){
            this.recorridoAVL(raiz.izquierdo)
            if (usuario == raiz.izquierdo.valor && password == raiz.izquierdo.password) {
                alert("Se encontró al estudiante en el sistema!")
                window.location = "userpage.html"
                return raiz
            } else {
                alert("Buscando al estudiante...")
            }
        }
        if(raiz.derecho !== null){
            this.recorridoAVL(raiz.derecho)
            if (usuario == raiz.derecho.valor && password == raiz.derecho.password) {
                alert("Se encontró al estudiante en el sistema!")
                window.location = "userpage.html"
                return raiz
            } 
            else {
                alert("Buscando al estudiante...")
            }
        }
        if (usuario == raiz.valor && password == raiz.password) {
            alert("Se encontró al estudiante en el sistema!")
            window.location = "userpage.html";
            return raiz
        }
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
function login(e){
    event.preventDefault();

    usuario = document.getElementById("usuario").value;
    password = document.getElementById("contrasena").value;

    var arbolavl = localStorage.getItem('arbol');
    var data = JSON.parse(arbolavl);
    console.log(arbolavl);
    console.log(data.raiz);
    console.log(data.raiz.derecho);
   
    if (usuario == "Admin" && password == "Admin") { 
        window.location = "dashboardadmin.html";
    } else if (data.raiz != null) {
        recorridoAVL(data.raiz)
    } else {
        alert("El usuario no se encuentra en el sistema")
    }
}







//////////////////////////////////

function logs(){
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


function comprobarCarnet(){
    var comprobcarnet
    comprobcarnet = document.getElementById("carnetp")
    var arbolavl = localStorage.getItem('arbol');
    var data = JSON.parse(arbolavl);
    console.log(arbolavl);

    student = recorridoAVL(data.raiz.valor)
    localStorage.setItem('arbol2',student) 
    if (student == null){
        alert("Carnet incorrecto o no registrado")
    } else {
        student.arbol.agregarVarios()     
        alert("Carpeta agregada a estudiante")
    }
}

///////////////////// FUNCIONES PARA ARBOL N-ARIO

class nodoArbolN{
    constructor(valor, id){
        this.siguiente = null;
        this.valor = valor; //valor -> carpeta raiz
        this.primero = null;
        this.id = id;
        //this.matriz = new Matriz()
    }
}

class ArbolNArio{
    constructor(){
        this.raiz = new nodoArbolN("/", 0)
        this.nodo_creados = 1;
    }

    BuscarCarpeta(carpeta_nueva, lista_carpeta){
        //Si la nueva carpeta se creara en la raiz, se buscara si existe o no
        if(lista_carpeta[1] === "" && this.raiz.primero !== null){
            let aux = this.raiz.primero
            while(aux){
                if(aux.valor === carpeta_nueva){
                    return 1
                }
                aux = aux.siguiente
            }
            return 2
        }
        //Si la nueva carpeta se creara en la raiz pero no existe ninguna carpeta
        else if (lista_carpeta[1] === "" && this.raiz.primero === null){
            return 5
        }
        //Si la nueva carpeta se creara en algun directorio pero la raiz no posee ninguna carpeta
        else if(lista_carpeta[1] !== "" && this.raiz.primero === null){
            return 3
        }
        //Buscamos el directorio padre y revisar si en sus hijos existe la carpeta
        else if(lista_carpeta[1] !== "" && this.raiz.primero !== null){
            let aux = this.raiz.primero
            let nivel = lista_carpeta.length
            let posicion = 1; 
            for(var i = 1; i < nivel; i++){
                if(aux !== null){
                    while(aux){
                        if(posicion < lista_carpeta.length && lista_carpeta[posicion] === aux.valor){
                            posicion++
                            if(aux.primero !== null && posicion < lista_carpeta.length){
                                aux = aux.primero
                            }
                            break;
                        }else{
                            aux = aux.siguiente
                        }
                    }
                }else{
                    break;
                }
            }
            if(aux !== null){
                aux = aux.primero
                while(aux){
                    if(aux.valor === carpeta_nueva){
                        return 1
                    }
                    aux = aux.siguiente
                }
                return 2
            }else{
                return 4
            }

        }
    }
    //Funcion solo para ordenar la lista de hijos cuando el padre posee varios hijos
    insertarOrdenado(raiz, nuevoNodo){
        let piv = raiz.primero
        if(nuevoNodo.valor < raiz.primero.valor){
            nuevoNodo.siguiente = raiz.primero
            raiz.primero = nuevoNodo
            return raiz
        }else{
            while(piv.siguiente){
                if( nuevoNodo.valor > piv.valor && nuevoNodo.valor < piv.siguiente.valor){
                    nuevoNodo.siguiente = piv.siguiente
                    piv.siguiente = nuevoNodo
                    return raiz
                }else if(nuevoNodo.valor < piv.valor){
                    nuevoNodo.siguiente = piv
                    piv =  nuevoNodo
                    return raiz
                }else{
                    piv = piv.siguiente
                }
            }
            piv.siguiente = nuevoNodo
            return raiz
        }
    }
    // /usac/prueba -> prueba1 /usac/prueba(prueba1)
    insertarHijos(carpeta_nueva, lista_carpeta){
        /**
         * creamos el nuevo nodo y aumentamos la cantidad de nodos creados
         */
        const nuevoNodo = new nodoArbolN(carpeta_nueva, this.nodo_creados)
        this.nodo_creados++
        //Corroboramos si la insercion es en la raiz y si la raiz no tiene ninguna carpeta
        if(lista_carpeta[1] === "" && this.raiz.primero === null){
            this.raiz.primero = nuevoNodo
        }
        //Corroboramos si la insercion es en la raiz y pero la raiz ya tiene carpetas
        else if(lista_carpeta[1] === "" && this.raiz.primero !== null){
            this.raiz = this.insertarOrdenado(this.raiz, nuevoNodo)
        }
        //Corroboramos si la insercion es en algun directorio que no es la raiz
        else if(lista_carpeta[1] !== "" && this.raiz.primero !== null){
            let aux = this.raiz.primero
            let nivel = lista_carpeta.length
            let posicion = 1; 
            //Recorremos hasta llegar a la profundidad maxima donde se quiere insertar la nueva carpeta
            for(var i = 1; i < nivel; i++){
                if(aux !== null){
                    while(aux){
                        //Comparamos si las posiciones de la lista de carpetas es igual a la del nodo actual sino seguimos buscando
                        if(posicion < lista_carpeta.length && lista_carpeta[posicion] === aux.valor){ 
                            posicion++
                            //Esta comparacion es para asegurarnos que nos quedaremos en el nodo padre
                            if(aux.primero !== null && posicion < lista_carpeta.length){
                                aux = aux.primero
                            }
                            break;
                        }else{
                            aux = aux.siguiente
                        }
                    }
                }else{
                    break;
                }
            }
            //Si la carpeta padre ya tiene carpetas se agrega en el primero sino se manda a insertar en el orden correcto
            if(aux.primero === null){
                aux.primero = nuevoNodo
            }else{
                aux = this.insertarOrdenado(aux, nuevoNodo)
            }
        }
    }
    /**
     * 1 - Carpeta ya existe
     * 2 - la carpeta no existe
     * 3 - El directorio no es correcto o no es valido
     * 4 - Directorio no valido
     * 5 - No existe ninguna carpeta en la raiz
     * 
     */

    insertarValor(ruta, carpeta_nueva){
        let lista_carpeta = ruta.split('/')
        let existe_carpeta = this.BuscarCarpeta(carpeta_nueva, lista_carpeta)
        switch(existe_carpeta){
            case 1:
                alert("La carpeta ya existe")
                this.insertarHijos(carpeta_nueva, lista_carpeta)
                break;
            case 2:
                this.insertarHijos(carpeta_nueva, lista_carpeta)
                break;
            case 3:
                alert("La ruta actual no existe")
                break;
            case 4:
                alert("La ruta actual no es valida")
                break;
            case 5:
                this.insertarHijos(carpeta_nueva, lista_carpeta)
                break;
        }
    }

    grafica_arbol(){
        var cadena = "";
        if(!(this.raiz === null)){
            cadena = "digraph arbol{ ";
            cadena = cadena + this.retornarValoresArbol(this.raiz);
            cadena = cadena + "}";
        }else{
            cadena = "digraph G { arbol }";
        }
        return cadena;
    }

    /** le mando el parametro primero y solo recorre los siguientes*/
    retornarValoresArbol(raiz){
        var cadena = "node[shape=record] ";
        let nodo = 1;
        let nodo_padre = 0;
        cadena += "nodo" + nodo_padre + "[label=\"" + this.raiz.valor  + "\"] "
        cadena += this.valoresSiguietes(this.raiz.primero, nodo, nodo_padre)
        cadena += this.conexionRamas(this.raiz.primero, 0)
        return cadena;
    }


    valoresSiguietes(raiz, nodo, nodo_padre){
        let cadena = ""
        let aux = raiz
        let nodo_padre_aumento = nodo_padre
        if(aux !== null){
            while(aux){
                cadena += "nodo" + aux.id + "[label=\"" + aux.valor  + "\"] "
                aux = aux.siguiente
            }
            aux = raiz
            while(aux){
                nodo_padre_aumento++
                cadena += this.valoresSiguietes(aux.primero, this.nodo_creados, nodo_padre_aumento)
                aux = aux.siguiente
            }
        }
        return cadena
    }

    conexionRamas(raiz, padre){
        let cadena = ""
        let aux = raiz
        if(aux !== null){
            while(aux){
                cadena += "nodo" + padre + " -> nodo" + aux.id + " "
                aux = aux.siguiente
            }
            aux = raiz
            while(aux){
                cadena += this.conexionRamas(aux.primero, aux.id)
                aux = aux.siguiente
            }
        }
        return cadena
    }


    BuscarCarpetaV2(lista_carpeta){
        //Directorio Actual seria la Raiz
        if(lista_carpeta[1] === "" && this.raiz.primero !== null){
            return this.raiz
        }
        //Directorio Actual seria Raiz pero no contiene elementos
        else if (lista_carpeta[1] === "" && this.raiz.primero === null){
            return null
        }
        //Actual no es raiz pero tampoco hay elementos en raiz
        else if(lista_carpeta[1] !== "" && this.raiz.primero === null){
            return null
        }
        //Buscamos el directorio padre y revisar si en sus hijos existe la carpeta
        else if(lista_carpeta[1] !== "" && this.raiz.primero !== null){
            let aux = this.raiz.primero
            let nivel = lista_carpeta.length
            let posicion = 1; 
            for(var i = 1; i < nivel; i++){
                if(aux !== null){
                    while(aux){
                        if(posicion < lista_carpeta.length && lista_carpeta[posicion] === aux.valor){
                            posicion++
                            if(aux.primero !== null && posicion < lista_carpeta.length){
                                aux = aux.primero
                            }
                            break;
                        }else{
                            aux = aux.siguiente
                        }
                    }
                }else{
                    break;
                }
            }
            if(aux !== null){
                return aux
            }else{
                return null
            }

        }
    }

    mostrarCarpetasActuales(ruta){
        let lista_carpeta = ruta.split('/')
        let existe_carpeta = this.BuscarCarpetaV2(lista_carpeta)
        try{
            if(existe_carpeta !== null){
                let aux = existe_carpeta.primero
                while(aux){
                    console.log(aux.valor)
                    aux = aux.siguiente
                }
            }
        }catch(error){
            console.log("Hubo un error")
        }
    }
}

const arbolnario = new ArbolNArio()
function agregarVarios(){
    let ruta = document.getElementById("ruta").value
    let carpeta = document.getElementById("carpeta").value
    try{
        arbolnario.insertarValor(ruta,carpeta)
    }catch(error){
        alert("Hubo un error al insertar el nodo")
    }
    document.getElementById("carpeta").value = "";
    console.log(arbolnario)
    refrescarArbolN();  

}

function refrescarArbolN(){
    let url = 'https://quickchart.io/graphviz?graph=';
    let body = arbolnario.grafica_arbol();
    $("#image").attr("src", url + body);
    document.getElementById("carpeta").value = "";
}

function mostraCarpetas(){
    let ruta = document.getElementById("ruta").value
    arbolnario.mostrarCarpetasActuales(ruta)
}


/////////////////////////


function mostrarUsuario(){

}

///////////////////// FUNCIONES PARA MATRIZ DISPERSA


//SE CODIFICA EN BASE64
const inputElements = document.getElementById("input");
inputElements.addEventListener("change", onChange, false);
let nombreArchivo = ""
let base64String = ""
function onChange(event) {
    var reader = new FileReader();
    reader.onload = onReaderLoad;
    nombreArchivo = event.target.files[0].name
    reader.readAsDataURL(event.target.files[0]);
}

function onReaderLoad(event){
    base64String = event.target.result
}


class nodoMatriz{
    constructor(posX, posY, nombre_archivo){
        this.siguiente = null;
        this.anterior = null;
        this.abajo = null;
        this.arriba = null;
        this.posX = posX;
        this.posY = posY;
        this.posicion = nombre_archivo;
    }
}

class Matriz{
    constructor(){
        this.principal = new nodoMatriz(-1,-1,"Raiz")
        this.coordenadaY = 0;
        this.coordenadaX = 0;
    }

    buscarF(nombre_archivo){
        let aux = this.principal
        while(aux){
            /**if(aux.posY === y) */
            if(aux.posicion === nombre_archivo){
                return aux;
            }else{
                aux = aux.abajo;
            }
        }
        return null;
    }

    buscarC(carnet){
        let aux = this.principal;
        while(aux){
            /**if(aux.posX === x) */
            if(aux.posicion === carnet){
                return aux;
            }else{
                aux = aux.siguiente
            }
        }
        return null;
    }

    insertarColumna(posicion,texto){
        const nuevoNodo = new nodoMatriz(posicion,-1,texto);
        let piv = this.principal;
        let pivA = this.principal;
        while(piv.siguiente){
            if(nuevoNodo.posX > piv.posX){
                pivA = piv;
                piv = piv.siguiente
            }else{
                nuevoNodo.siguiente = piv;
                nuevoNodo.anterior = pivA;
                pivA.siguiente = nuevoNodo;
                piv.anterior = nuevoNodo;
                return;
            }
        }
        nuevoNodo.anterior = piv;
        piv.siguiente = nuevoNodo;
    }

    insertarFila(posicion,texto){
        const nuevoNodo = new nodoMatriz(-1,posicion,texto);
        let piv = this.principal;
        let pivA = this.principal;
        while(piv.abajo){
            if(nuevoNodo.posY > piv.posY){
                pivA = piv;
                piv = piv.abajo;
            }else{
                nuevoNodo.abajo = piv;
                nuevoNodo.arriba = pivA;
                pivA.abajo = nuevoNodo;
                piv.arriba = nuevoNodo;
                return;
            }
        }
        nuevoNodo.arriba = piv;
        piv.abajo = nuevoNodo;
    }
    
    insertarNodo(x,y,texto){
        const nuevoNodo = new nodoMatriz(x,y,texto);
        let tempX = this.principal;
        let tempY = this.principal;
        //Agregar en Columna
        while(tempX.siguiente){
            if(tempX.posX === nuevoNodo.posX){
                break;
            }
            tempX = tempX.siguiente;
        }
        while(true){
            if(tempX.posY === nuevoNodo.posY){
                break;
            }else if(tempX.abajo !== null && tempX.abajo.posY > nuevoNodo.posY){
                nuevoNodo.abajo = tempX.abajo;
                nuevoNodo.arriba = tempX;
                tempX.abajo = nuevoNodo;
                break;
            }else if(tempX.abajo === null){
                nuevoNodo.arriba = tempX
                nuevoNodo.abajo = tempX.abajo
                tempX.abajo = nuevoNodo;
                break;
            }else{
                tempX = tempX.abajo;
            }
        }
        //Agregar en Fila
        while(tempY.abajo){
            if(tempY.posY === nuevoNodo.posY){
                break;
            }
            tempY = tempY.abajo;
        }
        while(true){
            if(tempY.posX === nuevoNodo.posX){
                break;
            }else if(tempY.siguiente !== null && tempY.siguiente.posX > nuevoNodo.posX){
                nuevoNodo.siguiente = tempY.siguiente;
                nuevoNodo.anterior = tempY;
                tempY.siguiente = nuevoNodo;
            }else if(tempY.siguiente === null){
                nuevoNodo.anterior = tempY;
                nuevoNodo.siguiente = tempY.siguiente;
                tempY.siguiente = nuevoNodo;
            }else{
                tempY = tempY.siguiente;
            }
        }
    }

    insertarElemento(x,y){
        let texto = x + "," + y;
        let nuevaFila = this.buscarF(y);
        let nuevaColumna = this.buscarC(x);
        /** Fila y Columna no existen */
        if(nuevaFila === null && nuevaColumna === null){
            this.insertarColumna(x, "C"+x);
            this.insertarFila(y, "F"+y);
            this.insertarNodo(x,y,texto);
        }else if(nuevaFila === null && nuevaColumna !== null){ /* Fila no existe, Columna si existe */
            this.insertarFila(y,"F"+y);
            this.insertarNodo(x,y,texto);
        }else if(nuevaFila !== null && nuevaColumna === null){/* Fila si existe, Columna no existe */
            this.insertarColumna(x, "C"+x);
            this.insertarNodo(x,y,texto);
        }else if(nuevaFila !== null && nuevaColumna !== null){/* Fila si existe, Columna si existe */
            this.insertarNodo(x,y,texto);
        }else{
            console.log("Me dio Ansiedad :(");
        }
    }

    insertarArchivo(texto, numero){
        let nuevaFila = this.buscarF(texto)
        if(nuevaFila === null){
            this.insertarFila(this.coordenadaY,texto)
            this.coordenadaY++
        }else{
            let arr = nombreArchivo.split('.')
            let arch = arr[0]
            let pdf = arr[1]
            let copia_archivo = arch + "(copia" + (numero++) + ")" + "." + pdf
            this.insertarArchivo(copia_archivo, numero)
        }
    }

    colocarPermiso(archivo, carnet, permisos){
        /** NOTA: Paso Previo Buscar en AVL si existe el carnet*/
        let nuevaColumna = this.buscarC(carnet)
        let nuevaFila = this.buscarF(archivo)
        if(nuevaColumna === null){
            this.insertarColumna(this.coordenadaX, carnet)
            this.coordenadaX++
            nuevaColumna = this.buscarC(carnet)
        }
        if(nuevaColumna !== null && nuevaFila !== null){
            this.insertarNodo(nuevaColumna.posX, nuevaFila.posY, permisos)
        }
    }

    reporte(){
        let cadena = "";
        let aux1 = this.principal;
        let aux2 = this.principal;
        let aux3 = this.principal;
        if(aux1 !== null){
            cadena = "digraph MatrizCapa{ node[shape=box]  rankdir=UD;  {rank=min; ";
            /** Creacion de los nodos actuales */
            while(aux1){
                cadena += "nodo" + (aux1.posX+1) + (aux1.posY+1) + "[label=\"" + aux1.posicion + "\" ,rankdir=LR,group=" + (aux1.posX+1) + "]; ";
                aux1 = aux1.siguiente;
            }
            cadena += "}"
            while(aux2){
                aux1 = aux2;
                cadena += "{rank=same; ";
                while(aux1){
                    cadena += "nodo" + (aux1.posX+1) + (aux1.posY+1) + "[label=\"" + aux1.posicion + "\" ,group=" + (aux1.posX+1) + "]; ";
                    aux1 = aux1.siguiente;
                }
                cadena += "}";
                aux2 = aux2.abajo;
            }
            /** Conexiones entre los nodos de la matriz */
            aux2 = aux3;
            while(aux2){
                aux1 = aux2;
                while(aux1.siguiente){
                    cadena += "nodo" + (aux1.posX+1) + (aux1.posY+1) + " -> " + "nodo" + (aux1.siguiente.posX+1) + (aux1.siguiente.posY+1) + " [dir=both];"
                    aux1 = aux1.siguiente
                }
                aux2 = aux2.abajo;
            }
            aux2 = aux3;
            while(aux2){
                aux1 = aux2;
                while(aux1.abajo){
                    cadena += "nodo" + (aux1.posX+1) + (aux1.posY+1) + " -> " + "nodo" + (aux1.abajo.posX+1) + (aux1.abajo.posY+1) + " [dir=both];"
                    aux1 = aux1.abajo
                }
                aux2 = aux2.siguiente;
            }
            cadena +=  "}";
        }else{
            cadena = "No hay elementos en la matriz"
        }
        return cadena;
    }
}

const matriz = new Matriz()

function reporteMatriz(){
    let url = 'https://quickchart.io/graphviz?graph=';
    let body = matriz.reporte();
    $("#imagematriz").attr("src",url+body)
}

function cargarArchivo(){
    matriz.insertarArchivo(nombreArchivo,1)
    reporteMatriz();
}

function asignarPermisos(){
    let cadena = document.getElementById("permiso").value
    let arreglo = cadena.split('-')
    matriz.colocarPermiso(arreglo[0],arreglo[1],arreglo[2])
    reporteMatriz()
}