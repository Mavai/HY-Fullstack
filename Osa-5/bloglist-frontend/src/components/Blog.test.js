import React from 'react'
import { shallow } from 'enzyme'
import Blog from './Blog'

describe('<Blog/>', () => {
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
  it ('by default details aren\'t displayed', () => {
    const contentDiv = blogComponent.find('.content')
    expect(contentDiv.getElement().props.style).toEqual({ display: 'none', paddingLeft: 5 })
  })
  it ('after clicking name the details are displayed', () => {
    const titleDiv = blogComponent.find('.title')
    titleDiv.simulate('click')
    const contentDiv = blogComponent.find('.content')

    expect(contentDiv.getElement().props.style).toEqual({ display: '', paddingLeft: 5 })

  })
})