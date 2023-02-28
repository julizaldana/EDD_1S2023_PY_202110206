package main

import (
	"EDD_Proyecto1_Fase1/EDD_Proyecto1_Fase1/estructuras"
	"fmt"
	"strconv"
	"time"
)

// ESTRUCTURAS GLOBALES
var cola_estudiantes = &estructuras.ColaEstudiantes{}
var lista_estudiantes = &estructuras.ListaDoble{}
var bitacora_pila_admin = &estructuras.Pila{}

func main() {
	cola_estudiantes = &estructuras.ColaEstudiantes{nil, 0}
	lista_estudiantes = &estructuras.ListaDoble{Inicio: nil, Final: nil, Longitud: 0}
	bitacora_pila_admin = &estructuras.Pila{nil, 0}
	var (
		user       string
		passw      string
		usuario    int
		contrasena string
	)
	opcion := 0
	salir := false
	usuarionew, err := strconv.Atoi(user)

	for !salir {
		fmt.Println("*****************************")
		fmt.Println("---------EDD GoDrive---------")
		fmt.Println("1. Iniciar Sesion")
		fmt.Println("2. Salir del Sistema")
		fmt.Println("Elige una opcion: ")
		fmt.Println("*****************************")
		fmt.Scanln(&opcion)
		switch opcion {
		case 1:
			fmt.Println("------Inicio de Sesion------")
			fmt.Print("Ingresa tu Usuario: ")
			fmt.Scanln(&user)
			fmt.Print("Ingresa tu Password/Contraseña: ")
			fmt.Scanln(&passw)
			if user == "admin" && passw == "admin" {
				menu_dashboard(cola_estudiantes)
			} else if usuarionew == usuario && passw == contrasena {
				if err != nil {
					fmt.Println("Error")
					return
				}
				lista_estudiantes.GetEstudiante(usuario, contrasena)
			} else {
				fmt.Println("El usuario no existe en el sistema EDD GoDrive")
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
		fmt.Println("5. Crear Archivo de Estudiantes del Sistema")
		fmt.Println("6. Ver Estado de Estudiantes en el Sistema")
		fmt.Println("7. Cerrar Sesión")
		fmt.Print("Elige una opcion: ")
		fmt.Scanln(&opcion)
		switch opcion {
		case 1:
			fmt.Println("-----Estudiantes Pendientes---EDD GoDrive-----")
			menu_pendientes(cola_estudiantes)

		case 2:
			fmt.Println("-----Estudiantes Registrados En El Sistema---EDD GoDrive-----")
			lista_estudiantes.ImprimirListaDoble()

		case 3:
			fmt.Println("-----Registro de Estudiantes---EDD GoDrive-----")
			fmt.Print("Ingresar un Nombre: ")
			fmt.Scanln(&name)
			fmt.Print("Ingresar un Apellido: ")
			fmt.Scanln(&lastname)
			fmt.Print("Ingresar Carnet: ")
			fmt.Scanln(&carnetid)
			fmt.Print("Ingresar un Password/Contraseña: ")
			fmt.Scanln(&password)
			cola_estudiantes.Encolar(name+" "+lastname, carnetid, password)
		case 4:
			var ruta string
			fmt.Println("Se lee archivo CSV")
			fmt.Scanln(&ruta)
			estructuras.LeerArchivo(ruta, cola_estudiantes)
			fmt.Println("")

		case 5:
			//Se crea el  archivo json
			contenido := estructuras.ArchivoJSON(lista_estudiantes)
			estructuras.CrearArchivo()
			estructuras.EscribirArchivo(contenido)

		case 6:
			lista_estudiantes.Graficar()

		case 7:
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
		fmt.Println("3. Reporte de Cola")
		fmt.Println("4. Reporte Bitácora para Administrador")
		fmt.Println("5. Volver al Menu")
		fmt.Print("Elige una opcion: ")
		fmt.Scanln(&option)
		switch option {
		case 1:
			lista_estudiantes.AgregarEstudiante(cola_estudiantes.Primero.Estudiante)
			cola_estudiantes.Desencolar()
			SubirAceptadoPila(bitacora_pila_admin)

		case 2:
			cola_estudiantes.EstudianteRechazado(cola_estudiantes.Primero.Estudiante)
			cola_estudiantes.Desencolar()
			SubirRechazadoPila(bitacora_pila_admin)

		case 3:
			cola_estudiantes.Graficar()

		case 4:
			bitacora_pila_admin.Graficar()

		case 5:
			salir = true

		}
	}

}

func Rechazarestudiante(nestudent *estructuras.Estudiante) {
	cola_estudiantes.Desencolar()

}

func SubirAceptadoPila(bitacora_pila_admin *estructuras.Pila) {
	bitacora_pila_admin.Push("Se aceptó a estudiante" + "\\n" + formato_fecha() + " " + formato_hora())
}

func SubirRechazadoPila(bitacora_pila_admin *estructuras.Pila) {
	bitacora_pila_admin.Push("Se rechazó a estudiante" + "\\n" + formato_fecha() + " " + formato_hora())
}

//FORMATO PARA IMPRESION DE HORAS

func formato_hora() string {
	tiempo := time.Now()
	texto_final := ""
	if tiempo.Hour() < 10 {
		texto_final = texto_final + "0" + strconv.Itoa(tiempo.Hour()) + ":"
	} else {
		texto_final = texto_final + strconv.Itoa(tiempo.Hour()) + ":"
	}
	if tiempo.Minute() < 10 {
		texto_final = texto_final + "0" + strconv.Itoa(tiempo.Minute()) + ":"
	} else {
		texto_final = texto_final + strconv.Itoa(tiempo.Minute()) + ":"
	}
	if tiempo.Second() < 10 {
		texto_final = texto_final + "0" + strconv.Itoa(tiempo.Second())
	} else {
		texto_final = texto_final + strconv.Itoa(tiempo.Second())
	}
	return texto_final
}

//FORMATO PARA IMPRESION DE FECHAS

func formato_fecha() string {
	tiempo := time.Now()
	texto_final := ""
	if tiempo.Day() < 10 {
		texto_final = texto_final + "0" + strconv.Itoa(tiempo.Day()) + "/"
	} else {
		texto_final = texto_final + strconv.Itoa(tiempo.Day()) + "/"
	}
	if tiempo.Month() < 10 {
		texto_final = texto_final + "0" + strconv.Itoa(int(tiempo.Month())) + "/"
	} else {
		texto_final = texto_final + strconv.Itoa(int(tiempo.Month())) + "/"
	}
	if tiempo.Year() < 10 {
		texto_final = texto_final + "0" + strconv.Itoa(tiempo.Year())
	} else {
		texto_final = texto_final + strconv.Itoa(tiempo.Year())
	}
	return texto_final
}
