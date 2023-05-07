//////////////////// FUNCIONES PARA ARBOL N-ARIO

class nodoArbolN{
    constructor(valor, id){
        this.siguiente = null;
        this.valor = valor; //valor -> carpeta raiz
        this.primero = null;
        this.id = id;
        this.matriz = new Matriz()
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
                let copia_carpeta = "Copia" + carpeta_nueva       
                this.insertarHijos(copia_carpeta, lista_carpeta)
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
        cadena += this.valoresSiguientes(this.raiz.primero, nodo, nodo_padre)
        cadena += this.conexionRamas(this.raiz.primero, 0)
        return cadena;  
    }


    valoresSiguientes(raiz, nodo, nodo_padre){
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
                cadena += this.valoresSiguientes(aux.primero, this.nodo_creados, nodo_padre_aumento)
                aux = aux.siguiente
            }
        }
        return cadena
    }

    getCarpeta(valor){
        let aux = this.raiz
        if(aux !== null){
            if(aux.valor == valor){
                return aux
            } 
            if(aux.primero.valor == valor) {
                return aux.primero
            }
            if (aux.siguiente.valor == valor) {
                return aux.siguiente
            }
            aux = aux.siguiente
        }
        return null
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



    getCarpetaV2(carpeta){
        //Directorio Actual seria la Raiz
        if(carpeta[1] === "" && this.raiz.primero !== null){
            return this.raiz
        }
        //Directorio Actual seria Raiz pero no contiene elementos
        else if (carpeta[1] === "" && this.raiz.primero === null){
            return null
        }
        //Actual no es raiz pero tampoco hay elementos en raiz
        else if(carpeta[1] !== "" && this.raiz.primero === null){
            return null
        }
        //Buscamos el directorio padre y revisar si en sus hijos existe la carpeta
        else if(carpeta[1] !== "" && this.raiz.primero !== null){
            let aux = this.raiz.primero
            let nivel = carpeta.length
            let posicion = 1; 
            for(var i = 1; i < nivel; i++){
                if(aux !== null){
                    while(aux){
                        if(posicion < carpeta.length && carpeta[posicion] === aux.valor){
                            posicion++
                            if(aux.primero !== null && posicion < carpeta.length){
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

    insertarCarpeta(carpeta){
        var carpet = carpeta.split('/')
        let existe_carpeta = this.BuscarCarpetaV2(carpet)
        if (existe_carpeta !== null) {
            existe_carpeta.matriz.insertarArchivo(nombreArchivo,1)
            list.insertarLista("Se creó el achivo: " + nombreArchivo + " Fecha:" + date + " Hora:" + time);
            reporteMatriz();
        } else {
            alert("No existe la carpeta")
        }
    }

    eliminarCarpeta(carpeta){
        var carpet = carpeta.split('/')
        let existe_carpeta = this.BuscarCarpetaV2(carpet)

        if(existe_carpeta !== null){  
            let aux = existe_carpeta.primero
            if(aux.valor == carpeta){
                existe_carpeta.primero = aux.siguiente;
            }
            else{
                while(aux){
                    if(aux.siguiente.valor == carpeta && aux.siguiente.siguiente === null){
                        aux.siguiente = null;
                        break;
                    }
                    else if(aux.siguiente.valor == carpeta){
                        aux.siguiente = aux.siguiente.siguiente;
                        break;
                    }
                    aux = aux.siguiente
                }
            }          
        }
  
    }
 
//Para poder insertar arbolnario a un grafo.
    grafos(){                      //posicion actual    //posicion de los primeros hijos
        this.retornarSiguientes(this.raiz.valor,this.raiz.primero)
    }

    retornarSiguientes(padre,raiz){
        let hijos = ''
        let carp_padre = padre
        let aux = raiz
        while(aux){
            hijos += aux.valor + ','
            aux = aux.siguiente
        }
        hijos = hijos.substr(0, hijos.length - 1);
        if(hijos !== ''){ //Guardar las que tengan carpetas.
            console.log("Padre: " + padre + "Hijos: " + hijos)
            grafo.insertarValores(padre,hijos)
        }
        aux = raiz
        while(aux){
            carp_padre = padre + aux.valor + "/"
            carp_padre = carp_padre.substr(0,carp_padre.length - 1);
            this.retornarSiguientes(carp_padre , aux.primero)
            aux = aux.siguiente
        }
    }





}





const arbolnario = new ArbolNArio()
function agregarVarios(){
    let ruta = document.getElementById("ruta").value
    let carpeta = document.getElementById("carpeta").value
    try{
        arbolnario.insertarValor(ruta,carpeta)
        list.insertarLista("Se creó la carpeta: " + carpeta + " Fecha:" + date +  " Hora:" + time)
        localStorage.setItem('listacircular',JSON.stringify(list))
        console.log(localStorage.getItem('listacircular'))
    }catch(error){
        alert("Hubo un error al insertar el nodo")
    }
    document.getElementById("carpeta").value = "";
    console.log(list)
    console.log(arbolnario)
    refrescarArbolN();  

}

function refrescarArbolN(){
    let url = 'https://quickchart.io/graphviz?graph=';
    let body = arbolnario.grafica_arbol();
    $("#image").attr("src", url + body);
    document.getElementById("carpeta").value = "";
}

//function mostraCarpetas(){
   // let ruta = document.getElementById("ruta").value
   // arbolnario.mostrarCarpetasActuales(ruta)
//}

function mostraCarpetas(){
    arbolnario.grafos()
}

function guardar(){
    localStorage.setItem('arbolnario',JSON.stringify(arbolnario))
    console.log(localStorage.getItem('arbolnario'))
}

function insertFolder(){
    let carpeta = document.getElementById("folder").value
    arbolnario.insertarCarpeta(carpeta)
    console.log(arbolnario)
}

function deleteFolder(){
    let carpeta = document.getElementById("folder").value
    arbolnario.eliminarCarpeta(carpeta)
    console.log(arbolnario)
}








/////////////////////////


/////////
