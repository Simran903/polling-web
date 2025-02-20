"use client";
import React, { useState } from "react";
import Image from "next/image";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { FiUploadCloud } from "react-icons/fi";
import Button from "@/components/Button";
import { useRouter } from "next/navigation";
import { validateEmail } from "@/utils/helper";
import axiosClient from "@/constants/axiosClient";
import { API_PATHS } from "@/utils/apiPaths";
import uploadImage from "@/utils/uploadImage";

const SignUp = () => {
  const [profilePic, setProfilePic] = useState<File | null>(null);
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  const handleRedirect = () => {
    router.push("/auth/signin");
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setProfilePic(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSignUP = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
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
      let profileImageUrl = "";
      if (profilePic) {
        const imgUploadRes = await uploadImage(profilePic);
        profileImageUrl = imgUploadRes?.imageURL || "";
      }

      const response = await axiosClient.post(API_PATHS.AUTH.SIGNUP, {
        username,
        email,
        password,
        profileImageUrl,
      });

      const token = response?.data?.token;

      if (response.status === 200 || 201) {
        localStorage.setItem("token", token);
        router.push("/dashboard");
      }

    } catch (error: any) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("Something went wrong, please try again.");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center text-black">
      <div className="flex w-full">
        <div className="flex w-full h-screen space-x-20">
          {/* Left Section - Sign Up Form */}
          <div className="w-full lg:w-1/2 lg:p-24 my-auto">
            <div className="shadow-xl p-12">
              <h2 className="text-primary-a40 text-4xl font-semibold mb-3">
                Create an Account
              </h2>
              <p className="text-gray-500 text-sm mb-8">
                Join us today by entering your details
              </p>

              <form onSubmit={handleSignUP}>
                {/* Profile Picture Upload */}
                <div className="flex flex-col items-center mb-6">
                  <label className="relative cursor-pointer flex flex-col items-center justify-center w-28 h-28 rounded-full border-2 border-dashed border-gray-400 hover:border-primary-a20">
                    {profileImage ? (
                      <Image
                        src={profileImage}
                        alt="Profile Preview"
                        layout="fill"
                        className="rounded-full object-cover"
                      />
                    ) : (
                      <div className="flex flex-col items-center text-gray-500">
                        <FiUploadCloud size={28} />
                        <span className="text-xs mt-1">Upload</span>
                      </div>
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      className="absolute inset-0 opacity-0 cursor-pointer"
                      onChange={handleImageChange}
                    />
                  </label>
                </div>

                <label className="block text-tonal-a50 text-sm font-semibold mb-2">
                  Username
                </label>
                <input
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  type="text"
                  className="w-full p-3 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-primary-a20"
                />

                <label className="block text-tonal-a50 text-sm font-semibold mb-2">
                  Email Address
                </label>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  className="w-full p-3 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-primary-a20"
                />

                <label className="block text-tonal-a50 text-sm font-semibold mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type={showPassword ? "text" : "password"}
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-a20 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? (
                      <AiFillEyeInvisible size={24} />
                    ) : (
                      <AiFillEye size={24} />
                    )}
                  </button>
                </div>

                {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

                <Button text="Create an account" />
              </form>

              <p className="text-gray-600 text-sm text-center mt-4">
                Already have an account?{" "}
                <span
                  className="text-primary-a0/50 hover:text-primary-a0/30 font-semibold cursor-pointer"
                  onClick={handleRedirect}
                >
                  Sign in
                </span>
              </p>
            </div>
          </div>

          {/* Right Section - Full-Screen Image */}
          <div className="w-3/4 relative hidden lg:block">
            <Image
              src="https://images.unsplash.com/photo-1720128401458-5e855a8dabb6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fHBvbGxpbmclMjBzdGF0aW9ufGVufDB8fDB8fHww"
              alt="image"
              layout="fill"
              objectFit="cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;