import React, { useContext, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link, useLocation } from "react-router-dom";
import { IoMdNotificationsOutline } from "react-icons/io";
import { GoMail } from "react-icons/go";
import { AuthContext } from "../../../contexts/AuthContext/authContext";

import defaultProfilePicture from "../../../assets/img/defaultProfilePicture.webp";
import { GetAmountOfMessageNotifications } from "../../../services/Notifications";
import { nonAuthenticatedRoutes } from "./nonAuthenticatedRoutes";
import AmountOfNotifications from "./AmountOfNotifications";

const NavbarRoutes = () => {
  const { authenticated, userData } = useContext(AuthContext);

  const url = useLocation().pathname;

  const {
    data: requestData,
    isSuccess,
    refetch,
  } = useQuery({
    queryKey: ["notificationAmount"],
    queryFn: GetAmountOfMessageNotifications,
  });

  useEffect(() => {
    refetch();
  }, [url]);

  return (
    <div className="flex gap-7">
      {authenticated ? (
        <>
          <button type="button" aria-label="notificações" title="Notificações">
            <IoMdNotificationsOutline className="w-6 h-6 hover:brightness-150" />
          </button>
          <button type="button" aria-label="mensagens" title="Mensagens">
            <div className="relative">
              <GoMail className="w-6 h-6 hover:brighness-150" />
              <AmountOfNotifications
                isSuccess={isSuccess}
                notificationAmount={requestData?.data.amount}
              />
            </div>
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
