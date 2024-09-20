import { useState } from "react";
import { FaBars } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { NavlinkTopbar } from "../../ui/NavlinkTopbar";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { LogoLink } from "../../ui/LogoLink";
import { LogoutOutlined } from "@mui/icons-material";

export const Topbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const accessToken = localStorage.getItem("accessToken");
  const role = localStorage.getItem("role");

  const isLoggedIn = accessToken !== null;
  const { name, surname } = useSelector((store: RootState) => store.auth);

  const handleLogout = () => {
    localStorage.clear();
    console.log('Token Destroyed::', localStorage.getItem("accessToken"));
    navigate('/'); // Use navigate to redirect
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
              <NavlinkTopbar route="rides">Rides</NavlinkTopbar>
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
                      className="flex items-center gap-3 group mb-4 cursor-auto"
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
                onClick={() => setIsMenuOpen(!isMenuOpen)} // Toggle menu state
            >
              <FaBars />
            </button>
          </li>
        </ul>

        {/* Mobile Menu */}
        {isMenuOpen && (
            <div className={`block laptop:hidden bg-black bg-opacity-40 p-4 ${location.pathname === '/' ? 'mt-0' : 'mt-28'} mb-6 flex flex-wrap gap-3`}>
              <NavlinkTopbar route="/" className="text-center py-2 flex-grow-0">Home</NavlinkTopbar>
              {role === "Admin" && (
                  <NavlinkTopbar route="/dashboard/home" className="text-center py-2 flex-grow-0">Dashboard</NavlinkTopbar>
              )}
              <NavlinkTopbar route="tours" className="text-center py-2 flex-grow-0">Tours</NavlinkTopbar>
              <NavlinkTopbar route="rides" className="text-center py-2 flex-grow-0">Rides</NavlinkTopbar>
              <NavlinkTopbar route="about" className="text-center py-2 flex-grow-0">About</NavlinkTopbar>
              {role === "Customer" && (
                  <NavlinkTopbar route={`/my-tour/${userId}`} className="text-center py-2 flex-grow-0">My Bookings</NavlinkTopbar>
              )}
              {!isLoggedIn ? (
                  <div className="flex flex-col gap-2 w-full">
                    <NavlinkTopbar route="login" className="text-center py-2 flex-grow-0">Log In</NavlinkTopbar>
                    <Link to="signup" className="border-2 py-1 px-6 text-center flex-grow-0">
                      Sign Up
                    </Link>
                  </div>
              ) : (
                  <span className="flex items-center gap-1 cursor-pointer text-center py-2 flex-grow-0" onClick={handleLogout}>
            <LogoutOutlined />
            Logout
          </span>
              )}
            </div>
        )}
      </div>
  );
};
