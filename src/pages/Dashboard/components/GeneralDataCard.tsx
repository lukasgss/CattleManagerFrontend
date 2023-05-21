import React from "react";
import { IconType } from "react-icons";

type GeneralDataCard = {
  cardBackgroundColor: string;
  iconBackgroundColor: string;
  Icon: IconType;
  value: string | number;
  title: string;
};

export default function GeneralDataCard({
  cardBackgroundColor,
  iconBackgroundColor,
  Icon,
  value,
  title,
}: GeneralDataCard) {
  return (
    <div
      className="flex flex-col gap-4 shadow rounded-md bg-[#d3ffe6] text-lg w-full p-3"
      style={{ backgroundColor: cardBackgroundColor }}
    >
      <div className="w-fit p-2 rounded-full" style={{ backgroundColor: iconBackgroundColor }}>
        <Icon className="w-8 h-8 rounded-full text-white" />
      </div>
      <span className="text-2xl poppins-semi-bold">{value}</span>
      <span>{title}</span>
    </div>
  );
}
