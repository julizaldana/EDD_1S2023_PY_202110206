//CLASE CON FUNCIONES PARA BLOQUES/BLOCKCHAIN
// SE UTILIZA UNA LISTA DOBLEMENTE ENLAZADA.
class nodoBloque{
    constructor(index, fecha, emisor, receptor, mensaje, previousHash, hash){
        this.valor = {
            'index' : index,
            'timestamp': fecha,
            'transmitter': emisor,
            'receiver': receptor,
            'message': mensaje,
            'previoushash': previousHash,
            'hash': hash
        }
        this.siguiente = null
        this.anterior = null
    }
}

class Bloque{
    constructor(){
        this.inicio = null
        this.bloques_creados = 0
    }
    
    async insertarBloque(fecha, emisor, receptor, mensaje){
        if(this.inicio === null){
            let cadena = this.bloques_creados + fecha + emisor + receptor + mensaje
            let hash = await this.sha256(cadena)
            let mensajeEncriptado = await encriptacion(mensaje)
            const nuevoBloque = new nodoBloque(this.bloques_creados, fecha,emisor, receptor, mensajeEncriptado, '0000', hash)
            this.inicio = nuevoBloque
            this.bloques_creados++
        }else{
            let cadena = this.bloques_creados + fecha + emisor + receptor + mensaje
            let hash = await this.sha256(cadena)
            let mensajeEncriptado = await encriptacion(mensaje)
            let aux = this.inicio
            while(aux.siguiente){
                aux = aux.siguiente
            }
            const nuevoBloque = new nodoBloque(this.bloques_creados, fecha,emisor, receptor, mensajeEncriptado, aux.valor['hash'], hash)
            nuevoBloque.anterior = aux
            aux.siguiente = nuevoBloque
            this.bloques_creados++
        }
    }

    async sha256(mensaje){
        let cadenaFinal
        const enconder =  new TextEncoder();
        const mensajeCodificado = enconder.encode(mensaje)
        await crypto.subtle.digest("SHA-256", mensajeCodificado)
        .then(result => { // 100 -> 6a 
            const hashArray =  Array.from(new Uint8Array(result))
            const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
            cadenaFinal = hashHex
        })
        .catch(error => console.log(error))
        return cadenaFinal
    }



    //FUNCION PARA CONVERTIR CADA NODO DE LA LISTA DOBLEMENTE ENLAZADA PARA PASARLO EN UN ARRAY, PARA GUARDARLO EN LOCAL STORAGE Y ASÍ EVITAR LAS REFERENCIAS CIRCULARES.
    toArray() {
        const array = []
        let aux = this.inicio
        while(aux){
            const {index, timestamp, transmitter, receiver, message, previoushash, hash} = aux.valor
            array.push({index, timestamp, transmitter, receiver, message, previoushash, hash})
            aux = aux.siguiente
        }
        return array
        }
    
    //Se guarda en el local storage
    async saveToLocalStorage(key) {
        const array = this.toArray()
        await localStorage.setItem(key, JSON.stringify(array))
    }
    
    //Se extrae del local storage, y se va añadiendo los nuevos nodos que se vayan mandando y creando
    async loadFromLocalStorage(key) {
        const array = JSON.parse(await localStorage.getItem(key))
        if(array && array.length > 0){
            array.forEach(({index, timestamp, transmitter, receiver, message, previoushash, hash}) => {
            const nuevoBloque = new nodoBloque(index, timestamp, transmitter, receiver, message, previoushash, hash)
            if(!this.inicio){
                this.inicio = nuevoBloque
            }else{
                let aux = this.inicio
                while(aux.siguiente){
                    aux = aux.siguiente
                }
                nuevoBloque.anterior = aux
                aux.siguiente = nuevoBloque
            }
            this.bloques_creados++
            })
        }
    }
  
    
}

const bloque = new Bloque()
let bloque_actual

function fechaActual(){//librería date()
    let cadena = ''
    const fechaActual = new Date();
    cadena += fechaActual.getDate() < 10 ? ("0"+fechaActual.getDate()+"-") : (fechaActual.getDate()+"-")
    cadena += fechaActual.getMonth() < 10 ? ("0"+(fechaActual.getMonth()+1)+"-") : (fechaActual.getMonth()+"-")
    cadena += fechaActual.getFullYear() + "::"
    cadena += fechaActual.getHours() < 10 ? ("0"+fechaActual.getHours()+":") : (fechaActual.getHours()+":")
    cadena += fechaActual.getMinutes() < 10 ? ("0"+fechaActual.getMinutes()+":") : (fechaActual.getMinutes()+":")
    cadena += fechaActual.getSeconds() < 10 ? ("0"+fechaActual.getSeconds()) : (fechaActual.getSeconds())
    return cadena

}

const btnEnviar = document.getElementById("enviar")
btnEnviar.addEventListener("click", enviarMensaje)

function enviarMensaje(){
    let emisor_mensaje =  document.getElementById("emisor").value
    let receptor_mensaje = document.getElementById("receptor").value
    let mensaje_final = document.getElementById("mensaje").value //MENSAJE EN UN TEXT AREA
    bloque.insertarBloque(fechaActual(),emisor_mensaje,receptor_mensaje,mensaje_final)
    console.log(bloque);
    console.log("Mensaje Enviado");
}


//ESTA FUNCION GUARDA EN LOCAL STORAGE LO QUE SE TIENE EL BLOQUE
async function guardarenLocal(){
    await bloque.saveToLocalStorage('myBloque')
}

const bloque2 = new Bloque()

//ESTA FUNCION ACTUALIZA EL LOCAL STORAGE Y CONVIERTE LOS BLOQUES EN UN ARRAY, PARA LUEGO PODER REVESITARLOS DE MEJOR MANERA
async function guardarenLocal2(){
    await bloque2.loadFromLocalStorage('myBloque')
    console.log(bloque2.toArray())
}



/** REPORTES */

const btnReporte = document.getElementById("reporte")
btnReporte.addEventListener("click", reporte)

//PARA MOSTRAR BLOQUES BLOCKCHAIN
function reporte(){
    bloque_actual = bloque.inicio
    if(bloque_actual != null){
        let cadena = "Index: " + bloque_actual.valor['index']
        cadena += "\nTimeStamp: " + bloque_actual.valor['timestamp']
        cadena += "\nEmisor: " + bloque_actual.valor['transmitter']
        cadena += "\nReceptor: " + bloque_actual.valor['receiver']
        cadena += "\nMensaje: " + bloque_actual.valor['message']
        cadena += "\nPreviousHash: " + bloque_actual.valor['previoushash']
        cadena += "\nHash: " + bloque_actual.valor['hash']
        document.getElementById("reporte-bloques").value = cadena //TEXT AREA PARA ENVIAR INFORMACION DE BLOCKCHAIN
        mostrar_Mensaje_descriptado()
    }
}

const btnReporte1 = document.getElementById("siguiente-bloque")
btnReporte1.addEventListener("click", reporte_siguente)

function reporte_siguente(){
    if(bloque_actual.siguiente != null){
        bloque_actual = bloque_actual.siguiente
        let cadena = "Index: " + bloque_actual.valor['index']
        cadena += "\nTimeStamp: " + bloque_actual.valor['timestamp']
        cadena += "\nEmisor: " + bloque_actual.valor['transmitter']
        cadena += "\nReceptor: " + bloque_actual.valor['receiver']
        cadena += "\nMensaje: " + bloque_actual.valor['message']
        cadena += "\nPreviousHash: " + bloque_actual.valor['previoushash']
        cadena += "\nHash: " + bloque_actual.valor['hash']
        document.getElementById("reporte-bloques").value = cadena //TEXT AREA PARA ENVIAR INFORMACION DE BLOCKCHAIN
        mostrar_Mensaje_descriptado()
    }
}

const btnReporte2 = document.getElementById("anterior-bloque")
btnReporte2.addEventListener("click", reporte_anterior)

function reporte_anterior(){
    if(bloque_actual.anterior != null){
        bloque_actual = bloque_actual.anterior
        let cadena = "Index: " + bloque_actual.valor['index']
        cadena += "\nTimeStamp: " + bloque_actual.valor['timestamp']
        cadena += "\nEmisor: " + bloque_actual.valor['transmitter']
        cadena += "\nReceptor: " + bloque_actual.valor['receiver']
        cadena += "\nMensaje: " + bloque_actual.valor['message']
        cadena += "\nPreviousHash: " + bloque_actual.valor['previoushash']
        cadena += "\nHash: " + bloque_actual.valor['hash']
        document.getElementById("reporte-bloques").value = cadena
        mostrar_Mensaje_descriptado()
    }
}

async function mostrar_Mensaje_descriptado(){ 
    /** if carnet ==  bloque_actual.valor['receiver'] y  bloque_actual.valor['trasmitter'] == emisor
     * mostrar mensaje
     * bloque_actual = abloque_actual.siguiente
     */
    let cadena =  await desencriptacion(bloque_actual.valor['message'])
    document.getElementById("reporte-mensajes").value = cadena //TEXT AREA - MENSAJES DESENCRIPTADOS
}








/**
 * Una funcion que lea todo los bloques y simplemente muestre el mensaje
 * al usuario final
 * bloque_actual.valor['receiver'] == 201700918
 * mensaje de  bloque_actual.valor['trasmitter']
 *  ( mensaje_descriptado(carnet, emisor) )
 * 201700918
 * 
 */



























// FUNCIONES DE ENCRIPTACIÓN
const clave = 'clave-secreta'
const buffer = new ArrayBuffer(16)
const view = new Uint8Array(buffer)
for(let i = 0; i < clave.length; i++){
    view[i] = clave.charCodeAt(i)
}

const iv = crypto.getRandomValues(new Uint8Array(16))
const algoritmo = {name: 'AES-GCM', iv: iv}

async function encriptacion(mensaje){
    const enconder = new TextEncoder()
    const data = enconder.encode(mensaje)

    const claveCrypto = await crypto.subtle.importKey('raw', view, 'AES-GCM', true, ['encrypt'])

    const mensajeCifrado = await crypto.subtle.encrypt(algoritmo, claveCrypto, data)

    const cifradoBase64 = btoa(String.fromCharCode.apply(null, new Uint8Array(mensajeCifrado)))
    
    return cifradoBase64;
}

async function desencriptacion(mensaje){
    const mensajeCifrado = new Uint8Array(atob(mensaje).split('').map(char => char.charCodeAt(0)))

    const claveCrypto = await crypto.subtle.importKey('raw', view, 'AES-GCM', true, ['decrypt'])

    const mensajeDescifrado = await crypto.subtle.decrypt(algoritmo, claveCrypto, mensajeCifrado)

    const decoder = new TextDecoder()
    const mensajeOriginal = decoder.decode(mensajeDescifrado)

    return mensajeOriginal
}


