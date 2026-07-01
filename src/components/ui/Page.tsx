import {
  motion,
  useIsPresent,
  useMotionValueEvent,
  useScroll,
} from "motion/react";
import { useEffect, useState, type ComponentProps } from "react";
import type { PageTransition } from "../../types";

type PageProps = {
  name: string;
  pageTransition?: PageTransition;
  layer?: "base" | "overlay";
  targetScrollY?: number;
} & ComponentProps<typeof motion.main>;

const layerClasses = {
  base: "z-20",
  overlay: "z-50",
};

export const Page = ({
  name,
  pageTransition = "fade",
  layer = "base",
  targetScrollY,
  className = "",
  children,
  ...props
}: PageProps) => {
  const isPresent = useIsPresent();
  const { scrollY } = useScroll();
  const [finalScrollY, setFinalScrollY] = useState(window.scrollY);
  const [hasScrolled, setHasScrolled] = useState(false);
  useEffect(() => {
    if (hasScrolled || targetScrollY === undefined) return;

    requestAnimationFrame(() => {
      window.scrollTo({
        top: targetScrollY,
        behavior: "instant",
      });
      setHasScrolled(true);
    });
  }, [targetScrollY, hasScrolled]);

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (isPresent) {
      setFinalScrollY(latest);
    }
  });

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
        ${isPresent ? "relative" : "fixed"}
        ${layerClasses[layer]}
        ${className}
      `}
      initial={initial}
      animate={animate}
      exit={exit}
      style={{ translateY: isPresent ? 0 : -finalScrollY }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      {...props}
    >
      {children}
    </motion.main>
  );
};
