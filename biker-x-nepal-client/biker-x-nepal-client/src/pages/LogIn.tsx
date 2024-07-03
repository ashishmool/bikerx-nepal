import { FaEnvelope, FaLock, FaXmark } from "react-icons/fa6";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
// import { ILogin } from "../moduls";
// import { login } from "../features/Auth/authSlice";
import { RootState } from "../store";
import { useSelector } from "react-redux";
// import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
// import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import { MiniSpinner } from "../ui/MiniSpinner";
import { motion } from "framer-motion";
import axios from 'axios';


export const LogIn = () => {
  // const dispatch = useDispatch() as ThunkDispatch<
  //     RootState,
  //     undefined,
  //     AnyAction
  // >;
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();


  const { isLoading, name, surname, errorLogin, isLoggedIn } = useSelector(
    (store: RootState) => store.auth
  );
  const navigate = useNavigate();
  const [warningMessage, setWarningMessage] = useState(false);

  useEffect(() => {

    if (localStorage.getItem("accessToken")) {

      // If user is not logged in, redirect to login page
      navigate('/');
      return;
    }

    if (errorLogin) {
      reset({ loginPassword: "" });
    }
    if (isLoggedIn) {
      navigate(-1);
    }
  }, [isLoading, name, surname, errorLogin, isLoggedIn]);

  const onSubmit = async (data: FieldValues) => {
    try {
      const response = await axios.post("http://13.48.249.115:8080/authenticate", {
        email: data.loginEmail,
        password: data.loginPassword
      });
      const userData = response?.data?.data;

      localStorage.setItem("accessToken", userData?.token);
      localStorage.setItem("userId", userData?.userId);
      localStorage.setItem("email", userData?.email);
      localStorage.setItem("role", userData?.role);


      if (userData?.role === "Customer") {
        console.log("Login successful!", userData);
        window.location.href = '/';
      } else if (userData?.role === "Admin") {
        console.log("Login successful!", userData);
        console.log('Token Fetched',localStorage.getItem("accessToken"));
        window.location.href = '/dashboard/home';
      } else {
        console.log("Username/Password Mismatch");
        setWarningMessage(true);
      }
    } catch (error) {
      console.error("Authentication Failed!", error);
      setWarningMessage(true);
    }
  };

  return (
    <div
      className="h-0 laptop:min-h-[600px] laptop:h-[100vh] relative z-[1] w-full bg-[url('/src/images/bgImages/bg-login.jpg')] bg-cover bg-top
    before:content-[''] before:absolute before:inset-0 before:bg-black/50"
    >
      <div
        className={`tablet:h-16 fixed top-0 w-full bg-orange-500 flex justify-between text-white items-center text-base 
        tablet:text-xl px-6 tablet:px-10 h-22
       z-[999] py-2 ${warningMessage ? "block" : "hidden"}`}
      >
        <span>
          👋 Something is not quite right, either the server isn't responding
          or your credentials are not quite correct. Please try again!
        </span>
        <button
          className=" cursor-pointer"
          onClick={() => setWarningMessage(false)}
        >
          <FaXmark className="scale-[1.5]" />
        </button>
      </div>
      <div className="text-2xl font-spacex absolute z-[2] left-8 laptop:left-16 top-8 laptop:top-10 text-white">
        <Link to="/">BikerX Nepal</Link>
      </div>
      <motion.div
        className="h-[100vh] laptop:h-auto w-full laptop:w-[490px] bg-black laptop:bg-black/90 text-white
        absolute z-[1] laptop:mt-24 px-8 laptop:py-8 pb-16 pt-28 flex flex-col laptop:justify-between left-[50%]
        translate-x-[-50%] justify-start"
        initial={{ opacity: 0, translateX: "-100%" }}
        animate={{ opacity: 1, translateX: "-50%" }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="font-semibold text-4xl text-white mb-7">Log In</h1>
        {errorLogin && (
          <span className="bg-[#ff2020] text-sm mb-5 py-2 px-4">
            <span className="font-semibold tracking-wide">{errorLogin}</span>.
            Please try again.
          </span>
        )}
        <form
          className="flex flex-col justify-between text-white/40"
          onSubmit={handleSubmit(onSubmit as SubmitHandler<FieldValues>)}
        >
          <label
            htmlFor="loginEmail"
            className="flex flex-col-reverse gap-1 relative text-sm mb-3"
          >
            {errors.loginEmail?.message && (
              <span className="text-[#ff2020]">
                {errors.loginEmail.message.toString()}
              </span>
            )}
            <input
              id="loginEmail"
              className={`bg-transparent border-2 ${
                errors.loginEmail?.message
                  ? "border-[#ff2020] focus:border-[#ff2020]"
                  : "border-white/40 focus:border-white/80"
              }  pl-10 pr-4 py-[6px] focus:outline-none text-white placeholder:text-white/40  peer transition 
              duration-200 w-full disabled:cursor-not-allowed`}
              placeholder="Enter Your Email Address"
              {...register("loginEmail", {
                required: "This field is required" as unknown as boolean,
              })}
              disabled={isLoading}
              defaultValue={"bikerxnepal@gmail.com"}
            />
            <span className="cursor-pointer peer-focus:text-white transition duration-200">
              Email
            </span>
            <FaEnvelope className="absolute top-[35px] left-[14px] peer-focus:text-yellow-500" />
          </label>
          <label
            htmlFor="loginPassword"
            className="flex flex-col-reverse gap-1 relative text-sm mb-3"
          >
            {errors.loginPassword?.message && (
              <span className="text-red-500">
                {errors.loginPassword.message.toString()}
              </span>
            )}
            <input
              className={`bg-transparent border-2 ${
                errors.loginPassword?.message
                  ? "border-[#ff2020] focus:border-[#ff2020]"
                  : "border-white/40 focus:border-white/80"
              }  pl-10 pr-4 py-[6px] focus:outline-none text-white placeholder:text-white/40  peer transition 
              duration-200 w-full disabled:cursor-not-allowed`}
              id="loginPassword"
              type="password"
              placeholder="Enter Your Password"
              {...register("loginPassword", {
                required: "This field is required" as unknown as boolean,
              })}
              disabled={isLoading}
              defaultValue={"admin123"}
            />
            <span className="cursor-pointer peer-focus:text-white transition duration-200">
              Password
            </span>
            <FaLock className="absolute top-[35px] left-[14px] peer-focus:text-yellow-500" />
          </label>
          <button
            className="px-4 mt-8 py-2 transition duration-300 bg-yellow-500 text-black font-semibold text-base
          hover:bg-yellow-200 disabled:cursor-not-allowed"
            disabled={isLoading}
          >
            {isLoading ? <MiniSpinner /> : "Log In"}
          </button>
          <div className="flex flex-row justify-between">
            <Link
                to="/signup"
                className="transition duration-300 hover:underline text-sm mt-3"
            >
              Don't have an account? <span className="text-yellow-500">Sign up</span>
            </Link>

            <Link
                to="/forgot-password"
                className="transition duration-300 hover:underline text-sm mt-3 ml-3"
            >
              Forgot Password? <span className="text-yellow-500">Reset Password</span>
            </Link>
          </div>

        </form>
      </motion.div>
    </div>
  );
};
