import type { ComponentProps } from "react";

type HeaderProps = ComponentProps<"div">;

export const Header = ({ className, ...props }: HeaderProps) => {
  return (
    <header
      className={`bg-bg-page relative z-100 containerPadding py-4 flex gap-4 items-center justify-between ${className}`}
      {...props}
    >
      <h1 className={`grow flex flex-col gap-2 leading-6 sm:leading-8`}>
        {/*         //TODO - add link */}
        <span className="text-lg/4 text-interaction">@mirakeers</span>
        <span>creative</span>
        <span>portfolio</span>
      </h1>
    </header>
  );
};
