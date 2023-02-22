package estructuras

import (
	"fmt"
)

type ColaEstudiantes struct {
	Primero  *nodo
	Longitud int
}

func (ce *ColaEstudiantes) estaVacia() bool {
	if ce.Longitud == 0 {
		return true
	} else {
		return false
	}
}

func (ce *ColaEstudiantes) newNodoCola(estudiante *Estudiante) *nodo {
	return &nodo{estudiante, nil}

}

func (ce *ColaEstudiantes) Encolar(nombre string, carnet int, contraseña string) {
	newStudent := &Estudiante{nombre, carnet, contraseña}
	if ce.estaVacia() {
		nuevoNodo := ce.newNodoCola(newStudent)
		ce.Primero = nuevoNodo
		ce.Longitud++
	} else {
		nuevoNodo := ce.newNodoCola(newStudent)
		aux := ce.Primero
		for aux.siguiente != nil {
			aux = aux.siguiente
		}
		aux.siguiente = nuevoNodo
		ce.Longitud++
	}

}

func (ce *ColaEstudiantes) Desencolar() {
	if ce.estaVacia() {
		fmt.Println("No hay estudiantes en la cola de espera")
	} else {
		ce.Primero = ce.Primero.siguiente
		ce.Longitud--
	}
}

func (ce *ColaEstudiantes) MostrarPrimero() {
	fmt.Println(ce.Primero.estudiante)
}

func (ce *ColaEstudiantes) MostrarLongitud() {
	fmt.Println(ce.Longitud)
}

func (ce *ColaEstudiantes) MostrarSiguiente() {
	fmt.Println(ce.Primero.siguiente.estudiante)
}
