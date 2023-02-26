package estructuras

//clase nodo para Cola de Estudiantes

type nodo struct {
	Estudiante *Estudiante //objeto estudiante
	siguiente  *nodo
}
