//Estructura para una Lista Circular Simple
//Para visualizar la creacion de archivos, carpetas, con fecha y hora

class Nodo {
    constructor(data){
        this.data = data;
        this.siguiente = null;
    }
}


class ListaCircular {
    constructor(data) {
        this.inicio = null;
        this.final = null;
        this.longitud = 0;

        if (data) {
            this.iniciarlista(data);
        }
    }


//Funcion para inicializar la lista circular
    iniciarlista(data){
        //se crea el nodo
        const newNode = new Nodo(data);
        //Se crea una referencia circular
        newNode.siguiente = newNode;
        //Ahora, el inicio y el final apuntan al nuevonodo
        this.inicio = newNode;
        this.final = newNode;
        //Y se incrementa la longitud
        this.longitud++
    }




    insertarLista(data) {
        //Si la longitud de la lista es 0, se usa la funcion de iniciar lista
        if (this.longitud === 0) {
            return this.iniciarlista(data);
        } else {
            //Si ya existe algun nodo en la lista, se crea el un nuevo nodo
            const newNode = new Nodo(data);
            //Y se apunta el siguiente del nuevo nodo, al inicio de la lista
            newNode.siguiente = this.inicio;
            //Despues el siguiente del nodo final es igual al nuevo nodo
            this.final.siguiente = newNode;
            //El nuevo nodo se convierte en el final de la lista
            this.final = newNode;       
        }
        this.longitud++  
    }


    mostrarLista() {
        let aux = this.inicio;
        while (aux != 0) {
            console.log(aux.data);
            aux = aux.siguiente;
        }
    }
    
}

const list = new ListaCircular();
list.insertarLista("ARCHIVO 1")
list.insertarLista("ARCHIVO 2")
list.insertarLista("CARPETA 1")


function menu() {
    console.log("LISTA CIRCULAR")
    console.log("Se muestra ")

}

menu()