// @vitest-environment jsdom
import { test, expect, describe, it, vi } from 'vitest'
import createObeserver  from '../src/index'

class MockIntersectionObserver implements IntersectionObserver {
  root: Document | Element | null = null
  rootMargin: string = ``
  thresholds: readonly number[] = []

  disconnect = vi.fn()
  observe = vi.fn()
  takeRecords = vi.fn()
  unobserve = vi.fn()
}
window.IntersectionObserver = MockIntersectionObserver

describe('should return id when window scroll', () => {
  expect(createObeserver('chill-A')).toBe('abc')
})