import React, { useEffect } from "react";

type DetectClickOutsideProps = {
  children: React.ReactNode;
  onClickOutside: (event: MouseEvent) => void;
  elementRef: React.MutableRefObject<any>;
  otherAllowedElementRef?: React.MutableRefObject<any>;
};

const DetectClickOutside = ({
  children,
  onClickOutside,
  elementRef,
  otherAllowedElementRef,
}: DetectClickOutsideProps) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        (elementRef.current && !elementRef.current.contains(event.target)) ||
        (otherAllowedElementRef?.current &&
          !elementRef.current.contains(event.target))
      ) {
        onClickOutside(event);
      }
    };
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, [onClickOutside]);

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <>{children}</>;
};

export default DetectClickOutside;
