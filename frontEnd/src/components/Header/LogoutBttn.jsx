import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/authSlice";
import authService from "../../appwrite/auth";

export default function LogoutBttn() {
  const dispatch = useDispatch();
  const logoutHandle = () => {
    authService.logout().then(() => {
      dispatch(logout());
    });
  };
  return <button onChange={logoutHandle}>logOut</button>;
}
