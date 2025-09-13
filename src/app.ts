import fastify from "fastify"
import { validatorCompiler, serializerCompiler, type ZodTypeProvider, jsonSchemaTransform } from "fastify-type-provider-zod"
import { fastifySwagger } from '@fastify/swagger'
import { fastifySwaggerUi } from '@fastify/swagger-ui'

import { createCourseRoute } from "./routes/create-course.ts"
import { getCoursesRoute } from "./routes/get-courses.ts"
import { getCouseByIdRoute } from "./routes/get-course.ts"
import scalarAPIReference from "@scalar/fastify-api-reference"

const server = fastify({ logger: true }).withTypeProvider<ZodTypeProvider>()

if (process.env.NODE_ENV !== 'development') {
    server.register(fastifySwagger, {
        openapi: {
            info: {
                title: "Desafio Node.js",
                version: '1.0.0'
            }
        },
        transform: jsonSchemaTransform
    })

    server.register(scalarAPIReference, {
        routePrefix: '/docs'
    })
}

server.setValidatorCompiler(validatorCompiler)
server.setSerializerCompiler(serializerCompiler)

server.register(createCourseRoute)
server.register(getCoursesRoute)
server.register(getCouseByIdRoute)

export {server}