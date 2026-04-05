import { Router } from "express"
import {body,param} from "express-validator"
import { createProduct, getProductById, getProducts, updateProduct } from "./handlers/product"
import { handleInputErrors } from "./middleware"

const router = Router()
//Routing 
router.get('/', getProducts)//obtiene todos los productos que se encuentran en la base de datos. 

//Obteniendo un producto por su id
router.get('/:id', 
    param('id').isInt().withMessage('El id debe ser un numero entero'),
    handleInputErrors,
    getProductById
) //Aca lo que se hace es inyectar el id mediante el routing dinamico de express. 

router.post('/',
    //validacion
    body('name')
        .notEmpty().withMessage('El nombre del producto no puede ir vacio'),

    body('price')
        .isNumeric().withMessage('El precio del producto debe ser numerico')
        .notEmpty().withMessage('El precio del producto no puede ir vacio')
        .custom(value => value > 0).withMessage('El precio del producto debe ser mayor a 0'),
    handleInputErrors,
    createProduct
)

router.put('/:id',
    body('name')
        .notEmpty().withMessage('El nombre del producto no puede ir vacio'),
    body('price')
        .isNumeric().withMessage('El precio del producto debe ser numerico')
        .notEmpty().withMessage('El precio del producto no puede ir vacio'),
    body('available')
        .isBoolean().withMessage('La disponibilidad debe ser de tipo true o false'),
    handleInputErrors,
    updateProduct
)  //Reemplaza un recurso completo.

router.patch('/',(req,res) => { 
    res.json("Desde PATCH")
}) //Actualiza de manera parcial

router.delete('/',(req,res) => {
    res.json("Desde DELETE")
})

export default router