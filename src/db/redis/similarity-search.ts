import { float32Buffer, getEmbedding } from '../../ai/embeddings'
import { PRODUCTS_INDEX_KEY, getNodeRedisClient } from './redis-client'
import type { FAQSearchResult } from './types'

export async function findCachedFAQ(
  question: string,
  similarityThreshold = 0.2
): Promise<FAQSearchResult | null> {
  const nodeRedisClient = await getNodeRedisClient()
  const questionEmbeddings = await getEmbedding(question)
  const vectorQuestionEmbeddings = float32Buffer(questionEmbeddings)

  const searchQuery = '*=>[KNN 1 @questionEmbeddings $searchBlob AS score]'

  const results = await nodeRedisClient.ft.search(
    PRODUCTS_INDEX_KEY,
    searchQuery,
    {
      PARAMS: {
        searchBlob: vectorQuestionEmbeddings,
      },
      RETURN: ['answer', 'score'],
      SORTBY: {
        BY: 'score',
        DIRECTION: 'ASC',
      },
      DIALECT: 2,
    }
  )

  if (results.documents.length > 0) {
    const doc = results.documents[0]
    const score = (doc.value.score ?? -1) as number

    if (score < 0 || score > similarityThreshold) return null

    const answer = (doc.value.answer ?? '') as string

    return {
      answer,
      score,
    }
  }

  return null
}
