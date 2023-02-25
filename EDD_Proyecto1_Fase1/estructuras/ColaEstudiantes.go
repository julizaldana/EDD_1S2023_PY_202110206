package estructuras

import (
	"fmt"
	"strconv"
)

var lista_estudiantes = &ListaDoble{}

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
		fmt.Println(ce.Primero.estudiante)
		lista_estudiantes.AgregarEstudiante(ce.Primero.estudiante.nombre, ce.Primero.estudiante.carnet, ce.Primero.estudiante.contraseña)
		fmt.Println("Se agrega correctamente " + ce.Primero.estudiante.nombre + strconv.Itoa(ce.Primero.estudiante.carnet) + ce.Primero.estudiante.contraseña)
		ce.Primero = ce.Primero.siguiente
		ce.Longitud--

	}
}

func (ce *ColaEstudiantes) EstudianteRechazado() {
	if ce.estaVacia() {
		fmt.Println("No hay estudiantes en la cola de espera")
	} else {
		aux := ce.Primero
		for aux.siguiente != nil {
			aux = aux.siguiente
		}
		aux.siguiente = ce.Primero
	}
}

func (ce *ColaEstudiantes) MostrarPrimero() {
	if ce.estaVacia() {
		fmt.Println("No hay estudiantes en la cola de espera")

	} else {
		fmt.Println(ce.Primero.estudiante.nombre)
	}
}

func (ce *ColaEstudiantes) MostrarLongitud() {
	fmt.Println(ce.Longitud)
}

func (ce *ColaEstudiantes) MostrarSiguiente() {
	fmt.Println(ce.Primero.siguiente.estudiante)
}

func (ce *ColaEstudiantes) Graficar() {
	if ce.estaVacia() {
		fmt.Println("No hay estudiantes en la cola de espera")
	} else {
		nombre_archivo := "./colaespera.dot"
		nombre_imagen := "colaespera.jpg"
		texto := "digraph cola{\n"
		texto += "rankdir=LR;\n"
		texto += "node[shape = record];\n"
		texto += "nodonull2[label=\"null\"];\n"
		aux := ce.Primero
		contador := 0
		for i := 0; i < ce.Longitud; i++ {
			texto = texto + "nodo" + strconv.Itoa(i) + "[label=\"{" + strconv.Itoa(aux.estudiante.carnet) + "\\n" + aux.estudiante.nombre + "|}\"];\n"
			aux = aux.siguiente
		}
		for i := 0; i < ce.Longitud-1; i++ {
			c := i + 1
			texto += "nodo" + strconv.Itoa(i) + "->nodo" + strconv.Itoa(c) + ";\n"
			contador = c
		}
		texto += "nodo" + strconv.Itoa(contador) + "->nodonull2;\n"
		texto += "}"
		crearArchivo(nombre_archivo)
		escribirArchivoDot(texto, nombre_archivo)
		ejecutar(nombre_imagen, nombre_archivo)
	}
}
