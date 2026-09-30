import '@testing-library/jest-dom/vitest'

// Mock ResizeObserver (you already had this)
class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

global.ResizeObserver = ResizeObserver

Object.defineProperty(window, 'scrollTo', {
  value: vi.fn(),
  writable: true,
})