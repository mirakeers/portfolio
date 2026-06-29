import { useRef, type ComponentProps } from "react";
import type { Project } from "../types";
import { motion, useScroll, useTransform } from "motion/react";
import { Badge } from "./ui/Badge";
import { Figure } from "./ui/Figure";
import { BadgeList } from "./BadgeList";
import { Icon } from "./ui/Icon";
import { Link } from "react-router-dom";

type ProjectListItemProps = { onOpenProject?: () => void } & Project &
  ComponentProps<typeof motion.li>;

export const ProjectListItem = ({
  id,
  name,
  categories,
  intro,
  year,
  poster,
  className,
  onOpenProject,
  ...props
}: ProjectListItemProps) => {
  const contentRef = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: contentRef,
    offset: ["start end", "start start"],
    trackContentSize: true,
  });

  const inputRange = [0, 0.15, 0.85, 1];

  const opacity = useTransform(scrollYProgress, inputRange, [0.6, 1, 1, 0.6]);
  const scale = useTransform(scrollYProgress, inputRange, [0.85, 1, 1, 0.85]);
  const linkProps = {
    to: `/${id}`,
    state: { pageTransition: "slideFromRight" },
    onClick: () => onOpenProject && onOpenProject(),
  };
  return (
    <motion.li
      id={id}
      className={`flex flex-wrap gap-8 relative ${className}`}
      style={{ opacity, scale }}
      {...props}
    >
      <Link {...linkProps} className="flex-[0_0_100%] md:flex-1">
        <Figure
          className="aspect-4/3"
          alt={poster?.alt}
          src={poster ? `/assets/projects/${id}/${poster.src}` : undefined}
        />
      </Link>

      <div
        className="flex-[0_0_100%] md:flex-1 flex flex-col items-start gap-3 md:gap-8"
        id={`scrollReference-${id}`}
        ref={contentRef}
      >
        <hgroup className="flex flex-col gap-3">
          <h3>{name}</h3>
          <BadgeList categories={categories}>
            {year && (
              <Badge as="li" icon="m10:calendar-today-outline-rounded">
                {year}
              </Badge>
            )}
          </BadgeList>
        </hgroup>
        <p className="paragraph">{intro}</p>
        <Link {...linkProps} className="buttonText">
          View project
          <Icon name="m10:arrow-right-alt-rounded" />
        </Link>
      </div>
    </motion.li>
  );
};
