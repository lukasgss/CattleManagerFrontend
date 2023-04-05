import React, { useContext } from "react";
import { RiDashboardFill } from "react-icons/ri";
import { CiLogout } from "react-icons/ci";
import { SlSettings } from "react-icons/sl";
import { GiCow, GiFullMetalBucketHandle } from "react-icons/gi";
import { TbVaccine } from "react-icons/tb";
import { CgProfile } from "react-icons/cg";
import { SiHappycow } from "react-icons/si";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext/authContext";

import "../index.scss";
import { NavRoute, UserRoute } from "../types";

type NavRoutesProps = {
  open: boolean;
};

const SidebarRoutes = ({ open }: NavRoutesProps) => {
  const currentRoute = useLocation().pathname;
  const { handleLogout } = useContext(AuthContext);

  const navRoutes: NavRoute[] = [
    {
      text: "Dashboard",
      link: "/dashboard",
      active: currentRoute === "/dashboard",
      Icon: RiDashboardFill,
    },

    {
      text: "Vacas",
      link: "/vacas",
      active: currentRoute === "/vacas",
      Icon: GiCow,
    },
    {
      text: "Leite",
      link: "/producoes-leite",
      active: currentRoute === "/producoes-leite",
      Icon: GiFullMetalBucketHandle,
    },
    {
      text: "Vacinações",
      link: "/vacinacoes",
      active: currentRoute === "/vacinacoes",
      Icon: TbVaccine,
    },
    {
      text: "Prenhez",
      link: "/prenhez",
      active: currentRoute === "/prenhez",
      Icon: SiHappycow,
    },
  ];

  const userRelatedRoutes: UserRoute[] = [
    {
      text: "Perfil",
      link: "/perfil",
      active: currentRoute === "/perfil",
      Icon: CgProfile,
    },
    {
      text: "Configurações",
      Icon: SlSettings,
    },
    {
      text: "Sair",
      Icon: CiLogout,
      action: handleLogout,
    },
  ];

  return (
    <div className="fixed flex flex-col justify-between pt-2.5 bg-white h-[calc(100vh-185px)] md:h-[calc(100vh-200px)] w-[inherit]">
      <div>
        {navRoutes.map((Route) => (
          <div className="mx-5" key={Route.text}>
            <Link
              to={Route.link}
              onClick={Route.action ?? undefined}
              title={Route.text}
              className={`navbarRoute ${
                Route.active ? "activeNavbarRoute" : ""
              }`}
            >
              <Route.Icon className="w-6 h-6" />
              {open ? <span>{Route.text}</span> : null}
            </Link>
          </div>
        ))}
      </div>
      <div>
        {userRelatedRoutes.map((Route) => (
          <div className="mx-5" key={Route.text}>
            {Route.link ? (
              <Link
                to={Route.link}
                title={Route.text}
                className={`navbarRoute ${
                  Route.active ? "activeNavbarRoute" : ""
                }`}
              >
                <Route.Icon className="w-6 h-6" />
                {open ? <span>{Route.text}</span> : null}
              </Link>
            ) : (
              <button
                type="button"
                aria-label="opcao barra de navegação"
                title={Route.text}
                onClick={Route.action}
                className={`navbarRoute ${
                  Route.active ? "activeNavbarRoute" : ""
                }`}
              >
                <span>
                  <Route.Icon className="w-6 h-6" />
                </span>
                {open ? <span>{Route.text}</span> : null}
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SidebarRoutes;
