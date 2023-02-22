package estructuras

import "fmt"

type ListaDoble struct {
	inicio   *Nodo
	final    *Nodo
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
		nuevoNodo := l.newNodo(nuevoEstudiante) //se agrega  un nuevo nodo, un nuevo estudiante al inicio, si está vacia la lista
		l.inicio = nuevoNodo
		l.final = nuevoNodo
		l.longitud++
	} else {
		nuevoNodo := l.newNodo((nuevoEstudiante))
		if l.final.anterior == nil {
			nuevoNodo.anterior = l.inicio
			l.inicio.siguiente = nuevoNodo
			l.final = nuevoNodo
		} else {
			l.final.siguiente = nuevoNodo
			nuevoNodo.anterior = l.final
			l.final = nuevoNodo
		}
		l.longitud++
	}

}

func (l *ListaDoble) ImprimirListaDoble() {
	aux := l.inicio
	for aux != nil {
		fmt.Printf("Nombre: %s, Carnet %d", aux.estudiante.nombre, aux.estudiante.carnet)
		aux = aux.siguiente
	}
}

func NewLista() *ListaDoble {
	lista := new(ListaDoble)
	lista.inicio = nil
	lista.longitud = 0
	return lista
}
