## Universidad de San Carlos de Guatemala
## Escuela de Ciencias y Sistemas, Facultad de Ingeniería
## Estructuras de Datos, 1er semestre 2023
-----
# PROYECTO1_FASE1 - LAB ESTRUCTURAS DE DATOS - SECCION C
-----
### Nombre: Julio Alejandro Zaldaña Ríos
### Carnet: 202110206
-----

**Resumen**

En el presente proyecto, correspondiente a la fase 1. Se da a conocer una solución para la elaboración de un sistema de almacenamiento de archivos. Este es llamado EDD GoDrive. En esta fase, se cumple con las funciones básicas respectivas a un administrador, donde se podra manejar la creación de estudiantes dentro del sistema, creación de reportes con Graphviz, y la utilización y el manejo primordial de estructuras de datos, como son las colas, pilas y listas dobles enlazadas; respetando los principios de FIFO, LIFO etc. Todo elaborado con el lenguaje de programación Go/Golang.   

**Explicación del funcionamiento del programa**

Como se mencionó anteriormente, el sistema de EDD GoDrive, trabaja con funciones basicas de un administrador que podrá ingresar al sistema, ingresando como ***"admin"*** en los espacios de usuario y password en un pequeño inicio de sesión, al desplegar la aplicación.

![inicio](https://user-images.githubusercontent.com/98117383/222055486-f0c880a7-ef3d-4228-a5d7-e4d5da0e99e7.png)

Al ingresar tendrá un menú variado. 

**Dashboard Administrador**

![dashboard](https://user-images.githubusercontent.com/98117383/222055559-4ea16ac2-2026-43ad-bf23-582df081702a.png)


1. __Ver Estudiantes Pendientes:__ Consiste en otro menú, donde se visualiza los estudiantes en la cola de espera para ser aceptados/rechazados. 
2. __Ver Estudiantes del Sistema:__ Se visualizan los estudiantes aceptados y registrados en el sistema, ordenados por su numero de carnet de menor a mayor. 
3. __Registrar Nuevo Estudiante:__ Se entra a un formulario, que pide el nombre, apellido, carnet y una contraseña para crear un estudiante, que se dirige a la cola de espera.
4. __Carga Masiva de Estudiante:__ Se puede cargar un archivo con terminación ***.csv*** donde se cargarán los datos directos a la cola de espera.
5. __Crear Archivo de Estudiantes del Sistema:__ Se crea el archivo ***alumnos.json** con la lista de estudiantes registrados en el sistema de EDD GoDrive
6. __Ver Estado de Estudiantes en el Sistema:__ Se visualiza en una gráfica de Graphviz, la lista doblemente enlazada, donde se localizan los estudiantes registrados en el sistema. De igual manera, vinculados con pilas si es que inician sesión, donde se guarda la fecha y la hora en que inician sesión.
7. __Cerrar sesión:__ Se cierra la sesión del administrador

Si se ingresa al menú de estudiantes pendientes (1):
Se muestra la cantidad de estudiantes pendientes por atender.

**Estudiantes Pendientes**

![image](https://user-images.githubusercontent.com/98117383/222055630-6e328dc0-1a7a-4e80-a2d4-2d9ab35ae31f.png)


1. __Aceptar al estudiante:__ Se acepta al primer estudiante de cola_estudiantes (cola de espera) y se registra en la lista_estudiantes (lista doblemente enlazada)
2. __Rechazar al estudiante:__ Se rechaza al primer estudiante de cola_estudiantes (cola de espera), se sale de la cola y vuelve a entrar a la cola de espera.
3. __Reporte de Cola:__ Se reporta la gráfica en Graphviz, de la cola_estudiantes.
4. __Reporte de Bitácora para Administrador:__ Se reporta la gráfica en Graphviz, de la bitacora_pila_admin; donde se muestra la fecha y la hora en la que el administrador va aceptando o rechazando estudiantes.
5. __Volver al Menu:__ Se sale de este menu, y regresa al dashboard.


***Nota***
Los estudiantes ya registrados en el sistema, podrán iniciar sesión, y se almacenará la fecha y la hora en la que estos inician sesión. (Se puede visualizar en el reporte de la lista doblemente enlazada, opcion 6 del dashboard del administrador)

-----

**Explicación Archivos**

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

**Metodos más importantes**

__1. Función Encolar de Cola de Estudiantes: Que recibe tres parámetros:__
- El nombre que en el formulario se pedirá nombre y apellido en el cual se unen para formar el nombre del estudiante.
- El carnet, tipo entero
- La contraseña, tipo string

Se debe de notar, si está vacía la cola, se inserta el nodo como el primero. Sino está vacía, el primer nodo pasará al siguiente nodo, y el nuevo nodo se convertirá en el primero,

![encolar](https://user-images.githubusercontent.com/98117383/222052586-15c80b44-9b9a-4523-b63e-9d95efb87c46.png)

__2. Función Agregar Estudiante de Lista Doble Enlazada:__ 

Que como característica primordial es que esta función, insertará los nodos, siguiendo un orden de menor a mayor de los números de carnet de los estudiantes.

Si no hay ningun objeto en la lista, se agrega el nuevo como el primero. Ya si existen objetos existentes, solo se comienza a recorrer la lista desde el inicio, y entonces si el objeto estudiante que se desea agregar, tiene un carnet menor al que está en el inicio, se agrega de primero.

Luego hay otra condición que si el carnet del objeto estudiante, es mayor al nodo actual, y es menor al siguiente, entonces se agrega en medio de estos.

Y si no se cumplen estas dos condiciones anteriores se evaluan los nodos siguientes y se va iterando. Y si finalmente el carnet del nuevo nodo es mayor a todos los de la lista, se inserta hasta el final.

![agregarestudiante](https://user-images.githubusercontent.com/98117383/222053410-d8256f87-e199-426e-a502-769787790aaa.png)

__3. Creación de archivo JSON:__

Fundamental para poder crear el archivo alumnos.json para tener la lista de estudiantes registrados en el sistema.

![crearjson](https://user-images.githubusercontent.com/98117383/222054288-1482521f-fdc5-4585-9780-388d6c1a573c.png)

![json2](https://user-images.githubusercontent.com/98117383/222054294-840c8769-2f6e-40c9-bbd7-77f8ccf6ba12.png)

Salida de archivo:

![json1](https://user-images.githubusercontent.com/98117383/222056422-a98a2496-1ecf-40aa-a695-7aa4afd4cb72.png)


__4. Estructura para lectura de archivo CSV:__

Importante función para poder leer el archivo csv que se posea, para luego almacenar los atributos que se leen linea por linea, en el archivo separado por comas, en donde se agrega por parametros a la función Encolar de la Cola de Estudiantes.

![lecturacsv](https://user-images.githubusercontent.com/98117383/222054300-f6edae20-0874-413a-bba1-acb076f44a1d.png)

__5. Funciones para graficar estructuras con GRAPHVIZ:__

Estas son las estructuras para poder ir creando las gráficas, en esta imagen para poder crear una lista doblemente enlazada, que a cada nodo estudiante, se le enlazará una pila con la información de inicio de sesión.

![graficarlistadoble](https://user-images.githubusercontent.com/98117383/222054848-9afdd69f-a048-4c3c-894a-1ef02f2c28a4.png)

En esta imagen, se encuentra la estructura para graficar la cola de estudiantes. Siguiente el orden de una cola.

![graficarcolaestudiantes](https://user-images.githubusercontent.com/98117383/222054824-f2177c16-bc7b-4513-934a-0a64103233a3.png)

En esta imagen, se encuentra la estructura para graficar la pila de bitácora del administrador. Siguiendo el principio de orden de una pila.

![graficapila](https://user-images.githubusercontent.com/98117383/222054829-3f494797-c0cb-484b-8695-dd2f2a2a593c.png)

__6. Uso de formatos fecha y hora con librería time:__

![formatos](https://user-images.githubusercontent.com/98117383/222056758-6a7e16a3-65a9-493a-a18f-5025ba484c6d.png)

__7. Manejo de archivo main.go para manejar todo el programa__

![main](https://user-images.githubusercontent.com/98117383/222056929-d54dbcb5-ed4d-40b0-99ce-5c35397a6954.png)

-----

**Ejemplo de Reportes**

_1. Ejemplo de Cola de espera de estudiantes_ 

![Cola](https://user-images.githubusercontent.com/98117383/222055926-451575f7-ef55-4c64-80c0-de09c070f051.png)


_2. Ejemplo de Pila de bitácora de administrador_ 

![image](https://user-images.githubusercontent.com/98117383/222055990-5d93499d-4274-429d-8e49-2a53d5c54057.png)


_3. Ejemplo de Lista doble enlazada con pilas vinculadas a estudiantes_ 

![listadoble](https://user-images.githubusercontent.com/98117383/222056216-b71d4087-2eb0-4b45-b535-532d17909f52.png)


-----

**Conclusiones**

1. Se considera importante el manejo de estructuras de datos, con sus respectivas funciones, nodos. Ya que facilita mejor el manejo de elementos, que una lista nativa del lenguaje Go/Golang.
2. Es necesario saber los principios de funcionamiento de pilas y colas, para saber concretar el funcionamiento de las mismas estructuras.
3. La utilización de una librería como Graphviz, es útil ya que facilita mucho la visualización de las estructuras que se crean.
