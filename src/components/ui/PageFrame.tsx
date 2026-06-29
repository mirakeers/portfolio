import { motion, useIsPresent, type Variants } from "motion/react";
import type { ComponentProps } from "react";
import type { PageTransition } from "../../types";

type PageFrameProps = {
  pageTransition?: PageTransition;
  exitScrollY?: number;
  layer?: "base" | "overlay";
} & ComponentProps<typeof motion.main>;

const variants: Record<PageTransition, Variants> = {
  fade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  },
  slideFromRight: {
    initial: { x: "100%" },
    animate: { x: 0 },
    exit: { x: "100%" },
  },
};

const layerClasses = {
  base: "z-0",
  overlay: "z-10",
};

export const PageFrame = ({
  pageTransition = "fade",
  exitScrollY = 0,
  layer = "base",
  className = "",
  style,
  children,
  ...props
}: PageFrameProps) => {
  const isPresent = useIsPresent();
  const y = isPresent ? 0 : -exitScrollY;

  return (
    <motion.main
      className={`
        relative col-start-1 row-start-1 bg-bg-page containerPadding 
        flex flex-col gap-8 sm:gap-12 md:gap-16 pt-8
        ${layerClasses[layer]}
        ${className}
      `}
      variants={variants[pageTransition]}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.5, ease: "easeInOut" }}
      style={{ y, ...style }}
      {...props}
    >
      {children}
    </motion.main>
  );
};
