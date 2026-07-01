import type { ReactNode } from "react";
import { Icon } from "./Icon";

const COLOR_CSS: Record<string, string> = {
  gray: "bg-gray-900 text-gray-400",
  teal: "bg-teal-950 text-teal-300",
  blue: "bg-blue-950 text-blue-300",
  orange: "bg-orange-950 text-orange-300",
  pink: "bg-pink-950 text-pink-300",
  lime: "bg-lime-950 text-lime-300",
};

export type BadgeProps = {
  color?: string;
  size?: "md" | "lg";
  className?: string;
  children?: ReactNode;
  icon?: string;
  onClick?: () => void;
  as?: "span" | "li";
};

export const Badge = ({
  color = "gray",
  size = "md",
  icon,
  className,
  as = "span",
  children,
  ...props
}: BadgeProps) => {
  const Component = as;
  const sizeCss =
    size === "md"
      ? "gap-1.5 px-1.5 py-1 text-xs/tight"
      : "gap-1.5 px-1.5 py-1 text-xs/tight sm:gap-2 sm:px-2 sm:py-1 sm:text-base/tight";
  const badgeCss = `transition-colors font-extrabold uppercase tracking-wide inline-flex items-center rounded whitespace-nowrap ${sizeCss} ${COLOR_CSS[color]} ${className}`;
  return (
    <Component className={badgeCss} {...props}>
      {icon && <Icon name={icon} size={20} />}
      {children}
    </Component>
  );
};
