import express from 'express';
import SwaggerUiOptions  from 'swagger-ui-express';
import router from './router';
import db from './config/db';
import swaggerSpec from './config/swagger';

//Conexion a la base de datos. 
export async function connectDB() {
    try {
        await db.authenticate()
        db.sync()
        // console.log("Conexión exitosa a la base de datos")
    } catch (error) {
        console.log(error)
        console.log("Hubo un error de conexión en la base de datos.")
    }
}

connectDB()
//instancia de express
const server = express()

//lectura de datos de formularios
server.use(express.json())

server.use('/api/products', router)

//Docs 
server.use('/docs', SwaggerUiOptions.serve, SwaggerUiOptions.setup(swaggerSpec))

export default server