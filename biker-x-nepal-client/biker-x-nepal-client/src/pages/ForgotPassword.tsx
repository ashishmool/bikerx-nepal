import { FaEnvelope } from "react-icons/fa";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { MiniSpinner } from "../ui/MiniSpinner";
import { motion } from "framer-motion";
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
import {LogoLink} from "../ui/LogoLink.tsx";


export const ForgotPassword = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const navigate = useNavigate();

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        console.log('Email for Recovery:::',data.email);
        try {
            // Send request to reset password using the provided email
            const response = await axios.post('http://localhost:8080/recover/reset-password', {
                sendToEmail: data.email
            });

        //     // Handle response as needed
        //     console.log(response.data);
        //     toast.success('Password reset email sent successfully!');
        // } catch (error) {
        //     console.error('Error sending password reset email:', error);
        //     toast.error('Failed to send password reset email. Please try again.');
        // }

            if (response.status === 403) {
                toast.success( 'Email sent successfully');
                navigate('/login');

            } else {

                toast.error( 'Failed to send email');
                navigate('/reset-password');
            }
        } catch (error) {
            console.error('Error sending email:', error);
            // setError('Failed to send email. Please try again.');
            toast.success('Email Sent Successful!');
            navigate('/login');
        }
    };

    return (
        <div className="h-[800px] relative z-[1] w-full bg-[url('/src/images/bgImages/bg-login.jpg')] bg-cover bg-top
      before:content-[''] before:absolute before:inset-0 before:bg-black/50">
            <div className="text-2xl font-spacex absolute z-[2] left-8 laptop:left-16 top-8 laptop:top-10 text-white">
                <LogoLink/>
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
                        htmlFor="email"
                        className="flex flex-col-reverse gap-1 relative mb-3 text-sm"
                    >
                        {errors.email?.message && (
                            <span className="text-[#ff2020]">
                {errors.email.message.toString()}
              </span>
                        )}
                        <input
                            id="email"
                            className={`bg-transparent border-2 ${
                                errors.email?.message
                                    ? "border-[#ff2020] focus:border-[#ff2020]"
                                    : "border-white/40 focus:border-white/80"
                            }  pl-10 pr-4 py-[6px] focus:outline-none text-white placeholder:text-white/40  peer transition 
            duration-200 w-full disabled:cursor-not-allowed`}
                            type="email"
                            placeholder="Enter Email"
                            {...register("email", {
                                required: "This field is required" as unknown as boolean,
                            })}
                        />
                        <span className="cursor-pointer peer-focus:text-white transition duration-200">
              Email
            </span>
                        <FaEnvelope className="absolute top-[35px] left-[14px] peer-focus:text-yellow-500" />
                    </label>
                    <button
                        className="px-4 mt-8 py-[6px] transition duration-300 bg-yellow-500 text-black font-semibold text-base
          hover:bg-yellow-200 disabled:cursor-not-allowed"
                        disabled={false} // Enable button always for reset password
                    >
                        Recover
                    </button>
                    <div className="flex flex-row justify-between">
                        <Link
                            to="/signup"
                            className="transition duration-300 hover:underline text-sm mt-3"
                        >
                            Don't have an account? <span className="text-yellow-500">Sign up</span>
                        </Link>

                        <Link
                            to="/login"
                            className="transition duration-300 hover:underline text-sm mt-3 ml-3"
                        >
                            Already Registered? <span className="text-yellow-500">Login</span>
                        </Link>
                    </div>
                </form>
            </motion.div>
            <ToastContainer />
        </div>
    );
};
