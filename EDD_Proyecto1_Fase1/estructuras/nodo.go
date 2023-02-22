package estructuras

//clase nodo para Lista Doblemente Enlazada

type Nodo struct {
	estudiante *Estudiante //objeto estudiante
	siguiente  *Nodo
	anterior   *Nodo
}
