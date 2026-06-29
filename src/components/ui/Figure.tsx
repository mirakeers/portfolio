import type { ComponentProps } from "react";
import type { Asset } from "../../types";
import { Icon } from "./Icon";
import ReactPlayer from "react-player";
type FigureProps = { projectId?: string } & Partial<Asset> &
  ComponentProps<"figure">;

export const Figure = ({
  projectId,
  type = "img",
  src,
  alt,
  className = "",
  ...props
}: FigureProps) => {
  return (
    <figure
      className={`bg-bg-dark  overflow-hidden rounded flex items-center justify-center ${className}`}
      {...props}
    >
      {src ? (
        type === "img" ? (
          <Image alt={alt} src={src} projectId={projectId} />
        ) : type === "vimeo_video" ? (
          <Video alt={alt} src={src} site="vimeo" />
        ) : (
          <Video alt={alt} src={src} site="youtube" />
        )
      ) : (
        <Placeholder alt={alt} />
      )}
    </figure>
  );
};

const Placeholder = ({ alt }: Partial<FigureProps>) => (
  <div className="flex flex-col items-center justify-around aspect-video w-full gap-2 text-white/30">
    <Icon size="lg" name="m10:image" />
    {alt ?? ""}
  </div>
);
const Image = ({ alt, projectId, src }: Partial<FigureProps>) => (
  <img
    className="h-full w-full object-cover object-center"
    alt={alt ?? ""}
    src={
      projectId
        ? `${import.meta.env.BASE_URL}assets/projects/${projectId}/${src}`
        : `${import.meta.env.BASE_URL}${src}`
    }
  />
);
const Video = ({
  alt,
  src,
  site,
}: Partial<FigureProps> & { site: "youtube" | "vimeo" }) => {
  const fullSrc =
    site === "youtube"
      ? `https://www.youtube.com/watch?v=${src}`
      : `https://player.vimeo.com/video/${src}`;

  return (
    <div className="aspect-video w-full">
      <ReactPlayer
        src={fullSrc}
        title={alt}
        controls={true}
        width="100%"
        height="100%"
      />
    </div>
  );
};
