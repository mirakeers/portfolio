import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export const ScrollTo = ({ top = 0 }: { top: number }) => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top, behavior: "instant" });
  }, [pathname]);

  return null;
};
