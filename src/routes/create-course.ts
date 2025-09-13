import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { db } from "../database/client";
import { courses } from "../database/schema";
import z from "zod";


export const createCourseRoute: FastifyPluginAsyncZod = async (server) => {

    server.post('/courses', {
        schema: {
            tags: ['courses'],
            summary: "Create a course",
            description: "That route recives a title and create a new course on database",
            body: z.object({ title: z.string().min(5, "Título precisa ter ao menos 5 caracteres") }), response: {
                201: z.object({ courseId: z.uuid() })
            },
        },

    }, async (request, reply) => {

        const { title } = request.body

        const result = await db.insert(courses).values({ title: title }).returning()

        return reply.status(201).send({ courseId: result[0].id })
    })

}