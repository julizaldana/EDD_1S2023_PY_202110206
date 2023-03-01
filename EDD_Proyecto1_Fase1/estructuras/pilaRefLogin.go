package estructuras

import (
	"fmt"
)

type Pilalog struct {
	Primero  *Nodopilalogin
	Longitud int
}

func (p *Pilalog) estaVacia() bool {
	if p.Longitud == 0 {
		return true
	} else {
		return false
	}
}

func (p *Pilalog) Pushlogin(Data string) {
	if p.estaVacia() {
		nuevoNodo := &Nodopilalogin{Data, nil}
		p.Primero = nuevoNodo
		p.Longitud++
	} else {
		nuevoNodo := &Nodopilalogin{Data, p.Primero}
		p.Primero = nuevoNodo
		p.Longitud++
	}
}

func (p *Pilalog) Pop() {
	if p.estaVacia() {
		fmt.Println("La pila no tiene elementos")
	} else {
		p.Primero = p.Primero.siguiente
		p.Longitud--
	}
}

func (p *Pilalog) Peek() {
	if p.estaVacia() {
		fmt.Println("La pila no tiene elementos")
	} else {
		fmt.Println(p.Primero.Data)
	}
}

func (p *Pilalog) Graficar() string {
	texto := ""
	texto += "[width=1.4 label=\""
	aux := p.Primero
	for i := 0; i < p.Longitud; i++ {
		texto = texto + "(" + aux.Data + ")" + "\n" + "---------------------" + "\n"
		aux = aux.siguiente
	}
	texto += "\"];"
	return texto
}
