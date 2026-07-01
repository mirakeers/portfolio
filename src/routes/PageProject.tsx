import { Link, useParams } from "react-router-dom";
import { Badge } from "../components/ui/Badge";
import type { Project } from "../types";
import { Figure } from "../components/ui/Figure";
import { type ComponentProps } from "react";
import { BadgeList } from "../components/BadgeList";

type PageProjectProps = {
  projects: Project[];
};

export const PageProject = ({ projects }: PageProjectProps) => {
  const { projectId } = useParams();
  const project = projects.find((project) => project.id === projectId);

  if (!project) {
    return (
      <div>
        Project could not be found <Link to="/">Back to overview</Link>
      </div>
    );
  }

  const {
    id,
    name,
    year,
    description,
    details,
    categories,
    tools,
    roles,
    team,
    poster,
    context,
    assets = [],
  } = project;

  return (
    <>
      <title>{`${name} | Portfolio @mirakeers`}</title>

      <h1>{name}</h1>

      <div className="flex flex-col gap-4">
        {year && (
          <Stat title="Created in">
            <Badge size="lg">{year}</Badge>
          </Stat>
        )}

        {context && (
          <Stat title="Context">
            <Badge size="lg">{context}</Badge>
          </Stat>
        )}

        {!!categories?.length && (
          <Stat title="Categories">
            <BadgeList categories={categories} size="lg" />
          </Stat>
        )}

        {!!tools?.length && (
          <Stat title="Tools">
            <BadgeList items={tools} size="lg" />
          </Stat>
        )}

        {!!roles?.length && (
          <Stat title="Role">
            <BadgeList items={roles} size="lg" />
          </Stat>
        )}

        {!!team?.length && (
          <Stat title="Team">
            <BadgeList
              items={team.map((tm) => `${tm.name} (${tm.role})`)}
              size="lg"
            />
          </Stat>
        )}
      </div>

      {/* TODO: ADD ATTRIBUTIONS !!! a list of all the work pieces with correct attribution of the authorship. In case of teamwork the applicant’s responsibilities have to be clearly outlined. */}

      <Paragraph>{description}</Paragraph>

      <Figure alt={poster?.alt} src={poster?.src} projectId={id} />

      {details && <Paragraph>{details}</Paragraph>}

      {assets.map(({ src, ...asset }) => (
        <Figure key={src} src={src} projectId={id} {...asset} />
      ))}
    </>
  );
};

const Stat = ({
  title,
  children,
}: { title: string } & ComponentProps<"div">) => (
  <div className="flex flex-col sm:flex-row gap-2 items-start">
    <h2 className="sm:basis-32 sm:shrink-0">{title}</h2>
    {children}
  </div>
);

const Paragraph = ({ className = "", ...props }: ComponentProps<"p">) => (
  <p className={`paragraph px-2 md:px-8 ${className}`} {...props} />
);
