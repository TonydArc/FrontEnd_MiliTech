import React, { useEffect, useState } from 'react'
import { register } from '../services/authService';

export default function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmpassword, setConfirmPassword] = useState('');

  function handleName(e: { target: { value: React.SetStateAction<string>; }; }) {
    setName(e.target.value)
  }
  function handleEmail(e: { target: { value: React.SetStateAction<string>; }; }) {
    setEmail(e.target.value)
  }
  function handleConfirmPass(e: { target: { value: React.SetStateAction<string>; }; }) {
    setConfirmPassword(e.target.value)
  }
  function handlePass(e: { target: { value: React.SetStateAction<string>; }; }) {
    setPassword(e.target.value)
  }

  useEffect(() => {
    console.log("Name updated:", name);
  }, [name]);
  useEffect(() => {
    console.log("Email updated:", email);
  }, [email]);
  useEffect(() => {
    console.log("Pass updated:", password);
  }, [password]);
  useEffect(() => {
    console.log("ConfirmPass updated:", confirmpassword);
  }, [confirmpassword]);

  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  function checkPass() {
    if (password.trim() === confirmpassword.trim()) {
      return true
    } else {
      return false
    }
  }
  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    const parts = name.split(' ');

    const FirstName = parts[0];
    const LastName = parts[1];

    const userData = {
      name,
      email,
      password,
      FirstName,
      LastName
    };
    console.log("Form submitted with data:", userData);

    console.log(checkPass());

    if (checkPass()) {
      try {
        const responseData = await register(userData);
        alert('Sign Up successful');
        return responseData;
      } catch (error) {
        alert('Sign Up failed: ' + error);
      }
    } else {
      alert('Password and Confirm Pasword not same');
    }
  }


  return (
    <>
      <div className="mb-20 mt-14 bg-white-100 flex justify-center items-center h-screen">
        {/* <!-- Left: Image --> */}
        <div className="w-1/2 h-screen hidden lg:block">
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVc5pV1RoeAMpB-_L8ej5P49DXGx2UkfaYRn0ClkOKdw&s"
            alt="Placeholder Image" className="object-cover w-full h-full" />
        </div>
        {/* <!-- Right: Login Form --> */}
        <div className="lg:p-36 md:p-52 sm:20 p-8 w-full lg:w-1/2">
          <h1 className="text-2xl font-semibold mb-4">Sign Up</h1>
          <form action="#" method="POST">
            {/* Name Input */}
            <div className="mb-4">
              <label htmlFor="username" className="block text-gray-600 text-left">Name</label>
              <input type="text" id="username"
                onChange={handleName}
                value={name}
                required
                name="username"
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500" autoComplete="off" />
            </div>
            {/* <!-- Email Input --> */}
            <div className="mb-4">
              <label htmlFor="username" className="block text-gray-600 text-left">Email</label>
              <input type="text" id="email"
                onChange={handleEmail}
                value={email}
                required
                name="email"
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500" autoComplete="off" />
            </div>
            {/* <!-- Password Input --> */}
            <div className="mb-4">
              <label htmlFor="password" className="block text-gray-600 text-left">Password</label>
              <input type="password" id="password"
                onChange={handlePass}
                value={password}
                name="password"
                required
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500" autoComplete="off" />
            </div>
            {/* <!-- Confirm password Input --> */}
            <div className="mb-4">
              <label htmlFor="password" className="block text-gray-600 text-left">Confirm Password</label>
              <input type="password" id="confirmpassword"
                onChange={handleConfirmPass}
                value={confirmpassword}
                name="confirmpassword"
                required
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500" autoComplete="off" />
            </div>
            {/* <!-- Login Button --> */}
            <button type="submit"
              onClick={handleSubmit}
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 w-full">Sign Up</button>
          </form>
          {/* <!-- Sign up  Link --> */}
          <div className="mt-6 text-blue-500 text-center">
            <a href="/login" className="hover:underline">Login</a>
          </div>
        </div>
      </div>
    </>
  )
}
