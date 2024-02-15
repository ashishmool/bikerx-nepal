import { useEffect } from "react";
import { RootState } from "../store";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";

export const ProfileLayout = () => {
  const { isLoggedIn, isLoading } = useSelector((store: RootState) => store.auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (!isLoggedIn && !isLoading) {
      navigate("/login");
    }
  },[isLoggedIn]);
  return <Outlet />;
};
