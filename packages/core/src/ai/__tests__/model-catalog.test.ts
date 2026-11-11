import assert from 'node:assert/strict'
import test from 'node:test'

import { getBuiltinModelById } from '../model-catalog'
import { getBuiltinProviderById } from '../provider-registry'

const currentMiniMaxModels = ['MiniMax-M3.1-Flash', 'MiniMax-M3']

test('MiniMax exposes the current models in the provider registry and model catalog', () => {
  const provider = getBuiltinProviderById('minimax')

  assert.ok(provider)
  for (const modelId of currentMiniMaxModels) {
    assert.ok(provider.modelIds.includes(modelId))

    const model = getBuiltinModelById('minimax', modelId)
    assert.ok(model)
    assert.equal(model.contextWindow, 1000000)
    assert.ok(model.capabilities.includes('reasoning'))
    assert.ok(model.capabilities.includes('vision'))
  }
})
