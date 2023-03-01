## Universidad de San Carlos de Guatemala
## Escuela de Ciencias y Sistemas, Facultad de Ingeniería
## Estructuras de Datos, 1er semestre 2023
-----
# PROYECTO1_FASE1 - LAB ESTRUCTURAS DE DATOS - SECCION C
-----
### Nombre: Julio Alejandro Zaldaña Ríos
### Carnet: 202110206
-----

** Resumen **

En el presente proyecto, correspondiente a la fase 1. Se da a conocer una solución para la elaboración de un sistema de almacenamiento de archivos. Este es llamado EDD GoDrive. En esta fase, se cumple con las funciones básicas respectivas a un administrador, donde se podra manejar la creación de estudiantes dentro del sistema, creación de reportes con Graphviz, y la utilización y el manejo primordial de estructuras de datos, como son las colas, pilas y listas dobles enlazadas; respetando los principios de FIFO, LIFO etc. Todo elaborado con el lenguaje de programación Go/Golang.   

** Explicación del funcionamiento del programa **

Como se mencionó anteriormente, el sistema de EDD GoDrive, trabaja con funciones basicas de un administrador que podrá ingresar al sistema, ingresando como ***"admin"*** en los espacios de usuario y password en un pequeño inicio de sesión, al desplegar la aplicación.

Al ingresar tendrá un menú variado. 

** Dashboard Administrador **

1. __Ver Estudiantes Pendientes:__ Consiste en otro menú, donde se visualiza los estudiantes en la cola de espera para ser aceptados/rechazados. 
2. __Ver Estudiantes del Sistema:__ Se visualizan los estudiantes aceptados y registrados en el sistema, ordenados por su numero de carnet de menor a mayor. 
3. __Registrar Nuevo Estudiante:__ Se entra a un formulario, que pide el nombre, apellido, carnet y una contraseña para crear un estudiante, que se dirige a la cola de espera.
4. __Carga Masiva de Estudiante:__ Se puede cargar un archivo con terminación ***.csv*** donde se cargarán los datos directos a la cola de espera.
5. __Crear Archivo de Estudiantes del Sistema:__ Se crea el archivo ***alumnos.json** con la lista de estudiantes registrados en el sistema de EDD GoDrive
6. __Ver Estado de Estudiantes en el Sistema:__ Se visualiza en una gráfica de Graphviz, la lista doblemente enlazada, donde se localizan los estudiantes registrados en el sistema. De igual manera, vinculados con pilas si es que inician sesión, donde se guarda la fecha y la hora en que inician sesión.
7. __Cerrar sesión:__ Se cierra la sesión del administrador

Si se ingresa al menú de estudiantes pendientes (1):
Se muestra la cantidad de estudiantes pendientes por atender.

** Estudiantes Pendientes **

1. __Aceptar al estudiante:__ Se acepta al primer estudiante de cola_estudiantes (cola de espera) y se registra en la lista_estudiantes (lista doblemente enlazada)
2. __Rechazar al estudiante:__ Se rechaza al primer estudiante de cola_estudiantes (cola de espera), se sale de la cola y vuelve a entrar a la cola de espera.
3. __Reporte de Cola:__ Se reporta la gráfica en Graphviz, de la cola_estudiantes.
4. __Reporte de Bitácora para Administrador:__ Se reporta la gráfica en Graphviz, de la bitacora_pila_admin; donde se muestra la fecha y la hora en la que el administrador va aceptando o rechazando estudiantes.
5. __Volver al Menu:__ Se sale de este menu, y regresa al dashboard.


***Nota***
Los estudiantes ya registrados en el sistema, podrán iniciar sesión, y se almacenará la fecha y la hora en la que estos inician sesión. (Se puede visualizar en el reporte de la lista doblemente enlazada, opcion 6 del dashboard del administrador)

-----

** Explicación Archivos y Métodos Más importantes **

Se trabajaron cuatro estructuras:

1. Cola
2. Lista Doblemente Enlazada
3. Pila: Bitácora para acciones de administrador
4. Pila: Pila de información de inicio de sesión vinculado a cada estudiante 

El codigo esta Separado de la siguiente manera  
- __estructuras/ColaEstudiantes.go__ Aqui se encuentra todo lo relacionado a la cola_estudiantes (cola de espera), utilizacion de nodos, y funciones, etc.  
- __estructuras/ListaDoble.go__ Aqui se encuentra todo lo relacionado a la lista doblemente enlazada, la utilizacion de nodos, y sus funciones, etc.  
- __estructuras/pilaAdmin.go__ Aqui se encuentra todo lo relacionado a la pila de bitácora para el administrador, que muestra todas las acciones que realice con la cola de espera. 
- __estructuras/pilaRefLogin.go__  Aqui se encuentra todo lo relacionado a la pila que se vincula a un estudiante registrado en la lista doble enlazada, donde cargara la fecha y hora cuando inicie sesión.
- __estructuras/estudiante.go__ Se compone la estructura del objeto nodo de estudiante, con sus atributos primordiales: nombre, carnet y contraseña.
- __estructuras/nodo.go__ Se compone la estructura del nodo de la lista doblemente enlazada, y también se compone de la estructura del nodo de la pila de referencia a inicios de sesión.
- __estructuras/nodocola.go__ Se compone la estructura del nodo de la cola de estudiantes.
- __estructuras/nodoPilaAdmin.go__ Se compone de la estructura del nodo de la pila de bitacora para el administrador. 
- __estructuras/Reportes.go__ En este archivo, se encuentran las funciones mas importantes para la creación y escritura del archivo dot y la ejecucion de Graphviz, para la visualización de las estructuras creadas.
- __estructuras/crearArchivoJSON.go__ En este archivo se encuentran las funciones primordiales para crear el archivo JSON; alumnos.json con la lista de estudiantes registrados.
- __clase/lecturaCSV.go__ Es este archivo se encuentra las funciones que se necesitan para la lectura, captura de datos de un archivo CSV, adicional a eso creacion de un ejemplo de archivo con extension JSON.     

-----

** Ejemplo de Reportes **







-----

** Conclusiones **

1. Se considera importante el manejo de estructuras de datos, con sus respectivas funciones, nodos. Ya que facilita mejor el manejo de elementos, que una lista nativa del lenguaje Go/Golang.
2. Es necesario saber los principios de funcionamiento de pilas y colas, para saber concretar el funcionamiento de las mismas estructuras.
3. La utilización de una librería como Graphviz, es útil ya que facilita mucho la visualización de las estructuras que se crean.