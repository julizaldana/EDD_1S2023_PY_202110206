package estructuras

import (
	"encoding/csv"
	"fmt"
	"io"
	"os"
	"strconv"
)

var cola_estudiantes = &ColaEstudiantes{}

func LeerArchivo(ruta string) {
	file, err := os.Open(ruta)
	if err != nil {
		fmt.Println("Error al abrir el archivo")
		return
	}
	defer file.Close()

	leer := csv.NewReader(file)
	leer.Comma = ','
	encabezado := true
	for {
		linea, err := leer.Read()
		if err == io.EOF {
			break
		}
		if err != nil {
			fmt.Println("No se pudo leer la linea")
			continue
		}
		if encabezado {
			encabezado = false
			continue
		}
		carne, err := strconv.Atoi(linea[0])
		fmt.Println("Nombre: ", linea[1], " Carnet: ", carne, "Password: ", linea[2])
		cola_estudiantes.Encolar(linea[1], carne, linea[2])
	}
}
