import swaggerJSDoc from "swagger-jsdoc"
import { SwaggerOptions } from "swagger-ui-express"
//en este archivo se va a colocar informacion de la api. Que hace, como se llama, etc. 

const options: swaggerJSDoc.Options = {
    swaggerDefinition: {
        openapi: '3.0.0', 
        tags: [
            {
                name: 'Products', 
                description: 'API operations related to products'
            }
        ], 
        info: {
            title: 'REST API Node.js / Express / TypeScript',
            version: "1.0.0",
            description: 'API Docs for products'
        }
    }, 
    apis: ['./src/router.ts']
}

const swaggerSpec = swaggerJSDoc(options)

export default swaggerSpec