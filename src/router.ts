import { Router } from "express"

const router = Router()
//Routing 
router.get('/',(req,res) => {
    res.json("Desde GET")
})

router.post('/',(req,res) => { //Se esta creando un nuevo recurso.
    res.json("Desde POST")
})

router.put('/',(req,res) => { //Reemplaza un recurso completo. 
    res.json("Desde PUT")
})

router.patch('/',(req,res) => { //Actualiza de manera parcial
    res.json("Desde PATCH")
})

router.delete('/',(req,res) => {
    res.json("Desde DELETE")
})

export default router