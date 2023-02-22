package main

import (
	"EDD_Proyecto1_Fase1/EDD_Proyecto1_Fase1/estructuras"
	"fmt"
)

func main() {
	fmt.Println("Prueba impresion")
	cola_estudiantes := &estructuras.ColaEstudiantes{nil, 0}
	lista_estudiantes := &estructuras.ListaDoble{Inic}

	var (
		user  string
		passw string
	)
	opcion := 0
	salir := false

	for !salir {
		fmt.Println("*****************************")
		fmt.Println("---------EDD GoDrive---------")
		fmt.Println("1. Iniciar Sesion")
		fmt.Println("2. Salir del Sistema")
		fmt.Print("Elige una opcion: ")
		fmt.Println("*****************************")
		fmt.Scanln(&opcion)
		switch opcion {
		case 1:
			fmt.Println("------Inicio de Sesion------")
			fmt.Println("Ingresa tu Usuario: ")
			fmt.Scanln(&user)
			fmt.Println("Ingresa tu Password/Contraseña: ")
			fmt.Scanln(&passw)

			if user == "admin" || passw == "admin" {
				menu_dashboard(cola_estudiantes)
			}

		case 2:
			fmt.Println("Cerrando EDD GoDrive...")
			salir = true
		}
	}

}

func menu_dashboard(cola_estudiantes *estructuras.ColaEstudiantes) {
	opcion := 0
	salir := false

	var (
		name     string
		lastname string
		carnetid int
		password string
	)

	for !salir {
		fmt.Println("***************************************************")
		fmt.Println("------Dashboard Administrador----EDD GoDrive------")
		fmt.Println("1. Ver Estudiantes Pendientes")
		fmt.Println("2. Ver Estudiantes del Sistema")
		fmt.Println("3. Registrar Nuevo Estudiante")
		fmt.Println("4. Carga Masiva de Estudiantes")
		fmt.Println("5. Cerrar Sesión")
		switch opcion {
		case 1:
			fmt.Println("-----Estudiantes Pendientes---EDD GoDrive-----")
				menu_pendientes(cola_estudiantes)

		case 2:
			fmt.Println("-----Estudiantes Registrados En El Sistema---EDD GoDrive-----")

		case 3:
			fmt.Println("-----Registro de Estudiantes---EDD GoDrive-----")
			fmt.Println("Ingresar un Nombre: ")
			fmt.Scanln(&name)
			fmt.Println("Ingresar un Apellido: ")
			fmt.Scanln(&lastname)
			fmt.Println("Ingresar Carnet: ")
			fmt.Scanln(&carnetid)
			fmt.Println("Ingresar un Password/Contraseña: ")
			fmt.Scanln(&password)
			cola_estudiantes.Encolar(name + " " + lastname, carnetid, password)
		case 4:

		case 5:
			fmt.Println("Cerrando Dashboard Administrador...")
			salir = true

		}
	}
}


func menu_pendientes(cola_estudiantes *estructuras.ColaEstudiantes) {
	option := 0
	salir := false


for !salir {
	fmt.Println("Pendientes: ")
	cola_estudiantes.MostrarLongitud()
	fmt.Println("Estudiante Actual: ")
	cola_estudiantes.MostrarPrimero()
	fmt.Println("1. Aceptar al Estudiante")
	fmt.Println("2. Rechazar al Estudiante")
	fmt.Println("3. Volver al Menu")
	fmt.Println("Elige una opcion: ")
	fmt.Scanln(&option)
	switch option {
	
	case 1:
		cola_estudiantes.Desencolar()
		lista_estudiantes.
	case 2:
		cola_estudiantes.MostrarSiguiente()
	case 3:
		salir = true


	}
}	



}