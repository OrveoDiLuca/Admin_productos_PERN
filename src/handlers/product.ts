import { Response, Request } from "express"
import Product from "../models/Product.model"


export const getProducts = async (req: Request,res: Response) => {
    const products = await Product.findAll({
            order: [
                ['id','DESC']
            ],
            attributes: {exclude: ['createdAt','updatedAt']}
        })
    res.json({data: products})
}

export const getProductById = async(req: Request, res: Response) => {
    const { id } = req.params
        const product = await Product.findByPk(+id)
        if(!product){
            return res.status(404).json({error:"No se encontró el producto deseado"})
        }
    res.json({data : product})
}

//es asincrona porque permite parar la ejecucion del codigo mientras se espera la recuperacion de base de datos
export const createProduct = async (req: Request, res: Response) => { //Se esta creando un nuevo recurso.
    const product =  await Product.create(req.body) //Instancia el product y lo guarda en la base de datos directamente.
    res.status(201).json({data: product})
}

export const updateProduct = async (req: Request, res: Response) => {
    //Verificacion del id.
    const { id } = req.params
    const product = await Product.findByPk(+id)
    if(!product){
        return res.status(404).json({error:"No se encontró el producto deseado"})
    }

    //Actualizar
    await product.update(req.body)
    await product.save()

    res.json({data: product})
}

export const updateAvailable = async (req: Request, res: Response) => { 
    //Verificacion del id. 
    const { id } = req.params
    const product = await Product.findByPk(+id)
    if(!product){
        return res.status(404).json({error:"No se encontró el producto deseado"})
    }

    //Actualizar 
    product.available = !product.available
    await product.save()

    res.json({data: product})
} 

export const deleteProduct = async (req: Request, res: Response) => {
    const { id } = req.params
    const product = await Product.findByPk(+id)
    if(!product){
        return res.status(404).json({error:"No se encontró el producto deseado"})
    }

    await product.destroy()
    res.json({data: 'Producto eliminado con exito'})
}