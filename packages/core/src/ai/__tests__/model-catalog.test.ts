import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import { getBuiltinModelsByProvider } from '../model-catalog'
import { getBuiltinProviderById } from '../provider-registry'

describe('MiniMax model catalog', () => {
  it('registers the current multimodal reasoning models with the provider', () => {
    const models = getBuiltinModelsByProvider('minimax')
    const provider = getBuiltinProviderById('minimax')

    for (const modelId of ['MiniMax-M3.1-Flash', 'MiniMax-M3']) {
      const model = models.find((candidate) => candidate.id === modelId)

      assert.ok(model)
      assert.equal(model.contextWindow, 1000000)
      assert.deepEqual(model.capabilities, ['chat', 'reasoning', 'vision', 'function_calling'])
      assert.ok(provider?.modelIds.includes(modelId))
    }
  })
})
