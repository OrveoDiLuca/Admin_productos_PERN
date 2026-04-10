import server, {connectDB} from '../server'
import db from '../config/db'


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