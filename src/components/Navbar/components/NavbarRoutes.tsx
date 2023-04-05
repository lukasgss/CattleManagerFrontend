import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { IoMdNotificationsOutline } from "react-icons/io";
import { GoMail } from "react-icons/go";
import { AuthContext } from "../../../contexts/AuthContext/authContext";

import defaultProfilePicture from "../../../assets/img/defaultProfilePicture.webp";

const NavbarRoutes = () => {
  const { authenticated, userData } = useContext(AuthContext);

  const nonAuthenticatedRoutes = [
    {
      text: "Início",
      link: "/",
    },
    {
      text: "Cadastro",
      link: "/cadastro",
    },
    {
      text: "Login",
      link: "/login",
    },
  ];

  return (
    <div className="flex gap-7">
      {authenticated ? (
        <>
          <button type="button" aria-label="notificações" title="Notificações">
            <IoMdNotificationsOutline className="w-6 h-6 hover:brightness-150" />
          </button>
          <button type="button" aria-label="mensagens" title="Mensagens">
            <GoMail className="w-6 h-6 hover:brighness-150" />
          </button>
          <Link
            to="/perfil"
            title={`${userData?.firstName} ${userData?.lastName}`}
          >
            <img src={defaultProfilePicture} alt="" className="w-7" />
          </Link>
        </>
      ) : (
        <>
          {nonAuthenticatedRoutes.map((route) => (
            <Link to={route.link} key={route.text}>
              {route.text}
            </Link>
          ))}
        </>
      )}
    </div>
  );
};

export default NavbarRoutes;
