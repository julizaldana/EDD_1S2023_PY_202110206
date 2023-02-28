package estructuras

//clase nodo para Lista Doblemente Enlazada

type Nodo struct {
	Estudiante *Estudiante //objeto estudiante
	siguiente  *Nodo
	anterior   *Nodo
	pilalogin  *Nodopilalogin
}

type Nodopilalogin struct {
	Data      string
	siguiente *Nodopilalogin
}
