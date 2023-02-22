package estructuras

type Nodo struct {
	estudiante *Estudiante //objeto estudiante
	siguiente  *Nodo
	anterior   *Nodo
}
