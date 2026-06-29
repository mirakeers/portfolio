import ViconicIcon from "viconic-react-icons";
type IconProps = {
  name: string;
  size?: "sm" | "md" | "lg";
  className?: string;
};

export const Icon = ({ name, size = "md", className = "" }: IconProps) => (
  <ViconicIcon
    className={`${size === "lg" ? "!text-3xl" : size === "md" ? "!text-2xl" : "!text-xl"} ${className}`}
    name={name}
  />
);
