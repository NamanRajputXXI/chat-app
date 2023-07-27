import Link from "next/link";
import React, { useEffect } from "react";
import { IoLogoGoogle, IoLogoFacebook } from "react-icons/io";
import { auth } from "@/firebase/firebase";
import { useAuth } from "@/context/authContext";
import { useRouter } from "next/router";
import {
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";

const gProvider = new GoogleAuthProvider();
const fProvider = new FacebookAuthProvider();
const register = () => {
  const { currentUser, isLoading } = useAuth();
  const router = useRouter();
  useEffect(() => {
    if (!isLoading && currentUser) {
      // it means user logged in
      router.push("/");
    }
  }, [currentUser, isLoading]);
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
  const handleSubmit = async (e) => {
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await updateProfile(user, {
        displayName,
      });
      console.log(user);
    } catch (error) {
      console.log(error);
    }
  };
  return isLoading || (!isLoading && currentUser) ? (
    "Loader..."
  ) : (
    <div className="flex items-center justify-center h-screen bg-c1">
      <div className="flex flex-col items-center ">
        <div className="text-center">
          <div className="text-4xl font-bold">Create New Account</div>
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
              <span>Sign up with Google</span>
            </div>
          </div>
          <div
            className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 w-1/2 h-14 rounded-md cursor-pointer p-[1px]"
            onClick={signInWithFacebook}
          >
            <div className="flex items-center justify-center w-full h-full gap-3 font-semibold text-white rounded-md bg-c1">
              <IoLogoFacebook size={24} />
              <span>Sign up with Facebook</span>
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
            type="text"
            placeholder="Display Name"
            className="w-full px-5 border-none outline-none h-14 bg-c5 rounded-xl text-c3"
            autoComplete="off"
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full px-5 border-none outline-none h-14 bg-c5 rounded-xl text-c3"
            autoComplete="off"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-5 border-none outline-none h-14 bg-c5 rounded-xl text-c3"
            autoComplete="off"
          />
          <div className="w-full text-right text-c3">
            <span className="cursor-pointer">Forget Password ?</span>
          </div>
          <button className="w-full mt-4 text-base font-semibold outline-none h-14 rounded-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
            Sign Up
          </button>
        </form>
        <div className="flex justify-center gap-1 mt-5 text-c3">
          <span>Already have Account ?</span>
          <Link
            href="/login"
            className="font-semibold text-white underline cursor-pointer underline-offset-2"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default register;
