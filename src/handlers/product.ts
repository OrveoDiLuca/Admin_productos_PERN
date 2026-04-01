import { Response, Request } from "express"
import Product from "../models/Product.model"


export const getProducts = async (req: Request,res: Response) => {
    try {
        const products = await Product.findAll({
            order: [
                ['id','DESC']
            ],
            attributes: {exclude: ['createdAt','updatedAt']}
        })
        res.json({data: products})
    } catch (error) {
        console.log(error)
    }
}

//es asincrona porque permite parar la ejecucion del codigo mientras se espera la recuperacion de base de datos
export const createProduct = async (req: Request, res: Response) => { //Se esta creando un nuevo recurso.
    try {
        const product =  await Product.create(req.body) //Instancia el product y lo guarda en la base de datos directamente.
        res.json({data: product}) 
    } catch (error) {
        console.log(error)
    }
}