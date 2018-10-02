import React from 'react'
import {mount} from 'enzyme'

import CommentList from 'components/CommentList'
import Root from 'Root'

const comments = ['hi', 'fuck off']

let wrapped
beforeEach(() => {
  // const initialState = {comments}
  wrapped = mount(
    <Root initialState={{comments}}>
      <CommentList />
    </Root>
  )
})

it('creates 1 LI per comment', () => {
  expect(wrapped.find('li').length).toEqual(2)
})

it('shows the text for each comment', () => {
  expect(wrapped.render().text()).toContain(comments[0])
  expect(wrapped.render().text()).toContain(comments[1])
})
