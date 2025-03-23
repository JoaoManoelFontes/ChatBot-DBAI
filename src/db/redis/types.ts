import {
  type RediSearchSchema,
  SchemaFieldTypes,
  VectorAlgorithms,
} from 'redis'

export interface FAQEntry {
  answer: string
  questionEmbeddings: number[]
}

export interface FAQSearchResult {
  answer: string
  score: number
}

export const schema: RediSearchSchema = {
      '$.answer': {
        type: SchemaFieldTypes.TEXT,
        NOSTEM: true,
        SORTABLE: false,
        AS: 'answer',
      },
      '$.questionEmbeddings': {
        type: SchemaFieldTypes.VECTOR,
        TYPE: 'FLOAT32',
        ALGORITHM: VectorAlgorithms.FLAT,
        DIM: 768,
        DISTANCE_METRIC: 'COSINE',
        INITIAL_CAP: 111,
        BLOCK_SIZE: 111,
        AS: 'questionEmbeddings',
      },
    }