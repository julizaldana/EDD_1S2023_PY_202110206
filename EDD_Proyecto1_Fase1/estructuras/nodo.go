package estructuras

//clase nodo para Lista Doblemente Enlazada

type Nodo struct {
	Estudiante *Estudiante //objeto estudiante
	siguiente  *Nodo
	anterior   *Nodo
}
