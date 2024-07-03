import { FaLock } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useEffect } from "react";
import { MiniSpinner } from "../ui/MiniSpinner";
import { motion } from "framer-motion";
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface ResetPasswordFormData {
    password: string;
    confirmPassword: string;
}

export const ResetPassword = () => {
    const {
        register,
        handleSubmit,
        getValues,
        formState: { errors },
        reset,
    } = useForm<ResetPasswordFormData>();

    const navigate = useNavigate();

    useEffect(() => {
        // Reset form on component mount
        reset();
    }, []);

    const onSubmit: SubmitHandler<ResetPasswordFormData> = async (data) => {
        try {
            // Extract token from the URL
            const urlParams = new URLSearchParams(window.location.search);
            const token = urlParams.get('token');

            if (token) {
                // Use the extracted token in the API request
                const response = await axios.post(
                    'http://13.48.249.115:8080/system-user/new-password',
                    { token, newPassword: data.password }
                );

                console.log(response.data);
                navigate('/login');
            } else {
                toast.error('Invalid reset token.');
            }
        } catch (error) {
            console.error('Error setting new password:', error);
            toast.error('Error setting new password.');
        }
    };

    return (
        <div className="h-[800px] relative z-[1] w-full bg-[url('/src/images/bgImages/bg-login.jpg')] bg-cover bg-top
      before:content-[''] before:absolute before:inset-0 before:bg-black/50">
            <div className="text-2xl font-spacex absolute z-[2] left-8 laptop:left-16 top-8 laptop:top-10 text-white">
                <Link to="/">BikerX Nepal</Link>
            </div>
            <motion.div
                className="w-full laptop:w-[490px] bg-black laptop:bg-black/90 text-white absolute z-[1] laptop:mt-24
          px-8 laptop:py-8 pb-16 pt-28 flex flex-col justify-between left-[50%] translate-x-[-50%]"
                initial={{ opacity: 0, translateX: "-100%" }}
                animate={{ opacity: 1, translateX: "-50%" }}
                transition={{ duration: 0.5 }}
            >
                <div className=" flex flex-col gap-2 mb-10 text-sm text-white/40">
                    <span>RESET PASSWORD</span>
                    <h1 className="font-semibold text-3xl text-white">
                        Reset Your Password
                    </h1>
                </div>
                <form
                    className="flex flex-col justify-between text-white/40"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <label
                        htmlFor="password"
                        className="flex flex-col-reverse gap-1 relative text-sm mb-3"
                    >
                        {errors.password && (
                            <span className="text-[#ff2020]">
                                {errors.password.message}
                            </span>
                        )}
                        <input
                            id="password"
                            className={`bg-transparent border-2 ${
                                errors.password
                                    ? "border-[#ff2020] focus:border-[#ff2020]"
                                    : "border-white/40 focus:border-white/80"
                            }  pl-10 pr-4 py-[6px] focus:outline-none text-white placeholder:text-white/40  peer transition 
            duration-200 w-full disabled:cursor-not-allowed`}
                            type="password"
                            placeholder="Enter New Password"
                            {...register("password", {
                                required: "This field is required",
                                minLength: {
                                    value: 8,
                                    message: "Password must have at least 8 characters",
                                },
                                maxLength: {
                                    value: 16,
                                    message: "Password must have maximum 16 characters",
                                },
                            })}
                        />
                        <span className="cursor-pointer peer-focus:text-white transition duration-200">
              New Password
            </span>
                        <FaLock className="absolute top-[35px] left-[14px] peer-focus:text-yellow-500" />
                    </label>
                    <label
                        htmlFor="confirmPassword"
                        className="flex flex-col-reverse gap-1 relative text-sm mb-3"
                    >
                        {errors.confirmPassword && (
                            <span className="text-[#ff2020]">
                                {errors.confirmPassword.message}
                            </span>
                        )}
                        <input
                            id="confirmPassword"
                            className={`bg-transparent border-2 ${
                                errors.confirmPassword
                                    ? "border-[#ff2020] focus:border-[#ff2020]"
                                    : "border-white/40 focus:border-white/80"
                            }  pl-10 pr-4 py-[6px] focus:outline-none text-white placeholder:text-white/40  peer transition 
            duration-200 w-full disabled:cursor-not-allowed`}
                            type="password"
                            placeholder="Confirm New Password"
                            {...register("confirmPassword", {
                                required: "This field is required",
                                validate: value =>
                                    value === getValues().password || "Passwords do not match"
                            })}
                        />
                        <span className="cursor-pointer peer-focus:text-white transition duration-200">
              Confirm New Password
            </span>
                        <FaLock className="absolute top-[35px] left-[14px] peer-focus:text-yellow-500" />
                    </label>
                    <button
                        className="px-4 mt-8 py-[6px] transition duration-300 bg-yellow-500 text-black font-semibold text-base
            hover:bg-yellow-200 disabled:cursor-not-allowed"
                        disabled={false} // Enable button always for reset password
                    >
                        Reset Password
                    </button>
                </form>
            </motion.div>
            <ToastContainer />
        </div>
    );
};
