import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { fireEvent, render, screen, act } from '@testing-library/react';
import Profile from '../pages/Profile';
import { AuthContext } from '../App';

let profile = {
  _id: "649067f0d89a4897a9c9d80f",
  username: "Test",
  email: "123@gmail.com",
  password: "$2a$10$FVgPOCg/oUtoH5XHu8fnwuupmVD3vtwJaJjb2L9JWobPIJIpV5592",
  createdAt: "2023-06-19T14:36:32.747Z",
  updatedAt: "2023-06-19T14:36:32.747Z",
};

let container;
let form;

describe('It should render the profile page', () => {

  beforeEach(async () => {

    let auth = profile;
    let reload = false;
    let setAuth = (newInformation) => auth = newInformation;
    let setReload = (shouldReload) => reload = shouldReload;

    await act(async () => {
      render(
        <AuthContext.Provider value={{ auth, setAuth, setReload }}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Profile />} />
            </Routes>
          </BrowserRouter>
        </AuthContext.Provider>
      );
    });
    container = screen.getByTestId('container')
    form = container.querySelector('form')


  });

  it('Should render the page title', () => {
    const text = screen.getByText(/Update Your Account/);
    expect(text).toBeInTheDocument();
  });

  it('Should display the delete && update button', () => {
    const buttons = screen.getAllByRole('button');

    // DELETE BUTTON
    expect(buttons[0]).toBeInTheDocument();
    expect(buttons[0].textContent).toBe('Delete Account');

    // UPDATE BUTTON
    expect(buttons[1]).toBeInTheDocument();
    expect(buttons[1].textContent).toBe('Update');
  });

  it('Should display an update of the profile picture and the profile picture', () => {
    const profileImageLabel = screen.getByText(/Profile Picture/);
    expect(profileImageLabel).toBeInTheDocument();

    const profilePicture = screen.getByRole('img');
    expect(profilePicture).toBeInTheDocument();
    expect(profilePicture.src).toBe('http://localhost/avatar.jpeg');

    const pictureInput = form.querySelector('input');
    expect(pictureInput.type).toBe('file');
  });

  it('Username input and placeholder as the current username', () => {
    const usernameInput = form.querySelectorAll('input')[1];
    expect(usernameInput.placeholder).toBe(profile.username);
    expect(usernameInput.type).toBe('text');
  });

  it('Email input and placeholder as the current email', () => {
    const emailInput = form.querySelectorAll('input')[2];
    expect(emailInput.placeholder).toBe(profile.email);
    expect(emailInput.type).toBe('email');
  });

  it('Password input and placeholder as "Enter new password"', () => {
    const passwordInput = form.querySelectorAll('input')[3];
    expect(passwordInput.placeholder).toBe("Enter new password");
    expect(passwordInput.type).toBe('password');
  });

  it('Should be able to change username/email and password', async () => {
    const usernameInput = form.querySelectorAll('input')[1];
    const emailInput = form.querySelectorAll('input')[2];
    const passwordInput = form.querySelectorAll('input')[3];

    const updateButton = screen.getAllByRole('button')[1];

    fireEvent.change(usernameInput, { target: { value: 'NewUsername' } });
    fireEvent.change(emailInput, { target: { value: 'new@email.com' } });
    fireEvent.change(passwordInput, { target: { value: 'NewPassword' } });

    await act(async () => {
      fireEvent.click(updateButton);
    });

  });

});