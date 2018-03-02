import React from 'react'
import { shallow } from 'enzyme'
import Blog from './Blog'

describe('<Blog/>', () => {
  it ('after clicking name the details are displayed', () => {
    const user = { username: 'test user' }
    const blog = {
      title: 'test title',
      author: 'test author',
      url: 'test_url',
      likes: 10,
      user
    }
    const mockHandler = jest.fn()
    const blogComponent = shallow(<Blog blog={blog} user={user} handleLike={mockHandler} handleDelete={mockHandler}/>)
    const titleDiv = blogComponent.find('.title')
    titleDiv.simulate('click')
    const contentDiv = blogComponent.find('.content')

    expect(titleDiv.text()).toContain('test title')
    expect(titleDiv.text()).toContain('test author')

    expect(titleDiv.text()).not.toContain('test_url')

    expect(contentDiv.text()).toContain('test_url')
    expect(contentDiv.text()).toContain('10')
  })
})