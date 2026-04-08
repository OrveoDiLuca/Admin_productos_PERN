import request from 'supertest'
import server from '../server'

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