import request from "supertest"
import server from "../../server"


//Estamos realizando las pruebas con el post
describe('POST /api/products', () => {

    it('should display validation errors', async () => {
        const res = await request(server).post('/api/products').send({})
        expect(res.status).toBe(400)
        expect(res.body).toHaveProperty('errors')
        expect(res.body.errors).toHaveLength(4)

        expect(res.status).not.toBe(404)
        expect(res.body.errors).not.toHaveLength(2)
    })

    it('should validate is the price is greater than 0', async () => {
        const res = await request(server).post('/api/products').send({
            name: "Iphone 4s", 
            price: 0
        })
        expect(res.status).toBe(400)
        expect(res.body).toHaveProperty('errors')
        expect(res.body.errors).toHaveLength(1)

        expect(res.status).not.toBe(404)
        expect(res.body.errors).not.toHaveLength(2)
    })

    it('should validate is the price is an integer', async () => {
        const res = await request(server).post('/api/products').send({
            name: "Iphone 4s", 
            price: "Hola"
        })
        expect(res.status).toBe(400)
        expect(res.body).toHaveProperty('errors')
        expect(res.body.errors).toHaveLength(2)

        expect(res.status).not.toBe(404)
        expect(res.body.errors).not.toHaveLength(4)
    })

    it('should create a new product', async () => {
        const res = await request(server).post('/api/products').send({
            name: "Mac-mini - Testing", 
            price: 900
        })
        expect(res.status).toBe(201)
        expect(res.body).toHaveProperty('data')

        expect(res.status).not.toBe(400)
        expect(res.status).not.toBe(404)
        expect(res.status).not.toBe(200)
        expect(res.body).not.toHaveProperty('errors')
    })
})

describe('GET /api/products', () => {

    it('should check if api/products url exist', async () => {
        const res = await request(server).get('/api/products')
        expect(res.status).not.toBe(404)
    })
    it('GET a JSON response with products', async () => {
        const res = await request(server).get('/api/products')
        expect(res.status).toBe(200)
        expect(res.header['content-type']).toMatch(/json/)
        expect(res.body).toHaveProperty('data')
        expect(res.body.data).toHaveLength(1)

        expect(res.body).not.toHaveProperty('errors')
    })
})

describe('GET /api/products/:id', () => {
    it('Should return a 404 response for a non-existent product', async () => {
        const product_id = 1000
        const res = await request(server).get(`/api/products/${product_id}`)
        expect(res.status).toBe(404)
        expect(res.body).toHaveProperty('error')
        expect(res.body.error).toBe('No se encontró el producto deseado')

    })
    it('Should check a valid id in the url', async () => {
        const res = await request(server).get('/api/products/not-valid-url')
        expect(res.status).toBe(400)
        expect(res.body).toHaveProperty('errors')
        expect(res.body.errors).toHaveLength(1)
        expect(res.body.errors[0].msg).toBe('El id debe ser un numero entero')
    })

    it('get a JSON response with a single product', async () => {
        const res = await request(server).get('/api/products/1')
        expect(res.status).toBe(200)
        expect(res.body).toHaveProperty('data')
    })
})

describe('PUT /api/products/:id', () => {

    it('Should check a valid id in the url', async () => {
        const res = await request(server).put('/api/products/not-valid-url').send({
            name: "Iphone 7s",
            available: true,
            price: 300
        })
        expect(res.status).toBe(400)
        expect(res.body).toHaveProperty('errors')
        expect(res.body.errors).toHaveLength(1)
        expect(res.body.errors[0].msg).toBe('El id debe ser un numero entero')
    })

    it('Should display validation error messages when updating a product', async () => {
        const res = await request(server).put('/api/products/1').send({})
        expect(res.status).toBe(400)
        expect(res.body).toHaveProperty('errors')
        expect(res.body.errors).toBeTruthy()
        expect(res.body.errors).toHaveLength(5)

        expect(res.status).not.toBe(200)
        expect(res.body).not.toHaveProperty('data')
    })

    it('Should validate that price is greater than 0', async () => {
        const res = await request(server).put('/api/products/1').send({
            name: "Iphone 7s",
            available: true,
            price: 0
        })
        expect(res.status).toBe(400)
        expect(res.body).toHaveProperty('errors')
        expect(res.body.errors).toBeTruthy()
        expect(res.body.errors).toHaveLength(1)
        expect(res.body.errors[0].msg).toBe('El precio del producto debe ser mayor a 0')

        expect(res.status).not.toBe(200)
        expect(res.body).not.toHaveProperty('data')
    })

    it('Should return a 404 response for a non-existent product', async () => {
        const product_id = 2000
        const res = await request(server).put(`/api/products/${product_id}`).send({
            name: "Iphone 7s",
            available: true,
            price: 150
        })
        expect(res.status).toBe(404)
        expect(res.body.error).toBe('No se encontró el producto deseado')

        expect(res.status).not.toBe(200)
        expect(res.body).not.toHaveProperty('data')
    })

    it('Should update an existing product with valid data', async () => {
        const res = await request(server).put('/api/products/1').send({
            name: "Mac-mini - Testing", 
            price: 900, 
            available: true
        })
        expect(res.status).toBe(200)
        expect(res.body).toHaveProperty('data')

        expect(res.status).not.toBe(400)
        expect(res.body).not.toHaveProperty('errors')
    })

})

describe('PATCH /api/products/:id', () => {
    it('Should return 404 for a non-existing product', async () => {
        const product_id = 2000
        const res = await request(server).patch(`/api/products/${product_id}`)
        expect(res.status).toBe(404)
        expect(res.body.error).toBe('No se encontró el producto deseado')

        expect(res.status).not.toBe(200)
        expect(res.body).not.toHaveProperty('data')
    })

    it('Should update aviability of a product', async () => {
        const res = await request(server).patch('/api/products/1')
        expect(res.status).toBe(200)
        expect(res.body).toHaveProperty('data')
        expect(res.body.data.available).toBe(false)

        expect(res.status).not.toBe(400)
        expect(res.status).not.toBe(404)
        expect(res.body).not.toHaveProperty('error')
    })
})

describe('DELETE /api/products/:id', () => {
    it('Should check a valid id', async () => {
        const res = await request(server).delete('/api/products/not-valid-url')
        expect(res.status).toBe(400)
        expect(res.body).toHaveProperty('errors')
        expect(res.body.errors).toHaveLength(1)
        expect(res.body.errors[0].msg).toBe('El id debe ser un numero entero')
    })

    it('Should return a 404 response for a non-existent product', async () =>{
        const product_id = 2000
        const res = await request(server).delete(`/api/products/${product_id}`)
        expect(res.status).toBe(404)
        expect(res.body.error).toBe('No se encontró el producto deseado')

        expect(res.status).not.toBe(200)
    })

    it('Should delete a product',async () => {
        const res = await request(server).delete('/api/products/1')
        expect(res.status).toBe(200)
        expect(res.body.data).toBe('Producto eliminado con exito')

        expect(res.status).not.toBe(400)
        expect(res.status).not.toBe(404)
    })
})