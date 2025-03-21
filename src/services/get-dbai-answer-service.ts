import { generateText, tool } from 'ai'
import z from 'zod'
import { openai } from '../ai/model'
import { pg } from '../db/client'
import { isSafeQuery } from '../db/verify-ai-query'
import {
  SYSTEM_PROMPT,
  TOOL_DESCRIPTION_PROMPT,
  TOOL_PARAMETERS_DESCRIPTIONS,
} from '../properties/dbai-properties'
import { getDatabaseSchema } from '../utils/get-database-schema'

interface getDbaiAnswerParams {
  question: string
}

export async function getDbaiAnswer({ question }: getDbaiAnswerParams) {
  const databaseSchema = await getDatabaseSchema()

  const answer = await generateText({
    model: openai,
    prompt: question,
    tools: {
      postgres: tool({
        description: TOOL_DESCRIPTION_PROMPT(databaseSchema),
        parameters: z.object({
          query: z.string().describe(TOOL_PARAMETERS_DESCRIPTIONS().query),
          params: z
            .array(z.string())
            .optional()
            .describe(TOOL_PARAMETERS_DESCRIPTIONS().params),
        }),
        execute: async ({ query, params }) => {
          if (!isSafeQuery(query)) {
            return JSON.stringify({ error: 'Unsafe query' })
          }
          try {
            const result = await pg.unsafe(query, params)
            return JSON.stringify(result)
          } catch (error) {
            return JSON.stringify({ error: error.message })
          }
        },
      }),
    },
    maxSteps: 3,
    system: SYSTEM_PROMPT(),
  })
  return { answer: answer.text }
}
