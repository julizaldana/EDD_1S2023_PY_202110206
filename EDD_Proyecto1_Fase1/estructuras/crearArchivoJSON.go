package estructuras

import (
	"fmt"
	"os"
)

func CrearArchivo() {
	//Se verifica que el archivo existe
	var _, err = os.Stat("alumnos.json")
	//Se crea el archivo si no existe
	if os.IsNotExist(err) {
		var file, err = os.Create("alumnos.json")
		if err != nil {
			return
		}
		defer file.Close()
	}
	fmt.Println("Archivo creado exitosamente", "alumnos.json")
}

func EscribirArchivo(contenido string) {
	var file, err = os.OpenFile("alumnos.json", os.O_RDWR, 0644)
	if err != nil {
		return
	}
	defer file.Close()
	// Se escribe algo de texto linea por linea
	_, err = file.WriteString(contenido)
	if err != nil {
		return
	}
	// Se salvan los cambios
	err = file.Sync()
	if err != nil {
		return
	}
	fmt.Println("Archivo actualizado existosamente.")
}
