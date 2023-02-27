package estructuras

import (
	"encoding/csv"
	"fmt"
	"io"
	"os"
	"strconv"
)

func LeerArchivo(ruta string, cola *ColaEstudiantes) {
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
		nombre := linea[1]
		password := linea[2]
		carne, err := strconv.Atoi(linea[0])
		cola.Encolar(nombre, carne, password)
		fmt.Println("Nombre: ", linea[1], " Carnet: ", carne, "Password: ", linea[2])
	}
}
