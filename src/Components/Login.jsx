import React, { useEffect } from "react";
import { useContext, useState } from "react";
import { Context } from "./Context";
import { useNavigate, Link } from "react-router";

const Login = () => {
  const { state, dispatch, actions } = useContext(Context);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showMsg, setShowMsg] = useState(false);

  const login = async (email, password) => {
    const data = await fetch(`${import.meta.env.VITE_SERVER_API}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    }).catch((err) => {
      console.error("Login error");
    });
    const result = await data.json();
    if (result.ok) {
      dispatch({
        type: actions.LOGIN,
        payload: result.message,
      });
      getProfile(result.message);
      navigate("/");
    } else {
      throw new Error("wrong credentials");
    }
  };
  const getProfile = async (id) => {
    const data = await fetch(`${import.meta.env.VITE_SERVER_API}/profile`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });
    const profile = await data.json();
    console.log("profile: ", profile);
    if (profile.ok) {
      dispatch({
        type: actions.SET_PROFILE,
        payload: profile.message,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please fill in all fields.");
      setShowMsg(true);
      return;
    }
    login(email, password).catch((err) => {
      setError(err.message);
      setShowMsg(true);
    });
  };

  return (
    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <div className="w-full rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0 custom-form-bg2">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            Sign in to your account
          </h1>
          <form className="space-y-4 md:space-y-6" action="#">
            <div>
              <label
                htmlFor="email"
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
                htmlFor="password"
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
              className="w-full text-white font-medium rounded-lg text-lg px-5 py-2.5 text-center border border-white hover:bg-white/20 active:bg-white/30 transition-colors duration-100"
              onClick={(e) => {
                handleSubmit(e);
              }}
            >
              Sign in
            </button>
            <p className="text-sm text-rose-600 flex justify-center w-full my-2">
              {showMsg && <span>{error}</span>}
            </p>
            <p className="text-sm font-light text-white">
              <Link
                to="/register"
                className="font-medium text-primary-600 hover:underline dark:text-primary-500"
              >
                Don’t have an account yet?
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
