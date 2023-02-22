package estructuras

//clase nodo para Cola de Estudiantes

type nodo struct {
	estudiante *Estudiante //objeto estudiante
	siguiente  *nodo
}
