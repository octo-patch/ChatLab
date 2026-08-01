import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import { getBuiltinModelById, getBuiltinModelsByProvider, getBuiltinProviderById } from '../index'

describe('MiniMax builtins', () => {
  it('exposes MiniMax-M3 as the first provider model and a vision-capable builtin model', () => {
    const provider = getBuiltinProviderById('minimax')
    assert.ok(provider)
    assert.equal(provider?.defaultBaseUrl, 'https://api.minimax.io/v1')
    assert.equal(provider?.modelIds[0], 'MiniMax-M3')

    const models = getBuiltinModelsByProvider('minimax')
    assert.equal(models[0]?.id, 'MiniMax-M3')

    const m3 = getBuiltinModelById('minimax', 'MiniMax-M3')
    assert.ok(m3)
    assert.equal(m3?.contextWindow, 1000000)
    assert.deepEqual(m3?.capabilities.includes('vision'), true)
  })
})
