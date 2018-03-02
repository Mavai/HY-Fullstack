import React from 'react'
import { shallow } from 'enzyme'
import SimpleBlog from './SimpleBlog'

describe('<Simpleblog/>', () => {
  it ('renders content', () => {
    const blog = {
      title: 'test title',
      author: 'test author',
      likes: 10
    }
    const simpleblogComponent = shallow(<SimpleBlog blog={blog}/>)
    const titleDiv = simpleblogComponent.find('.title')
    const likesDiv = simpleblogComponent.find('.likes')

    expect(titleDiv.text()).toContain('test title')
    expect(titleDiv.text()).toContain('test author')
    expect(likesDiv.text()).toContain('10')
  })

  it('clicking the button twice calls event handler twice', () => {
    const blog = {
      title: 'test title',
      author: 'test author',
      likes: 10
    }
    const mockHandler = jest.fn()
    const simpleblogComponent = shallow(<SimpleBlog blog={blog} onClick={mockHandler}/>)
    const button = simpleblogComponent.find('button')

    button.simulate('click')
    button.simulate('click')

    expect(mockHandler.mock.calls.length).toBe(2)
  })
})