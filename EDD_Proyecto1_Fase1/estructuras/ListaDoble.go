package estructuras

import "fmt"

type ListaDoble struct {
	inicio   *Nodo
	longitud int
}

func (l *ListaDoble) estaVacia() bool {
	if l.longitud == 0 {
		return true
	} else {
		return false
	}
}

func (l *ListaDoble) newNodo(estudiante *Estudiante) *Nodo {
	return &Nodo{estudiante, nil, nil}

}

func (l *ListaDoble) InsertarAlFinal(nombre string, carnet int, contraseña string) {
	nuevoEstudiante := &Estudiante{nombre, carnet, contraseña} //atributos
	if l.estaVacia() {
		l.inicio = l.newNodo(nuevoEstudiante) //se agrega  un nuevo nodo, un nuevo estudiante al inicio, si esta vacia la lista
		l.longitud++
	} else {
		aux := l.inicio
		for aux.siguiente != nil {
			aux = aux.siguiente
		}
		aux.siguiente = l.newNodo(nuevoEstudiante)
		aux.siguiente.anterior = aux
		l.longitud++
	}

}

func (l *ListaDoble) ImprimirListaDoble() {
	aux := l.inicio
	for aux != nil {
		fmt.Print(aux.estudiante.carnet)
		fmt.Println("--->", aux.estudiante.nombre)
		aux = aux.siguiente
	}
}

func NewLista() *ListaDoble {
	lista := new(ListaDoble)
	lista.inicio = nil
	lista.longitud = 0
	return lista
}
