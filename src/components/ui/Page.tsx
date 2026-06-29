import { motion, useIsPresent } from "motion/react";
import { useEffect, type ComponentProps } from "react";
import type { PageTransition } from "../../types";

type PageProps = {
  name: string;
  pageTransition?: PageTransition;
  animateOutOffset?: number;
  onPageLoad?: () => void;
  layer?: "base" | "overlay";
} & ComponentProps<typeof motion.main>;

const layerClasses = {
  base: "z-20",
  overlay: "z-50",
};

export const Page = ({
  name,
  pageTransition = "fade",
  layer = "base",
  className = "",
  children,
  animateOutOffset = 0,
  onPageLoad,
  ...props
}: PageProps) => {
  const isPresent = useIsPresent();
  useEffect(() => {
    if (onPageLoad) onPageLoad();
  }, [onPageLoad]);

  const initial =
    pageTransition === "fade" ? { opacity: 0 } : { opacity: 1, x: "100%" };
  const animate =
    pageTransition === "fade" ? { opacity: 1 } : { opacity: 1, x: 0 };
  const exit =
    pageTransition === "fade" ? { opacity: 0 } : { opacity: 1, x: "100%" };

  return (
    <motion.main
      id={name}
      className={`
        bg-bg-page containerPadding flex flex-col gap-8 sm:gap-12 md:gap-16 py-8 md:py-16
        ${isPresent ? "relative" : "absolute inset-x-0"}
        ${layerClasses[layer]}
        ${className}
      `}
      initial={initial}
      animate={animate}
      exit={exit}
      style={{ translateY: isPresent ? 0 : -animateOutOffset }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      {...props}
    >
      {children}
    </motion.main>
  );
};
