import { useCallback, useEffect } from "react";

export const useClickOutside = (
  dropdownRef: React.RefObject<HTMLDivElement>,
  callBack: () => void
) => {
  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        callBack();
      }
    },
    [callBack, dropdownRef]
  );

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [handleClickOutside]);
};
