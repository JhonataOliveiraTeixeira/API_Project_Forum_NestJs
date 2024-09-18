import { Slug } from '../../../enterprise/entities/value-objects/slug'
import { expect, test } from 'vitest'

test('it shloud be able to create a new slug from text', () => {
  const slug = Slug.createFromText('Example question from title')

  expect(slug.value).toEqual('example-question-from-title')
})
