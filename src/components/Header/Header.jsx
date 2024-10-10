import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import LogoutBttn from "./LogoutBttn";

export default function Header() {
  const navItem = [
    {
      name: "Home",
      slug: "/",
      active: true,
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
    },
    {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
    },
  ];
  const navigate = useNavigate();
  const authStatus = useSelector((state) => {
    state.auth.status;
  });
  return (
    <header className="bg-white flex justify-between mt-2 h-12 items-center">
      <div className="text-[#F06449] font-bold text-xl ml-8 mb-1  ">Logo</div>
      <ul className="flex space-x-20 font-semibold">
        {navItem.map((item) =>
          item.active ? (
            <li key={item.name}>
              <NavLink
                className={({ isActive }) =>
                  `block py-2 pr-4 pl-3 duration-200 ${
                    isActive ? "text-orange-700" : "text-gray-700"
                  } border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-[#F06449] lg:p-0`
                }
              >
                <button key={tab} onClick={() => navigate(item.slug)}>
                  {item.name}
                </button>
              </NavLink>
            </li>
          ) : null
        )}
        {authStatus && (
          <li>
            <LogoutBttn />
          </li>
        )}
      </ul>
    </header>
  );
}
