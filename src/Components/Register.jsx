import React from "react";
import { useContext, useState } from "react";
import { Context } from "./Context";
import { useNavigate, Link } from "react-router";

const Register = () => {
  const { state, dispatch, actions } = useContext(Context);
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [showMsg, setShowMsg] = useState(false);

  const register = async (name, email, password) => {
    const data = await fetch(
      `https://${import.meta.env.VITE_SERVER_API}/register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      }
    );
    const result = await data.json();
    if (result.ok) {
      navigate("/login");
    } else {
      throw new Error(result.message);
    }
  };

  const validateEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      setError("Please fill in all fields.");
      setShowMsg(true);
      return;
    } else if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      setShowMsg(true);
      return;
    } else if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      setShowMsg(true);
      return;
    }
    // setSubmitted(true);
    register(name, email, password).catch((err) => {
      setError(err.message);
      setShowMsg(true);
    });
  };

  return (
    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <div className="w-full rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0 custom-form-bg2">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            Create a new account
          </h1>
          <form className="space-y-4 md:space-y-6" action="#">
            <div>
              <label
                for="name"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                className="rounded-lg w-full p-2.5 form-input"
                placeholder="John Doe"
                required=""
                onChange={(e) => {
                  setName(e.target.value);
                  setShowMsg(false);
                  setError("");
                }}
              />
            </div>
            <div>
              <label
                for="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className="rounded-lg w-full p-2.5 form-input"
                placeholder="name@company.com"
                required=""
                onChange={(e) => {
                  setEmail(e.target.value);
                  setShowMsg(false);
                  setError("");
                }}
              />
            </div>
            <div>
              <label
                for="password"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="••••••••"
                className="rounded-lg w-full p-2.5 form-input"
                required=""
                onChange={(e) => {
                  setPassword(e.target.value);
                  setShowMsg(false);
                  setError("");
                }}
              />
            </div>
            <button
              type="submit"
              className="mb-0 w-full text-white font-medium rounded-lg text-lg px-5 py-2.5 text-center border border-white hover:bg-white/20 active:bg-white/30 transition-colors duration-100"
              onClick={(e) => {
                handleSubmit(e);
              }}
            >
              Sign up
            </button>
            <p className="text-sm text-rose-600 flex justify-center w-full my-2">
              {showMsg && <span>{error}</span>}
            </p>
            <p className="text-sm font-light text-white">
              <Link
                to="/login"
                className="font-medium text-primary-600 hover:underline dark:text-primary-500"
              >
                already have an account?
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
