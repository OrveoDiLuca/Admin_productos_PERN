import { Response, Request, NextFunction } from "express"
import { validationResult } from "express-validator"


//Middleware que verifica si algun campo es faltante en la api. 
export const handleInputErrors = (req: Request,res: Response,next: NextFunction) => {
    let errors = validationResult(req)
    if (!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }
    next()
}

