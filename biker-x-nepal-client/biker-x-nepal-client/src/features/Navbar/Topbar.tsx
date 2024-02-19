import { useState } from "react";
import { FaBars, FaChevronDown, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import { NavlinkTopbar } from "../../ui/NavlinkTopbar";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { LogoLink } from "../../ui/LogoLink";
import { logout } from "../Auth/authSlice";
import { ClipLoader } from "react-spinners";
import {FaArrowRightFromBracket} from "react-icons/fa6";
import {LogoutOutlined} from "@mui/icons-material";

export const Topbar = () => {
  const dispatch = useDispatch();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const accessToken = localStorage.getItem("accessToken");
  const role = localStorage.getItem("role");

  const isLoggedIn = accessToken !== null;
  const { name, surname, isLoading } = useSelector(
      (store: RootState) => store.auth
  );

  const handleLogout = () => {
    localStorage.clear();
    console.log('Token Destroyed::',localStorage.getItem("accessToken"));
    window.location.href = '/';

  };
  const userId = localStorage.getItem("userId");

  return (
      <div className="bg-transparent absolute text-[--main-font-color] z-[2] w-full">
        <ul className="flex w-full justify-between px-[10%] h-32 items-center">
          <li className="flex tablet:w-[60%] full:w-[50%] justify-between items-center">
            <LogoLink />
            <div className="hidden laptop:flex gap-4 full:gap-8 text-lg">
              <NavlinkTopbar route="/">Home</NavlinkTopbar>
              {role === "Admin" && (
                  <NavlinkTopbar route="/dashboard/home">Dashboard</NavlinkTopbar>
              )}
              <NavlinkTopbar route="tours">Tours</NavlinkTopbar>
              <NavlinkTopbar route="about">About</NavlinkTopbar>
              {role === "Customer" && (
                  <NavlinkTopbar route={`/my-tour/${userId}`}>My Bookings</NavlinkTopbar>

              )}
            </div>
          </li>
          <li className="hidden laptop:flex gap-4 full:gap-8 text-lg items-center">
            {!isLoggedIn ? (
                <div className="laptop:flex gap-4 full:gap-8 items-center">
                  <NavlinkTopbar route="login">Log In</NavlinkTopbar>
                  <Link
                      to="signup"
                      className="transition duration-200 border-2 py-1 px-6 hover:bg-[--main-font-color] border-[--secundary-color] hover:text-[--third-color]"
                  >
                    Sign Up
                  </Link>
                </div>
            ) : (
                <div className="relative h-12">
                  <button
                      className="flex items-center gap-3 group mb-4 cursor-auto "
                      onMouseEnter={() => setIsProfileOpen(true)}
                      onMouseLeave={() => setIsProfileOpen(false)}
                  >
  <span className="px-3 py-2 rounded-full bg-[#3f3f3fdc]">
    {localStorage.getItem("email")}
    {surname.slice(0, 1).toLocaleUpperCase()}
  </span>
                    <span onClick={handleLogout} className="flex items-center gap-1 cursor-pointer focus:outline-none">
    <LogoutOutlined />
    Logout
  </span>
                  </button>


                </div>
            )}
          </li>
          <li className="block laptop:hidden scale-x-[2] scale-y-[1.5] cursor-pointer">
            <button
                className="transition duration-300 hover:rotate-90"
            >
              <FaBars />
            </button>
          </li>
        </ul>
      </div>
  );
};
