/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { isLoggedIn } from '../services/untils';
import { login } from '../services/authService';

export default function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function handleEmail(e: { target: { value: React.SetStateAction<string>; }; }) {
        setEmail(e.target.value);
    }

    function handlePass(e: { target: { value: React.SetStateAction<string>; }; }) {
        setPassword(e.target.value);
    }

    // useEffect(() => {
    //     console.log("Email updated:", email);
    // }, [email]);

    // useEffect(() => {
    //     console.log("Password updated:", password);
    // }, [password]);

    const handleSubmit = async (event: { preventDefault: () => void; }) => {
        event.preventDefault();
    
        const userData = {
          email,
          password
        };
        console.log("Form submitted with data:", userData);

        try {
          const responseData = await login(userData);
          alert('Login successful');
          if (isLoggedIn()) {
            navigate('/');
          }
          return responseData;
        } catch (error) {
          alert('Login failed: ' + error);
        }
    };

    return (
        <>
            <div className="mb-20 mt-14 bg-white-100 flex justify-center items-center h-screen">
                <div className="w-1/2 h-screen hidden lg:block">
                    <img src="https://i1.sndcdn.com/artworks-4mwDYaZYyB0cUc7c-iKQQaw-t500x500.jpg"
                        alt="Placeholder Image" className="object-cover w-full h-full" />
                </div>
                <div className="lg:p-36 md:p-52 sm:20 p-8 w-full lg:w-1/2">
                    <h1 className="text-2xl font-semibold mb-4">Login</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="username" className="block text-gray-600 text-left">Email</label>
                            <input type="text" id="username"
                                onChange={handleEmail}
                                value={email}
                                required name="username" className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500" autoComplete="off" />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="password" className="block text-gray-600 text-left">Password</label>
                            <input type="password" id="password"
                                onChange={handlePass}
                                value={password}
                                required name="password" className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500" autoComplete="off" />
                        </div>
                        <div className="mb-4 flex items-center">
                            <input type="checkbox" id="remember" name="remember" className="text-blue-500" />
                            <label htmlFor="remember" className="text-gray-600 ml-2">Remember Me</label>
                        </div>
                        <div className="mb-6 text-blue-500">
                            <a href="/resetpass" className="hover:underline">Forgot Password?</a>
                        </div>
                        <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 w-full">Login</button>
                    </form>
                    <div className="mt-6 text-blue-500 text-center">
                        <a href="/signup" className="hover:underline">Sign up Here</a>
                    </div>
                </div>
            </div>
        </>
    );
}
