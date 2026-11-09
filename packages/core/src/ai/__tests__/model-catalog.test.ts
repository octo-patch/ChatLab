import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import { getBuiltinModelById } from '../model-catalog'
import { getBuiltinProviderById } from '../provider-registry'

describe('MiniMax model catalog', () => {
  it('registers the current models with their runtime capabilities', () => {
    const provider = getBuiltinProviderById('minimax')
    assert.deepEqual(provider?.modelIds.slice(0, 2), ['MiniMax-M3.1-Flash', 'MiniMax-M3'])

    for (const modelId of ['MiniMax-M3.1-Flash', 'MiniMax-M3']) {
      const model = getBuiltinModelById('minimax', modelId)
      assert.equal(model?.contextWindow, 1_000_000)
      assert.deepEqual(model?.capabilities, ['chat', 'reasoning', 'vision', 'function_calling'])
      assert.deepEqual(model?.recommendedFor, ['chat'])
      assert.equal(model?.status, 'stable')
    }
  })
})
