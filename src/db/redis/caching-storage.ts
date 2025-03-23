import crypto from 'node:crypto'
import { getEmbedding } from '../../ai/embeddings'
import { getNodeRedisClient } from './redis-client'
import type { FAQEntry } from './types'

export async function storeFAQ(question: string, answer: string) {
  try {
    const nodeRedisClient = await getNodeRedisClient()
    const questionEmbeddings = await getEmbedding(question)

    const faqEntry: FAQEntry = {
      answer,
      questionEmbeddings,
    }

    nodeRedisClient.json.set(`faq:${crypto.randomUUID()}`, '$', {
      ...faqEntry,
    })

    console.log(`FAQ "${question}" stored in Redis!`)
  } catch (error) {
    console.error('error storing FAQ:', error)
  }
}
