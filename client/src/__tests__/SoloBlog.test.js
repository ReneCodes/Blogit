import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { render, screen, act } from '@testing-library/react';
import SingleBlog from '../pages/SingleBlog';
import { AuthContext } from '../App';

const auth = {
  _id: "649067f0d89a4897a9c9d80f",
  username: "Test",
  email: "123@gmail.com",
  password: "$2a$10$FVgPOCg/oUtoH5XHu8fnwuupmVD3vtwJaJjb2L9JWobPIJIpV5592",
  createdAt: "2023-06-19T14:36:32.747Z",
  updatedAt: "2023-06-19T14:36:32.747Z",
};

describe('It should render the SoloBlog component', () => {

  beforeEach(async () => {
    await act(async () => {
      render(
        <AuthContext.Provider value={auth}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<SingleBlog />} />
            </Routes>
          </BrowserRouter>
        </AuthContext.Provider>
      );
    })
  });

  it('Should render the specific blog', async () => {

    const blog = screen.getByTestId('blog-solo');
    const h1 = blog.querySelector('h1');
    const authoredBy = blog.querySelectorAll('p');
    const description = screen.getByTestId('description')

    expect(h1.textContent).toBe('Test');
    expect(authoredBy[0].textContent).toBe('Authored by: TEST');
    expect(authoredBy[1].textContent).toBe('2 days ago');
    expect(description.textContent).toBe('123');
  });

});