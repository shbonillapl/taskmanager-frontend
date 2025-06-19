import React, { useState } from 'react';
import axios from 'axios';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ username: '', password: '' });

  const toggleMode = () => setIsLogin(!isLogin);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = isLogin ? '/api/auth/login' : '/api/auth/register';

    try {
      const { data } = await axios.post(url, form);
      localStorage.setItem('token', data.token);
      window.location.href = '/';
    } catch (err) {
      alert('Error: ' + err.response?.data?.msg || 'Something went wrong');
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow w-80">
        <h2 className="text-2xl font-bold mb-4 text-center">
          {isLogin ? 'Login' : 'Register'}
        </h2>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
          className="w-full mb-3 p-2 border rounded"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="w-full mb-3 p-2 border rounded"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          {isLogin ? 'Login' : 'Register'}
        </button>
        <p className="mt-4 text-center text-sm">
          {isLogin ? 'No account?' : 'Already registered?'}{' '}
          <span className="text-blue-600 cursor-pointer" onClick={toggleMode}>
            {isLogin ? 'Register here' : 'Login'}
          </span>
        </p>
      </form>
    </div>
  );
};

export default Auth;
