import {exit} from 'node:process'
import db from '../config/db'

//Codigo que va a limpiar nuestra base de datos cada vez que se termine de ejecutar las pruebas
const clearDB = async () => {
    try {
        await db.sync({force: true}) //eliminar los datos de la base de datos.
        exit(0)
    } catch (error) {
        console.log(error)
        exit(1)
    }
}

if(process.argv[2] === '--clear'){
    clearDB()
}