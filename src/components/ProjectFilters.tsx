import { type ComponentProps } from "react";
import { Icon } from "./ui/Icon";
import type { Category as TypeCategory } from "../types";
import { motion } from "motion/react";

type ProjectFiltersProps = {
  categories: TypeCategory[];
  activeCategory: string | undefined;
  totalEntries: number;
  onCategoryChange: (id: string | undefined) => void;
} & ComponentProps<typeof motion.div>;
export const ProjectFilters = ({
  categories,
  className = "",
  totalEntries,
  activeCategory,
  onCategoryChange,
  ...props
}: ProjectFiltersProps) => {
  return (
    <motion.div
      className={`containerPadding basis-full self-stretch  flex items-center shrink-0 !pr-0 overflow-auto ${className}`}
      initial={{ scaleY: 0 }}
      animate={{ scaleY: 1 }}
      exit={{ scaleY: 0 }}
      {...props}
    >
      <ul className="flex gap-4 md:gap-8 items-center">
        <Category
          name="All"
          id="all"
          icon="m10:format-list-bulleted"
          count={totalEntries}
          isActive={!activeCategory}
          onClick={() => onCategoryChange(undefined)}
        />
        {categories.map((props) => (
          <Category
            {...props}
            isActive={props.id === activeCategory}
            onClick={() => onCategoryChange(props.id)}
          />
        ))}
      </ul>
    </motion.div>
  );
};
type CategoryProps = TypeCategory & {
  count?: number;
  isActive?: boolean;
  onClick: (id?: string) => void;
} & ComponentProps<"li">;
const Category = ({
  id,
  name,
  icon,
  count,
  isActive = false,
  onClick,
}: CategoryProps) => (
  <li id={id} className="grow-0 shrink-0 max-w-41">
    <button
      className={`
     cursor-pointer transition-colors flex gap-1 items-center text-left uppercase tracking-wide font-bold text-sm/4 hover:text-interaction
      ${isActive ? "text-interaction" : "text-t-light"}
      `}
      onClick={() => onClick(id)}
    >
      <Icon size="lg" name={icon} />
      <span className="inline.block">
        {name} {count !== undefined && <>({count})</>}
      </span>
    </button>
  </li>
);
