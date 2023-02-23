package estructuras

import "fmt"

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

func (l *ListaDoble) newNodo(estudiante *Estudiante) *Nodo {
	return &Nodo{estudiante, nil, nil}

}

func (l *ListaDoble) AgregarEstudiante(nombre string, carnet int, contraseña string) {
	nuevoEstudiante := &Estudiante{nombre, carnet, contraseña} //atributos
	if l.estaVacia() {
		nuevoNodo := l.newNodo(nuevoEstudiante) //se agrega  un nuevo nodo, un nuevo estudiante al inicio, si está vacia la lista
		l.Inicio = nuevoNodo
		l.Final = nuevoNodo
		l.Longitud++
	} else {
		nuevoNodo := l.newNodo((nuevoEstudiante))
		if l.Final.anterior == nil {
			nuevoNodo.anterior = l.Inicio
			l.Inicio.siguiente = nuevoNodo
			l.Final = nuevoNodo
		} else {
			l.Final.siguiente = nuevoNodo
			nuevoNodo.anterior = l.Final
			l.Final = nuevoNodo
		}
		l.Longitud++
	}

}

func (l *ListaDoble) ImprimirListaDoble() {
	aux := l.Inicio
	for aux != nil {
		fmt.Printf("Nombre: %s, Carnet %d", aux.estudiante.nombre, aux.estudiante.carnet)
		aux = aux.siguiente
	}
}

func NewLista() *ListaDoble {
	lista := new(ListaDoble)
	lista.Inicio = nil
	lista.Longitud = 0
	return lista
}
