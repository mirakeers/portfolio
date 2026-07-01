import ViconicIcon from "viconic-react-icons";
type IconProps = {
  name: string;
  size?: number;
  className?: string;
};

export const Icon = ({ name, size = 24, className = "" }: IconProps) => (
  <ViconicIcon className={className} name={name} size={size} />
);
