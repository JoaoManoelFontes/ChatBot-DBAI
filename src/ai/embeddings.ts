import * as transformers from '@xenova/transformers'

export const float32Buffer = arr => {
  const floatArray = new Float32Array(arr)
  const float32Buffer = Buffer.from(floatArray.buffer)
  return float32Buffer
}

export async function getEmbedding(text: string): Promise<number[]> {
  const modelName = 'Xenova/all-distilroberta-v1'
  const pipe = await transformers.pipeline('feature-extraction', modelName)

  const vectorOutput = await pipe(text, {
    pooling: 'mean',
    normalize: true,
  })

  return Object.values(vectorOutput?.data)
}
