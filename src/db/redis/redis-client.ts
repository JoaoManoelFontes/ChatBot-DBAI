import { createClient } from 'redis'
import { env } from '../../env'
import { schema } from './types'

const PRODUCTS_KEY_PREFIX = 'faq'
export const PRODUCTS_INDEX_KEY = 'idx:faq'

let nodeRedisClient: ReturnType<typeof createClient> | undefined

export const getNodeRedisClient = async () => {
  if (!nodeRedisClient) {
    nodeRedisClient = createClient({ url: env.REDIS_URL })
    await nodeRedisClient.connect()
  }
  return nodeRedisClient
}

async function createVectorIndex() {
  const nodeRedisClient = await getNodeRedisClient()

  try {
    try {
      await nodeRedisClient.ft.dropIndex(PRODUCTS_INDEX_KEY)
      console.log('Index removed successfully!')
    } catch (error) {
      if (error.message.includes('Unknown Index name')) {
        console.log('Index does not exist.')
      } else {
        console.error('Error removing index: ', error)
        return
      }
    }

    await nodeRedisClient.ft.create(PRODUCTS_INDEX_KEY, schema, {
      ON: 'JSON',
      PREFIX: PRODUCTS_KEY_PREFIX,
    })
    console.log('Index created successfully!')
  } catch (error) {
    console.error('Error creating index:', error)
  }
}
;(async () => {
  await createVectorIndex()
})()
