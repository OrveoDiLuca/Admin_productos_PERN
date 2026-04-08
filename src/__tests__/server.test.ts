import request from 'supertest'
import server, {connectDB} from '../server'
import db from '../config/db'

describe('GET /api', () => {
    it('should send back a json response', async () => {
        const res = await request(server).get('/api') //Probando la conexión del endpoint.
        expect(res.status).toBe(200) //Probando que la conexion sea status okey
        expect(res.headers['content-type']).toMatch(/json/) //y que retorne un tipo json.
        expect(res.body.msg).toBe('Desde API')

        expect(res.status).not.toBe(404)
        expect(res.body.msg).not.toBe('desde api')
    })
})

//Probando la conexión de la base de datos. 
jest.mock('../config/db')

describe('Connect db', () => {
    it('Should handle database connection error', async () => {
        jest.spyOn(db,'authenticate').mockRejectedValueOnce(new Error('Hubo un error de conexión en la base de datos.')) //Se crea un espia, que va a esperar a que se ejecute el db.authenticate
        const consoleSpy = jest.spyOn(console,'log') //Este espia va a revisar el console.log que se va a ejecutar en el catch 
        await connectDB()
        expect(consoleSpy).toHaveBeenCalledWith(
            expect.stringContaining('Hubo un error de conexión en la base de datos.')
        )
    })
})