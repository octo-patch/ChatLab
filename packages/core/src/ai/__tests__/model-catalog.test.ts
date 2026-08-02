import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import { getBuiltinModelById, getBuiltinModelsByProvider } from '../model-catalog'
import { getBuiltinProviderById } from '../provider-registry'

describe('MiniMax model catalog', () => {
  it('exposes MiniMax-M3 through the provider registry and builtin catalog', () => {
    const provider = getBuiltinProviderById('minimax')
    assert.ok(provider)
    assert.ok(provider.modelIds.includes('MiniMax-M3'))
    assert.deepEqual(provider.modelIds.slice(0, 2), ['MiniMax-M3', 'MiniMax-M2.7'])

    const models = getBuiltinModelsByProvider('minimax')
    assert.ok(models.some((model) => model.id === 'MiniMax-M3'))

    const model = getBuiltinModelById('minimax', 'MiniMax-M3')
    assert.ok(model)
    assert.equal(model?.contextWindow, 1000000)
    assert.deepEqual(model?.capabilities, ['chat', 'reasoning', 'vision', 'function_calling'])
  })
})
