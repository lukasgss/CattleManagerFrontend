import React, { useEffect } from "react";

type DetectClickOutsideProps = {
  children: React.ReactNode;
  onClickOutside: (event: Event) => void;
  elementRef: React.MutableRefObject<any>;
  otherAllowedElementRef?: React.MutableRefObject<any>;
  hideOnEscape?: (event: Event) => void;
};

const DetectClickOutside = ({
  children,
  onClickOutside,
  elementRef,
  otherAllowedElementRef,
  hideOnEscape,
}: DetectClickOutsideProps) => {
  useEffect(() => {
    const handleClickOutside = (event: Event) => {
      if (
        (elementRef.current && !elementRef.current.contains(event.target)) ||
        (otherAllowedElementRef?.current &&
          !elementRef.current.contains(event.target))
      ) {
        onClickOutside(event);
      }
    };
    const handleEscapeKeyPress = (event: KeyboardEvent) => {
      if (event.key === "Escape" && hideOnEscape) {
        hideOnEscape(event);
        if (document.activeElement instanceof HTMLElement) {
          document.activeElement.blur();
        }
      }
    };

    document.addEventListener("click", handleClickOutside, true);
    if (hideOnEscape) {
      document.addEventListener("keydown", handleEscapeKeyPress, true);
    }
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, [onClickOutside]);

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <>{children}</>;
};

export default DetectClickOutside;
