import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import axios from "axios";

function Login() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [error, setError] = useState("");






  useEffect(() => {

    const token = localStorage.getItem("token");

    if (token) {

      navigate("/dashboard");

    }

  }, []);








  const submitHandler = async (e) => {

    e.preventDefault();

    try {

      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/login`,
        {
          email,
          password,
        }
      );

      localStorage.setItem(
        "token",
        res.data.token
      );

      localStorage.setItem(
        "user",
        JSON.stringify(res.data)
      );

      navigate("/dashboard");

    } catch (error) {

      console.log(error);

      setError("Invalid email or password");

    }

  };









  return (

    <div className="min-h-screen flex justify-center items-center bg-gray-100">

      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">

        <h1 className="text-3xl font-bold mb-6 text-center">
          Login
        </h1>









        {error && (

          <div className="bg-red-100 text-red-600 p-3 rounded-lg mb-4">

            {error}

          </div>

        )}










        <form
          onSubmit={submitHandler}
          className="space-y-4"
        >

          <div>

            <label className="block mb-2 font-medium">
              Email
            </label>

            <input
              type="email"
              placeholder="Enter email"
              className="w-full border p-3 rounded-lg"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              required
            />

          </div>









          <div>

            <label className="block mb-2 font-medium">
              Password
            </label>

            <input
              type="password"
              placeholder="Enter password"
              className="w-full border p-3 rounded-lg"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              required
            />

          </div>










          <button
            type="submit"
            className="w-full bg-black text-white py-3 rounded-lg"
          >
            Login
          </button>

        </form>










        <p className="mt-6 text-center">

          Don’t have an account?{" "}

          <Link
            to="/register"
            className="text-blue-600 font-medium"
          >
            Register
          </Link>

        </p>

      </div>

    </div>

  );

}

export default Login;