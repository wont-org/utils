---
  to: src/<%= name %>/_<%= name %>.test.ts
---
import { <%= name %> } from './<%= name %>'

describe('<%= name %> 方法测试', () => {
  test('execute', () => {
    expect(<%= name %>(1)).toBe(1)
  })
})
