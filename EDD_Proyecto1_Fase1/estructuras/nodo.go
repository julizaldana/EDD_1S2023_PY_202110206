package estructuras

//clase nodo para Lista Doblemente Enlazada

type Nodo struct {
	Estudiante *Estudiante //objeto estudiante
	siguiente  *Nodo
	anterior   *Nodo
	pilal      *Pilalog
}

type Nodopilalogin struct {
	Data      string
	siguiente *Nodopilalogin
}
