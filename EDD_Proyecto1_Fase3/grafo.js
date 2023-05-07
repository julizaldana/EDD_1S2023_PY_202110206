//CLASE CON FUNCIONES PARA CARPETAS-GRAFOS
class nodoMatrizAdyacencia{
    constructor(valor){
        this.siguiente = null
        this.abajo = null
        this.valor = valor
    }
}

class grafoDirigido{
    constructor(){
        this.principal = null
    }

    insertarF(texto){
        const nuevoNodo = new nodoMatrizAdyacencia(texto)
        if(this.principal === null){
            this.principal = nuevoNodo
        }else{
            let aux = this.principal
            while(aux.abajo){
                if(aux.valor === nuevoNodo.valor){
                    return
                }
                aux = aux.abajo
            }
            aux.abajo = nuevoNodo
        }
    }

    insertarC(padre, hijo){
        const nuevoNodo = new nodoMatrizAdyacencia(hijo)
        if(this.principal !== null && this.principal.valor === padre){
            let aux = this.principal
            while(aux.siguiente){
                aux = aux.siguiente
            }
            aux.siguiente = nuevoNodo
        }else{
            this.insertarF(padre)
            let aux = this.principal
            while(aux){
                if(aux.valor === padre){
                    break;
                }
                aux = aux.abajo
            }
            if(aux !== null){
                while(aux.siguiente){
                    aux = aux.siguiente
                }
                aux.siguiente = nuevoNodo
            }
        }
    }

    insertarValores(padre, hijos){
        let cadena = hijos.split(',')
        for(let i = 0; i < cadena.length; i++){
            this.insertarC(padre,cadena[i])
        }
    }

    //Reporte modificado para trabajar con carpetas
    grafica(){
        let cadena = "graph grafoDirigido{ rankdir=LR; node [shape=box]; \"/\"; node [shape = ellipse] ; layout=neato; "
        let auxPadre = this.principal
        let auxHijo = this.principal
        let peso = 0
        while(auxPadre){
            auxHijo = auxPadre.siguiente
            let profundidad = auxPadre.valor.split('/')
            let padre = ""
            if(profundidad.length == 2 && profundidad[1] == ""){ peso = 1}
            else if(profundidad.length == 2 && profundidad[1] != ""){ peso = 2 }
            else { peso = profundidad.length }
            if(auxPadre.valor != "/"){ padre = profundidad[profundidad.length-1] }
            else { padre = "/" }
            while(auxHijo){
                cadena += "\"" + padre + "\"" + " -- " + "\"" + auxHijo.valor + "\"" + " [label=\"" + peso + "\"] "
                auxHijo = auxHijo.siguiente
            }
            auxPadre = auxPadre.abajo
        }
        cadena += "}"
        return cadena
    }
}

const grafo =  new grafoDirigido()

function insertar(){
    let padre = document.getElementById("padre").value 
    let hijos = document.getElementById("hijos").value 
    grafo.insertarValores(padre,hijos)
    refrescarGrafo()
}

function refrescarGrafo(){
    let url = 'https://quickchart.io/graphviz?graph=';
    let body = grafo.grafica()
    $("#imagegrafo").attr("src", url + body);
    document.getElementById("padre").value = ""
    document.getElementById("hijos").value = ""
}



//VERIFICAR CARNET
async function verificarCarnetGrafo() {
    var carne = document.getElementById("carne").value;

    var hashtabla = localStorage.getItem('tablahashusers');
    const data = JSON.parse(hashtabla)
    console.log(hashtabla)

        for (let i = 0; i < data.length; i++) {
            const obj = data[i];
            if (obj) { 
                if (obj.carnet == carne) {
                    if (obj.arbolnario == '{}') {
                        alert("El usuario no tiene carpetas")
                    } else {
                        alert("Se muestran carpetas de: " + " " + obj.usuario  + " " ),
                        retornarSiguientes(obj.arbolnario.raiz.valor,obj.arbolnario.raiz.primero)
                        console.log(grafo)
                    }
                } 
            } 
        }
}


function retornarSiguientes(padre,raiz){
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



//MOSTRAR CARPETAS EN FORMA DE GRAFO
function narioToGrafo(){
    refrescarGrafo();
}