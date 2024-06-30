"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import axios from "axios";

function Login() {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const router = useRouter();

  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: any) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };
  const onLogin = async (e: any) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await axios.post("/api/user/login", {
        email: credentials.email,
        password: credentials.password,
      });
      console.log("login success", response);
      toast.success("login success");
      router.push("/profile");
    } catch (err: any) {
      console.log(credentials);
      console.log("login failed", err);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (credentials.email.length > 0 && credentials.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [credentials]);

  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white border-t-4 border-green-500 rounded-lg shadow-lg p-8 w-full max-w-md">
          <h1 className="text-center text-2xl mb-4">
            {loading ? "Processing..." : "Login"}
          </h1>
          <form className="flex flex-col" onSubmit={onLogin}>
            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleChange}
              className="border border-gray-300 rounded-md p-2 mt-2 text-black"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              className="border border-gray-300 rounded-md p-2 mt-2 text-black"
            />
            <button
              type="submit"
              className={`bg-blue-500 hover:bg-blue-600 text-white rounded-md py-2 px-4 mt-4 ${
                buttonDisabled ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={buttonDisabled}
            >
              {loading ? "Loading..." : "Login"}
            </button>
            <Link href="/signUp" className="mt-3 text-blue-500 hover:underline text-center">
              Sign Up Page
            </Link>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
