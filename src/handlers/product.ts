import { Response, Request } from "express"
import {check,validationResult} from "express-validator"
import Product from "../models/Product.model"


//es asincrona porque permite parar la ejecucion del codigo mientras se espera la recuperacion de base de datos
export const createProduct = async (req: Request, res: Response) => { //Se esta creando un nuevo recurso.

    //validacion
    await check('name').notEmpty().withMessage('El nombre del producto no puede ir vacio').run(req)

    await check('price')
        .isNumeric().withMessage('El precio del producto debe ser numerico')
        .notEmpty().withMessage('El precio del producto no puede ir vacio')
        .custom(value => value > 0).withMessage('El precio del producto debe ser mayor a 0')
        .run(req)
    
    let errors = validationResult(req)
    if (!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }
    
    const product =  await Product.create(req.body) //Instancia el productp y lo guarda en la base de datos directamente.
    res.json({data: product})
}