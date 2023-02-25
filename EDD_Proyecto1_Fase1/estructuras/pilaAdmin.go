package estructuras

//Bitacora de pila para referenciar estudiantes aceptados y rechazados.
import (
	"fmt"
)

type Pila struct {
	Primero  *NodoPila
	Longitud int
}

func (p *Pila) estaVacia() bool {
	if p.Longitud == 0 {
		return true
	} else {
		return false
	}
}

func (p *Pila) Push(Hora string) {
	if p.estaVacia() {
		nuevoNodo := &NodoPila{Hora, nil}
		p.Primero = nuevoNodo
		p.Longitud++
	} else {
		nuevoNodo := &NodoPila{Hora, p.Primero}
		p.Primero = nuevoNodo
		p.Longitud++
	}
}

func (p *Pila) Pop() {
	if p.estaVacia() {
		fmt.Println("La pila se encuentra vacía")
	} else {
		p.Primero = p.Primero.Siguiente
		p.Longitud--
	}
}

func (p *Pila) MostrarPrimeroPila() {
	if p.estaVacia() {
		fmt.Println("La pila se encuentra vacía")
	} else {
		fmt.Println(p.Primero.Data)
	}
}
