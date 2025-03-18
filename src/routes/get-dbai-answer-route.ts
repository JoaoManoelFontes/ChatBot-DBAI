import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";
import { getDbaiAnswer } from "../services/get-dbai-answer-service";

export const getDbaiAnswerRoute: FastifyPluginAsyncZod = async (app) => {
  app.post(
    "/chat/dbai",
    {
      schema: {
        summary: "Send a question to DBAI",
        tags: ["DBAI"],
        body: z.object({
          question: z.string(),
        }),
        response: {
          200: z.object({ answer: z.string() }),
        },
      },
    },
    async (request, __) => {
      const response = await getDbaiAnswer({
        question: request.body.question,
      });

      return response;
    }
  );
};
