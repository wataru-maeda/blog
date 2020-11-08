import React from 'react'
import renderer from 'react-test-renderer'
import HTML from '../src/html'

describe('HTML', () => {
  it('renders correctly', () => {
    const props = {
      htmlAttributes: {},
      headComponents: [],
      bodyAttributes: {},
      preBodyComponents: [],
      body: '',
      postBodyComponents: [],
    }
    const tree = renderer.create(<HTML {...props} />)
    expect(tree).toMatchSnapshot()
  })
})
