import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import Create from '../pages/Create';

const information = {
  title: 'Made with test',
  content: '<p>This was a test post made with the test</p>',
  category: 'Art',
  image: "justSomeImg.jpg"
};

let form;
describe('It should render the Create component', () => {

  beforeEach(async () => {
    render(
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Create />} />
        </Routes>
      </BrowserRouter>
    );
    form = screen.getByTestId('form');
  });

  it('Should show a submit button', () => {
    const submit_btn = form.querySelector('button');
    expect(submit_btn).toBeInTheDocument();
    expect(submit_btn.type).toBe('submit');
    expect(submit_btn.textContent).toBe('publish');
  });

  it('Should show a input for a file', () => {
    const input_file = form.querySelector('input');
    expect(input_file).toBeInTheDocument();
    expect(input_file.type).toBe('file');
  });

  it('Should show a input for a title', () => {
    const title = form.querySelectorAll('input');
    expect(title[1]).toBeInTheDocument();
    expect(title[1].type).toBe('text');
  });

  it('Should display a place for the description', () => {
    const input_text = form.getElementsByClassName('ql-editor')[0];
    expect(input_text).toBeInTheDocument();
  });

  it('Should show all categorys', () => {
    const categories = screen.getByTestId('options_container');
    expect(categories).toBeInTheDocument();

    const children = Array.from(categories.children);
    const options = ['Art', 'Science', 'Technology', 'Music', 'Sports', 'Travel', 'Food'];

    children.forEach((child, index) => {
      if (index === 0) expect(child.textContent).toBe('Category');
      else expect(child.textContent).toBe(options[index - 1]);
    });
  });

  it('Should allow to create a new post', () => {
    const title = form.querySelectorAll('input')[1];
    const input_text = form.getElementsByClassName('ql-editor')[0];

    const art_btn = screen.getByTestId('options_container').children[1];
    const submit_btn = form.querySelector('button');

    // fireEvent.change(title, { target: { value: information.title } });
    // fireEvent.change(input_text, { target: { value: information.content } });
    // fireEvent.click(art_btn);

    fireEvent.submit(submit_btn)

  });

});