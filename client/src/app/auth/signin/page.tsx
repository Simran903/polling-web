"use client";
import React, { FC, useContext, useState } from "react";
import Image from "next/image";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import Button from "@/components/Button";
import { useRouter } from "next/navigation";
import { validateEmail } from "@/utils/helper";
import axiosClient from "@/constants/axiosClient";
import { API_PATHS } from "@/utils/apiPaths";
import { UserContext } from "@/context/UserContext";
// import { UserContext } from "@/context/UserContext";

const SignIn: FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { user, updateUser, clearUser } = useContext(UserContext);


  const router = useRouter();
  // const { updateUser } = useContext(UserContext)

  const handleRedirect = (): void => {
    router.push('/auth/signup');
  }

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    if (!password) {
      setError("Please enter the password");
      return;
    }

    setError(null);

    try {
      const response = await axiosClient.post(API_PATHS.AUTH.LOGIN, {
        email,
        password
      });

      if (response.status == 200) {
        setError(null);
        const { token, user } = response.data;

        if (token) {
          localStorage.setItem("token", token);
          updateUser(user);
          router.push('/dashboard')
        }
      }
    } catch (error: any) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("Something went wrong, please try again.")
      }
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-self-auto text-black">
      <div className="flex w-full">
        <div className="flex w-full h-screen space-x-20">
          {/* Left Section - Login Form */}
          <div className="w-full lg:w-1/2 lg:p-24 my-auto">
            <div className="shadow-xl p-12">
              <h2 className="text-primary-a40 text-4xl font-semibold mb-3">
                Welcome Back
              </h2>
              <p className="text-gray-500 text-sm mb-8">
                Please enter your details to log in
              </p>

              <form onSubmit={handleSignIn}>
                <label className="block text-tonal-a50 text-sm font-semibold mb-2">
                  Email Address
                </label>
                <input
                  value={email}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                  type="email"
                  className="w-full p-3 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-primary-a20"
                />

                <label className="block text-tonal-a50 text-sm font-semibold mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    value={password}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                    type={showPassword ? "text" : "password"}
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-a20 pr-10"
                  />
                  {/* Toggle Button */}
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? <AiFillEyeInvisible size={24} /> : <AiFillEye size={24} />}
                  </button>
                </div>

                {error && <p className="text-red-500 text-xs pt-4">{error}</p>}

                <Button text="Sign in" />
              </form>

              <p className="text-gray-600 text-sm text-center mt-4">
                Don't have an account?{" "}
                <a className="text-primary-a0/50 hover:text-primary-a0/30 font-semibold cursor-pointer" onClick={handleRedirect}>Sign up</a>
              </p>
            </div>
          </div>

          {/* Right Section - Full-Screen Image */}
          <div className="w-3/4 relative hidden lg:block">
            <Image
              src="https://images.unsplash.com/photo-1720128401458-5e855a8dabb6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fHBvbGxpbmclMjBzdGF0aW9ufGVufDB8fDB8fHww"
              alt={"image"}
              layout='fill'
              objectFit='cover'
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;