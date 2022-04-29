import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./ProfileButton.css";

const ProfileButton = () => {
  const { pathname } = useLocation();
  return (
    <Link to="/profile" className={`${
      pathname === "/" ? "profile-btn__main" : "profile-btn"} hover-link
      `}>
      Аккаунт
      <button className="profile-btn__button" />
    </Link>
  );
};

export default ProfileButton;