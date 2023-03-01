package estructuras

import (
	"fmt"
	"strconv"
)

type ListaDoble struct {
	Inicio   *Nodo
	Final    *Nodo
	Longitud int
}

func (l *ListaDoble) estaVacia() bool {
	if l.Longitud == 0 {
		return true
	} else {
		return false
	}
}

func (l *ListaDoble) AgregarEstudiante(nuevoEstudiante *Estudiante) {
	if l.estaVacia() {
		nuevoNodo := &Nodo{Estudiante: nuevoEstudiante, siguiente: nil, anterior: nil, pilal: &Pilalog{Primero: nil, Longitud: 0}} //se agrega  un nuevo nodo, un nuevo estudiante al inicio, si está vacia la lista
		l.Inicio = nuevoNodo
		l.Final = nuevoNodo
		l.Longitud++
	} else {
		nuevoNodo := &Nodo{Estudiante: nuevoEstudiante, siguiente: nil, anterior: nil, pilal: &Pilalog{Primero: nil, Longitud: 0}}
		tmp := l.Inicio                                     //Se comienza a recorrer la lista doble enlazada desde el inicio.
		if nuevoEstudiante.carnet < tmp.Estudiante.carnet { //Si el carnet que se desea agregar, es menor al carnet que está en el inicio. Se agrega de primero.
			nodoAuxiliar := l.Inicio
			l.Inicio = nuevoNodo
			l.Inicio.siguiente = nodoAuxiliar
			l.Longitud++
		} else {
			for tmp.siguiente != nil {
				if nuevoEstudiante.carnet > tmp.Estudiante.carnet && nuevoEstudiante.carnet < tmp.siguiente.Estudiante.carnet { //Si el carnet que se desea agregar es mayor al nodo acutal, y menor que el siguiente, entonces, se agrega en una posición/nodo en medio.
					nodoSiguiente := tmp.siguiente
					tmp.siguiente = nuevoNodo
					nuevoNodo.siguiente = nodoSiguiente
					l.Longitud++
					return
				} else if nuevoEstudiante.carnet < tmp.Estudiante.carnet { //Si el carnet que se desea agregar es menor al nodo actual que se analiza, se reemplaza por el nuevo nodo
					nodoAuxiliar := tmp
					tmp = nuevoNodo
					nuevoNodo.siguiente = nodoAuxiliar
					l.Longitud++
					return
				} else { //si no se cumplen con las dos condiciones anteriores, simplemente se evalua el nodo siguiente, y se va iterando
					tmp = tmp.siguiente
				}
			}
			tmp.siguiente = nuevoNodo //Si el carnet que se ingresa, es mas grande que todos, se inserta hasta el final.
			l.Longitud++
		}
	}
}

func (l *ListaDoble) GetEstudiante(carnet int, contra string) {
	aux := l.Inicio
	for aux != nil {
		if aux.Estudiante.carnet == carnet && aux.Estudiante.contraseña == contra {
			fmt.Println("Estudiante encontrado " + aux.Estudiante.nombre)
			aux = aux.siguiente
		} else {
			fmt.Println("El usuario/contraseña no coinciden con algun estudiante en el sistema")
		}
	}

}

func (l *ListaDoble) ImprimirListaDoble() {
	aux := l.Inicio
	for aux != nil {
		fmt.Println("Nombre:" + aux.Estudiante.nombre + " , " + "Carnet:" + strconv.Itoa(aux.Estudiante.carnet) + " , " + "Actividad: " + valoresPila(aux.pilal))
		fmt.Println("---------------------------------------------------------------")
		aux = aux.siguiente
	}
}

func NewLista() *ListaDoble {
	lista := new(ListaDoble)
	lista.Inicio = nil
	lista.Longitud = 0
	return lista
}

func (l *ListaDoble) AgregarPila(carnet string, contrasena string, info string) {
	if l.Longitud == 0 {
		fmt.Println("No hay estudiantes registrados en el sistema")
	} else {
		aux := l.Inicio
		for aux != nil {
			if carnet == strconv.Itoa(aux.Estudiante.carnet) && contrasena == aux.Estudiante.contraseña {
				aux.pilal.Pushlogin(info)
				return
			}
			aux = aux.siguiente
		}
		fmt.Println("No se encontro al estudiante")
	}
}

func valoresPila(pilal *Pilalog) string {
	contenido := ""
	aux := pilal.Primero
	if aux != nil {
		for aux != nil {
			contenido += aux.Data
			contenido += "|"
			aux = aux.siguiente
		}
	} else {
		contenido = "| |"
	}
	return contenido
}

func (l *ListaDoble) Graficar() {
	nombre_archivo := "./listaestudiantes.dot"
	nombre_imagen := "listaestudiantes.jpg"
	texto := "digraph lisstaestudiantes{\n"
	texto += "node[shape = box];\n"
	texto += "edge[dir = \"both\" minlen = 3] \n"
	texto += "{rank=same;"
	texto += "nodonil1[width=1 label = \"nil\" ] \n" //Se definen los nodos nil, de la lista doblemente enlazada
	texto += "nodonil2[width=1 label = \"nil\" ] \n"
	aux := l.Inicio
	for i := 0; i < l.Longitud; i++ {
		texto += "nodo" + strconv.Itoa(i) + "[width=1.4 label=\"" + strconv.Itoa(aux.Estudiante.carnet) + "\\n" + aux.Estudiante.nombre + "\"];\n" //Se irá iterando desde un nodo 0, hasta el ultimo nodo de la lista
		aux = aux.siguiente
	}
	for i := 0; i < l.Longitud-1; i++ {
		if i == 0 {
			texto += "nodonil1" + "-> nodo" + strconv.Itoa(i) + "\n" //Se apunta el primer nodo nil, al primer elemento de la lista doble enlazada
		}
		texto += "nodo" + strconv.Itoa(i) + " -> nodo" + strconv.Itoa(i+1) + "\n"
		if (i + 1) == l.Longitud-1 {
			texto += "nodo" + strconv.Itoa(i+1) + "-> nodonil2" + "\n" //Se apunta el segundo nodo nil, al ultimo elemento de la lista doble enlazada
		}
	}
	texto += "}\n"
	aux = l.Inicio
	for i := 0; i < l.Longitud; i++ {
		if !aux.pilal.estaVacia() {
			texto += "nodoP" + strconv.Itoa(i) + aux.pilal.Graficar()
			texto += "nodo" + strconv.Itoa(i) + "->" + "nodoP" + strconv.Itoa(i) + "\n"
		}
		aux = aux.siguiente
	}
	texto += "}\n"
	crearArchivo(nombre_archivo)
	escribirArchivoDot(texto, nombre_archivo)
	ejecutar(nombre_imagen, nombre_archivo)
}
