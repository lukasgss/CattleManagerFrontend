import React from "react";

type AmountOfNotificationsProps = {
  notificationAmount: number | undefined;
  isSuccess: boolean;
};

const AmountOfNotifications = ({
  notificationAmount,
  isSuccess,
}: AmountOfNotificationsProps) => {
  return isSuccess && notificationAmount && notificationAmount > 0 ? (
    <div className="absolute w-4 h-4 top-[-5px] right-[-5px] rounded-full bg-[var(--primary-pink)] flex items-center justify-center">
      <span className="text-white text-xs">{notificationAmount}</span>
    </div>
  ) : null;
};

export default AmountOfNotifications;
