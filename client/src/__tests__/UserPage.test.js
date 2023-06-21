import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { render, screen, act } from '@testing-library/react';
import UserPage from '../pages/UserPage';
import { AuthContext } from '../context';

const auth = {
  _id: "649067f0d89a4897a9c9d80f",
  username: "Test",
  email: "123@gmail.com",
  password: "$2a$10$FVgPOCg/oUtoH5XHu8fnwuupmVD3vtwJaJjb2L9JWobPIJIpV5592",
  createdAt: "2023-06-19T14:36:32.747Z",
  updatedAt: "2023-06-19T14:36:32.747Z",
};

const mockData = [
  {
    _id: "649067f9d89a4897a9c9d81b",
    title: "Test",
    content: "<p>123</p>",
    image: "1687185401491multiworld.jpg",
    category: "music",
    author: {
      _id: "649067f0d89a4897a9c9d80f",
      username: "Test",
      email: "123@gmail.com",
      createdAt: "2023-06-19T14:36:32.747Z",
      updatedAt: "2023-06-19T14:36:32.747Z",
      __v: 0
    },
    createdAt: "2023-06-19T14:36:41.523Z",
    updatedAt: "2023-06-19T14:36:41.523Z",
    __v: 0
  }
];

describe('Should render the UserPage component', () => {

  beforeEach(async () => {
    await act(async () => {
      render(
        <AuthContext.Provider value={{ auth }}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<UserPage />} />
            </Routes>
          </BrowserRouter>
        </AuthContext.Provider>
      );
    });
  });

  it('Should display all of the user posts', async() => {
    const blogItems = await screen.findAllByTestId('blog-item');
    expect(blogItems).toHaveLength(mockData.length);

    const blogItemsArray = Array.from(blogItems);
    blogItemsArray.forEach((blogItem, index) => {
      const blogTitle = blogItem.querySelector('.blogTitle a');
      const blogCategory = blogItem.querySelector('ul li a');
      const blogAuthor = blogItem.querySelector('.blogDate p a');
      const blogContent = blogItem.querySelector('.blogDesc');
      const blogReadMoreLink = blogItem.querySelector('.text-xs a');

      let contentPhrase = mockData[index].content;
      contentPhrase = mockData[index].content.slice(3, mockData.length - 5);

      expect(blogTitle.textContent).toBe(mockData[index].title);
      expect(blogCategory.textContent).toBe(mockData[index].category);
      expect(blogAuthor.textContent.toLowerCase()).toBe(mockData[index].author.username.toLowerCase());
      expect(blogContent.textContent).toBe(contentPhrase);
      expect(blogReadMoreLink.textContent).toBe(mockData[index].category);
    });


  });

});