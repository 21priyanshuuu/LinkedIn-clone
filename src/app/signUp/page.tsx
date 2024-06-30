"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

function Page() {
  const router = useRouter();
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

  const onSignUp = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/user/signup", user);
      console.log("signUp success", response);
      toast.success("Sign up successful");
      router.push("/login");
    } catch (err: any) {
      console.log("sign up failed", err.message);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user.name.length > 0 && user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white border-t-4 border-green-500 rounded-lg shadow-lg p-8 w-full max-w-md">
          <h1 className="text-center text-2xl mb-4">{loading ? "Processing..." : "Sign Up"}</h1>
          <div className="flex flex-col items-center justify-center">
            <input
              type="text"
              placeholder="Username"
              value={user.name}
              onChange={(e) => setUser({ ...user, name: e.target.value })}
              className="border border-gray-300 text-black rounded-md p-2 mt-2 w-full"
            />
            <input
              type="email"
              placeholder="Email"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              className="border border-gray-300 text-black rounded-md p-2 mt-2 w-full"
            />
            <input
              type="password"
              placeholder="Password"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              className="border border-gray-300 rounded-md text-black p-2 mt-2 w-full"
            />
            <button
              onClick={onSignUp}
              className={`bg-blue-500 hover:bg-blue-600 text-white rounded-md py-2 px-4 mt-4 ${
                buttonDisabled ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={buttonDisabled}
            >
              {loading ? "Loading..." : "Sign Up"}
            </button>
            <Link href="/login" className="mt-3 text-blue-500 hover:underline text-center">
              Login Page
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Page;
