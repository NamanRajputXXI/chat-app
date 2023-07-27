import Link from "next/link";
import React, { useEffect, useState } from "react";
import { IoLogoGoogle, IoLogoFacebook } from "react-icons/io";
import { toast } from "react-toastify";
import ToastMessage from "@/components/ToastMessage";
import { auth } from "@/firebase/firebase";
import { useAuth } from "@/context/authContext";
import { useRouter } from "next/router";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
} from "firebase/auth";

const gProvider = new GoogleAuthProvider();
const fProvider = new FacebookAuthProvider();
const login = () => {
  const { currentUser, isLoading } = useAuth();
  const [email, setEmail] = useState("");
  const router = useRouter();
  useEffect(() => {
    if (!isLoading && currentUser) {
      // it means user logged in
      router.push("/");
    }
  }, [currentUser, isLoading]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.log(error);
    }
  };
  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, gProvider);
    } catch (error) {
      console.log(error);
    }
  };
  const signInWithFacebook = async () => {
    try {
      await signInWithPopup(auth, fProviderProvider);
    } catch (error) {
      console.log(error);
    }
  };
  const resetPassword = async () => {
    try {
      toast.promise(
        async () => {
          await sendPasswordResetEmail(auth, email);
        },
        {
          pending: "Generating reset link",
          success: "Reset email send to your registered email",
          error: "You have entered wrong email id!",
        },
        {
          autoClose: 5000,
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  return isLoading || (!isLoading && currentUser) ? (
    "Loader..."
  ) : (
    <div className="flex items-center justify-center h-screen bg-c1">
      <ToastMessage />
      <div className="flex flex-col items-center ">
        <div className="text-center">
          <div className="text-4xl font-bold">Login to Your Account</div>
          <div className="mt-3 text-c3">
            Connect and chat with anyone, anywhere
          </div>
        </div>
        <div className="flex items-center w-full gap-2 mt-10 mb-5">
          <div
            className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 w-1/2 h-14 rounded-md cursor-pointer p-[1px]"
            onClick={signInWithGoogle}
          >
            <div className="flex items-center justify-center w-full h-full gap-3 font-semibold text-white rounded-md bg-c1">
              <IoLogoGoogle size={24} />
              <span>Login with Google</span>
            </div>
          </div>
          <div
            className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 w-1/2 h-14 rounded-md cursor-pointer p-[1px]"
            onClick={signInWithFacebook}
          >
            <div className="flex items-center justify-center w-full h-full gap-3 font-semibold text-white rounded-md bg-c1">
              <IoLogoFacebook size={24} />
              <span>Login with Facebook</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <span className="w-5 h-[1px] bg-c3"></span>
          <span className="font-semibold text-c3">OR</span>
          <span className="w-5 h-[1px] bg-c3"></span>
        </div>
        <form
          className=" flex flex-col items-center gap-3 w-[500px] mt-5"
          onSubmit={handleSubmit}
        >
          <input
            type="email"
            placeholder="Email"
            className="w-full px-5 border-none outline-none h-14 bg-c5 rounded-xl text-c3"
            autoComplete="off"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-5 border-none outline-none h-14 bg-c5 rounded-xl text-c3"
            autoComplete="off"
          />
          <div className="w-full text-right text-c3">
            <span className="cursor-pointer " onClick={resetPassword}>
              Forget Password ?
            </span>
          </div>
          <button className="w-full mt-4 text-base font-semibold outline-none h-14 rounded-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
            Login to Your Account
          </button>
        </form>
        <div className="flex justify-center gap-1 mt-5 text-c3">
          <span>Not a Member Yet ?</span>
          <Link
            href="/register"
            className="font-semibold text-white underline cursor-pointer underline-offset-2"
          >
            Register Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default login;
