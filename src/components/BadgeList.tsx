import type { ComponentProps } from "react";
import { Badge } from "./ui/Badge";
import type { Category } from "../types";

type BadgeListProps = {
  items?: string[];
  size?: "md" | "lg";
  categories?: Category[];
} & ComponentProps<"ul">;

export const BadgeList = ({
  items = [],
  size,
  categories = [],
  className = "",
  children,
  ...props
}: BadgeListProps) => (
  <ul className={`flex gap-2 flex-wrap ${className}`} {...props}>
    {children}
    {categories.map(({ id, name, color, icon }) => (
      <Badge key={id} as="li" color={color} icon={icon} size={size}>
        {name}
      </Badge>
    ))}
    {items.map((item, index) => (
      <Badge key={index} as="li" size={size}>
        {item}
      </Badge>
    ))}
  </ul>
);
