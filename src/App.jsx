import React, { useEffect } from 'react';
import Header from './layouts/Header/Header';
import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import './App.css';
import ProjectPage from './components/ProjectPage';
import Footer from './layouts/Footer/Footer';
import axios from 'axios';
import { baseURL } from './helpers/baseUrl';

function App() {
  useEffect(() => {
    axios.defaults.baseURL = baseURL;
    // axios.defaults.baseURL = "http://localhost:5000";
    axios.defaults.headers = {
      authorization: `Bearer ${sessionStorage.getItem('token')}`
    }
  }, [sessionStorage.getItem('token')]);
  // axios.defaults.baseURL = "https://my-flask-app-latest-fbf3.onrender.com";
  return (
    <div className="App">
      <Routes>

        <Route path="/" element={<><Header /> <Hero />  <Footer />  </>} />
        <Route path="/auth" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Dashboard />} />
        <Route path="/project/:id" element={<ProjectPage />} />
        {/* <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </div>
  );
}

const Hero = () => (

  <main className="flex text-center py-16 bg-blue-50/50 m-5 rounded-lg h-screen">

    <section className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold text-gray-800">Discover stunning photos & explore them effortlessly</h1>
      <p className="text-lg text-gray-600 mt-4">Start your photo journey now.</p>
      <button className="mt-8 px-6 py-3 bg-blue-600 text-white rounded-md">Start browsing</button>
      <div className="mt-10">
        <img src="https://www.hdwallpapers.in/download/bumblebee_transformers_the_last_knight-wide.jpg" alt="Illustration" className="mx-auto" />
      </div>
    </section>
  </main>
);


export default App;
