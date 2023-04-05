import { IconType } from "react-icons";

export type NavRoute = {
  text: string;
  link: string;
  active: boolean;
  Icon: IconType;
  action?: () => void;
};

export type UserRoute = {
  text: string;
  Icon: IconType;
  active?: boolean;
  link?: string;
  action?: () => void;
};
