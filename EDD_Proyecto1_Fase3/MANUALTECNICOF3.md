## Universidad de San Carlos de Guatemala
## Escuela de Ciencias y Sistemas, Facultad de Ingeniería
## Estructuras de Datos, 1er semestre 2023
-----
# PROYECTO1_FASE3 - LAB ESTRUCTURAS DE DATOS - SECCION C
# MANUAL TECNICO
-----
### Nombre: Julio Alejandro Zaldaña Ríos
### Carnet: 202110206
-----

**Resumen**

En el presente proyecto, correspondiente a la fase 3. Se da a conocer una solución para la elaboración de un sistema de almacenamiento de archivos. 
Este es llamado EDD GoDrive. En esta fase, se cumple con las funciones respectivas a un dashboard para un administrador, 
al igual que se cumple con algunas funciones de visualización de carpetas y archivos para cada usuario que este aceptado en el sistema de EDD GoDrive. 
Todo elaborado con el lenguaje de programación JavaScript y para la elaboración de la interfaz gráfica con HTML y CSS. 

**Explicación del funcionamiento del programa**

El programa consiste básicamente, en un aplicación web, lanzada con GitHub Pages, trabajada con HTML y para la elaboración de estructuras y la lógica del programa con JavaScript.
El programa funciona y consiste en la creación de carpetas, archivos, otorgar permisos de lectura a los archivos entre otras.

**Explicación Archivos**

Se trabajaron tres estructuras:

1. TablaHash: Para almacenamiento de usuarios 
2. Grafo: Para visualización de carpetas de usuarios
3. Bloques - Lista Doble Enlazada: Para poder manejar entre bloques el sistema de mensajería de EDD Go Drive.

El codigo esta Separado de la siguiente manera  
- __/tablahash.js__ Aqui se encuentra todo lo relacionado a la tabla hash de usuarios, donde se van almacenando, y se recorre para ingresar al login de los mismos usuarios.
- __/grafo.js__ Con este archivo, se visualizan las carpetas, ya que se recorre el arbolnario y se insertarn los valores al grafo.
- __/dashboardadminf3.html__ Aqui está el código HTML para la pagina o interfaz del administrador.
- __/blockchainblocks.js__  Aqui esta el codigo y las funciones relacionadas con los bloques relacionados al sistema de mensajería de EDD Go Drive.
- __/loginf3.html__ Aqui está el código HTML para la pagina o interfaz para que los usuarios puedan loguearse.
- __/mensajeria.html__ Aqui esta el codigo HTML y JS para poder visualizar el sistema de mensajería.
- __/userpagef3.html__ Aqui esta el codigo HTML para la interfaz de los usuarios, después de loguearse.

-----



**Metodos más importantes**


1. Función para cargar ARBOL AVL desde Local Storage a la tabla Hash:

![image](https://user-images.githubusercontent.com/98117383/236697107-dd7d0b83-4df2-4946-a910-310662273d6d.png)

2. Función para loguearse en el sistema con tabla hash:
![image](https://user-images.githubusercontent.com/98117383/236694427-4b8d776b-1e99-43f8-a049-eb773f7aab8b.png)

3. Función para insertar valores de arbol nario a grafo:
![image](https://user-images.githubusercontent.com/98117383/236694448-2259f110-ed70-47a9-97cc-8160f8dead59.png)

4. Funcion para colocar interfaz de mensajeria:
![image](https://user-images.githubusercontent.com/98117383/236694505-059f52a6-97fc-4dbd-9953-6a793b906640.png)

5. Función para visualizar bloques en el dashboard del administrador, y grafica con graphviz:

![image](https://user-images.githubusercontent.com/98117383/236694532-7e66921a-ec52-4bf6-95fb-c3292b30f553.png)

6. Función para convertir la lista doblemente enlazada (bloques) a un Array, para no tener referencias circulares al momento de guardarlo en Local Storage:

![image](https://user-images.githubusercontent.com/98117383/236697321-c21d63d2-0dc9-44ec-b744-6f7ff5c81057.png)

