import { Router } from "express"
import {body,param} from "express-validator"
import { createProduct, deleteProduct, getProductById, getProducts, updateAvailable, updateProduct } from "./handlers/product"
import { handleInputErrors } from "./middleware"

const router = Router()

/**
 * @swagger
 * components:
 *  schemas:
 *      Product:
 *          type: object
 *          properties:
 *              id:
 *                  type: integer
 *                  description: The product ID
 *                  example: 1
 *              name:
 *                  type: string
 *                  description: The product name
 *                  example: "Monitor curvo de 50 pulgadas"
 *              price:
 *                  type: number
 *                  description: The product price
 *                  example: "300 $"
 *              available:
 *                  type: boolean
 *                  description: The product available
 *                  example: true
 */

/**
 * @swagger
 * /api/products: 
 *      get: 
 *          summary: Get a list of products from the database.
 *          tags:
 *              - Products
 *          description: Return a list of products.
 *          responses:
 *              200:
 *                  description: Succesful response.
 *                  content:
 *                      application/json: 
 *                          schema:
 *                              type: array
 *                              items:
 *                                  $ref: '#/components/schemas/Product'
 * 
 */
router.get('/', getProducts)//obtiene todos los productos que se encuentran en la base de datos. 


/**
 * @swagger
 * /api/products/{id}:
 *      get:
 *          summary: Get a product by id from the database. 
 *          tags: 
 *              - Products
 *          description: Return a product based on its unique ID
 *          parameters:
 *            - in: path
 *              name: id
 *              description: The id of the product to retrieve
 *              required: true
 *              schema:
 *                  type: integer
 *          responses:
 *              200:
 *                  description: Succesful response.
 *                  content:
 *                      application/json: 
 *                          schema:
 *                              type: array
 *                              items:
 *                                  $ref: '#/components/schemas/Product'
 *              404:
 *                  description: Not found
 *              400:
 *                  description: Bad request invalid ID.
 */
//Obteniendo un producto por su id
router.get('/:id', 
    param('id').isInt().withMessage('El id debe ser un numero entero'),
    handleInputErrors,
    getProductById
) //Aca lo que se hace es inyectar el id mediante el routing dinamico de express. 

/**
 * @swagger
 * /api/products:
 *      post:
 *          summary: Create a new products 
 *          tags:
 *              - Products
 *          description: Returns a new record in the database.
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              name:
 *                                  type: string
 *                                  example: "Monitor curvo de 50 pulgadas"
 *                              price:
 *                                  type: number
 *                                  example: 399
 *          responses:
 *              201:
 *                  description: Product created succesfully
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *                              items:
 *                                  $ref: '#/components/schemas/Product'
 *              400:
 *                  description: Bad Request - invalid input data
 */
router.post('/',
    body('name')
        .notEmpty().withMessage('El nombre del producto no puede ir vacio'),

    body('price')
        .isNumeric().withMessage('El precio del producto debe ser numerico')
        .notEmpty().withMessage('El precio del producto no puede ir vacio')
        .custom(value => value > 0).withMessage('El precio del producto debe ser mayor a 0'),
    handleInputErrors,
    createProduct
)

/**
 * @swagger
 * /api/products/{id}:
 *      put:
 *          summary: Updates a product with user input
 *          tags:
 *              - Products
 *          description: Returns the updated product
 *          parameters: 
 *            - in: path
 *              name: id
 *              description: The id of the product to retrieve
 *              required: true
 *              schema:
 *                  type: integer               
 * 
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              name:
 *                                  type: string
 *                                  example: "Monitor curvo de 50 pulgadas"
 *                              price:
 *                                  type: number
 *                                  example: 399
 *                              available:
 *                                  type: boolean
 *                                  example: true
 *          responses: 
 *              200:
 *                  description: Succesful response
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *                              items:
 *                                  $ref: '#/components/schemas/Product'           
 *              400:
 *                  description: Bad request invalid ID
 *              404:
 *                  description: Product not found       
 * 
 */
router.put('/:id',
    param('id').isInt().withMessage('El id debe ser un numero entero'),

    body('name')
        .notEmpty().withMessage('El nombre del producto no puede ir vacio'),

    body('price')
        .isNumeric().withMessage('El precio del producto debe ser numerico')
        .notEmpty().withMessage('El precio del producto no puede ir vacio')
        .custom(value => value > 0).withMessage('El precio del producto debe ser mayor a 0'),

    body('available')
        .isBoolean().withMessage('La disponibilidad debe ser de tipo true o false'),
    handleInputErrors,
    updateProduct
)  //Reemplaza un recurso completo.

/**
 * @swagger
 * /api/products/{id}:
 *      patch:
 *          summary: Updates Product available
 *          tags:
 *              - Products
 *          description: Returns the updated available
 *          parameters: 
 *            - in: path
 *              name: id
 *              description: The id of the product to retrieve
 *              required: true
 *              schema:
 *                  type: integer
 *          responses:
 *              200:
 *                  description: Succesful response
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *                              items:
 *                                  $ref: '#/components/schemas/Product'           
 *              400:
 *                  description: Bad request invalid ID or invalid input data
 *              404:
 *                  description: Product not found
 */
router.patch('/:id',
    param('id').isInt().withMessage('El id debe ser un numero entero'),
    handleInputErrors,
    updateAvailable
) //Actualiza de manera parcial

/**
 * @swagger
 * /api/products/{id}:
 *      delete:
 *          summary: Delete products.
 *          tags:
 *              - Products
 *          description: Delete the products available. 
 *          parameters: 
 *            - in: path
 *              name: id
 *              description: The id of the product to retrieve
 *              required: true
 *              schema:
 *                  type: integer
 *          responses:
 *              200:
 *                  description: Succesful response
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: string
 *                              value: 'Product deleted successfully'
 *              400:
 *                  description: Bad request invalid ID or invalid input data
 *              404:
 *                  description: Product not found
 */
router.delete('/:id',
    param('id').isInt().withMessage('El id debe ser un numero entero'),
    handleInputErrors, 
    deleteProduct
)

export default router