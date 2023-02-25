package estructuras

import (
	"fmt"
)

type Pila struct {
	Primero  *Nodop
	Longitud int
}

func (p *Pila) estaVacia() bool {
	if p.Longitud == 0 {
		return true
	} else {
		return false
	}
}

func (p *Pila) Push(Data string) {
	if p.estaVacia() {
		nuevoNodo := &Nodop{Data, nil}
		p.Primero = nuevoNodo
		p.Longitud++
	} else {
		nuevoNodo := &Nodop{Data, p.Primero}
		p.Primero = nuevoNodo
		p.Longitud++
	}
}

func (p *Pila) Pop() {
	if p.estaVacia() {
		fmt.Println("La pila no tiene elementos")
	} else {
		p.Primero = p.Primero.Siguiente
		p.Longitud--
	}
}

func (p *Pila) Peek() {
	if p.estaVacia() {
		fmt.Println("La pila no tiene elementos")
	} else {
		fmt.Println(p.Primero.Data)
	}
}

func (p *Pila) Graficar() {
	nombre_archivo := "./pilabitacora.dot"
	nombre_imagen := "pilabitacora.jpg"
	texto := "digraph pila{\n"
	texto += "rankdir=LR;\n"
	texto += "node[shape = record]"
	aux := p.Primero
	texto += "nodo0 [label=\""
	for i := 0; i < p.Longitud; i++ {
		texto = texto + "|(" + aux.Data + ")"
		aux = aux.Siguiente
	}
	texto += "\"]; \n}"
	crearArchivo(nombre_archivo)
	escribirArchivoDot(texto, nombre_archivo)
	ejecutar(nombre_imagen, nombre_archivo)
}
