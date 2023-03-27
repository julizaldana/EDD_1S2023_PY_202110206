//ARBOL-AVL para usuarios aceptados en el sistema
//Se van ordenando conforme orden de carnet, de archivo JSON.

class nodoArbol {
    constructor(carnet){
        this.izquierdo = null;
        this.derecho = null;
        this.carnet = carnet; //carnet = carnet estudiante
        this.nombre = nombre; //nombre = nombre estudiante
        this.password = password; //password = contraseña estudiante
        this.carpetar = carpetar; //carpetar = carpeta raiz
        this.altura = 1;
        this.factor_equilibrio = 0;
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

//ROTACION A LA DERECHA
RotacionD(raiz){
    let raiz_izquierdo = raiz.izquierdo
    let hijo_derecho = raiz_izquierdo.derecho //Derecho de la misma raiz izquierda
    raiz_izquierdo.derecho = raiz
    raiz.izquierdo = hijo_derecho
    raiz.altura = 1 + Math.max(this.Altura(raiz.izquierdo),this.Altura(raiz.derecho))
    raiz_izquierdo.altura = 1 + Math.max(this.Altura(raiz_izquierdo.izquierdo),this.Altura(raiz_izquierdo.derecho))
    raiz.factor_equilibrio = this.Equilibrio(raiz)
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
        if (raiz.carnet === nodo.carnet){
            raiz.carnet = nodo.carnet
        }else if (raiz.carnet < nodo.carnet) {
            raiz.derecho = this.insertarValorHijo(nodo, raiz.derecho);
        }else{
            raiz.izquierdo = this.insertarValorHijo(nodo, raiz.izquierdo);
        }
    }
    raiz.altura = 1 + Math.max(this.Altura(raiz.izquierdo),this.Altura(raiz.derecho))
    let balanceo = this.Equilibrio(raiz) //(-2)
    raiz.factor_equilibrio = balanceo
    //Rotacion Simple a la Izquierda
    if(balanceo > 1 && nodo.carnet > raiz.derecho.carnet){
        return this.RotacionI(raiz)
    }
    //Rotacion Simple a la Derecha
    if(balanceo < -1 && nodo.carnet < raiz.izquierdo.carnet){
        return this.RotacionD(raiz)
    }
    //Rotacion Doble a la Izquierda
    if(balanceo > 1 && nodo.carnet < raiz.derecho.carnet){
        raiz.derecho = this.RotacionD(raiz.derecho)
        return this.RotacionI(raiz)
    }
    //Rotacion Doble a la Derecha
    if(balanceo < -1 && nodo.carnet > raiz.izquierdo.carnet){
        raiz.izquierdo = this.RotacionI(raiz.izquierdo)
        return this.RotacionD(raiz)
    }
    return raiz
}


insertaValor(carnet){
    const nuevoNodo = new nodoArbol(carnet);
    this.raiz = this.insertarValorHijo(nuevoNodo,this.raiz);
}


//FUNCIONES PARA GRAFICAR AVL GRAPHVIZ

grafica_arbol(){
    var cadena = "";
    if(!(this.raiz === null)){
        cadena = "digraph arbol{ ";
        cadena = cadena + this.retornarValoresArbol(this.raiz, 0);
        cadena = cadena + "}";
    }else{
        cadena = "No hay usuarios en el arbol";
    }
    return cadena;
}

retornarValoresArbol(raiz, id){
    var cadena = "";
    var numero = id + 1;
    if(!(raiz === null)){
        cadena += "\"";
        cadena += raiz.carnet;
        cadena += "\" ;";
        if(!(raiz.izquierdo === null) && !(raiz.derecho === null)){
            cadena += " x" + numero + " [label=\"\",width=.1,style=invis];"
            cadena += "\"";
            cadena += raiz.carnet;
            cadena += "\" -> ";
            cadena += this.retornarValoresArbol(raiz.izquierdo, numero)
            cadena += "\"";
            cadena += raiz.carnet;
            cadena += "\" -> ";
            cadena += this.retornarValoresArbol(raiz.derecho, numero)
            cadena += "{rank=same" + "\"" + raiz.izquierdo.carnet + "\"" + " -> " + "\"" + raiz.derecho.carnet + "\""  + " [style=invis]}; "
        }else if(!(raiz.izquierdo === null) && (raiz.derecho === null)){
            cadena += " x" + numero + " [label=\"\",width=.1,style=invis];"
            cadena += "\"";
            cadena += raiz.carnet;
            cadena += "\" -> ";
            cadena += this.retornarValoresArbol(raiz.izquierdo, numero)
            cadena += "\"";
            cadena += raiz.carnet;
            cadena += "\" -> ";
            cadena += "x" + numero + "[style=invis]";
            cadena += "{rank=same" + "\"" + raiz.izquierdo.carnet + "\"" + " -> " + "x" + numero + " [style=invis]}; "
        }else if((raiz.izquierdo === null) && !(raiz.derecho === null)){
            cadena += " x" + numero + " [label=\"\",width=.1,style=invis];"
            cadena += "\"";
            cadena += raiz.carnet;
            cadena += "\" -> ";
            cadena += "x" + numero + "[style=invis]";
            cadena += "; \"";
            cadena += raiz.carnet;
            cadena += "\" -> ";
            cadena += this.retornarValoresArbol(raiz.derecho, numero)
            cadena += "{rank=same" + " x" + numero + " -> \"" + raiz.derecho.carnet + "\"" +  " [style=invis]}; "
        }
    }
    return cadena;
}

eliminarTodo(){
    this.raiz = null;
}



}



const binaryTreeAVL = new ArbolAVL();

function refrescarArbol(){
    let url = 'https://quickchart.io/graphviz?graph=';
    let body = arbolBinarioAVL.grafica_arbol();
    $("#image").attr("src", url + body);
    document.getElementById("carnet").value = "";
}

//Para poder cargar archivo JSON.

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
        binaryTreeAVL.insertaValor(obj.alumnos[i].carnet)
    }
    refrescarArbol();
}