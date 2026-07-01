import type { RefObject } from "react";
import { ProjectListItem } from "../components/ProjectListItem";
import type { Project } from "../types";

type PageHomeProps = {
  projects: Project[];
  onOpenProject: () => void;
  projectRefs?: RefObject<Record<string, HTMLLIElement | null>>;
};

export const PageHome = ({
  projects,
  projectRefs,
  onOpenProject,
}: PageHomeProps) => (
  <>
    <title>Portfolio @mirakeers</title>
    <ul className="flex flex-col gap-16 relative">
      {projects.map((project) => (
        <ProjectListItem
          key={project.id}
          ref={(element) => {
            if (projectRefs) {
              projectRefs.current[project.id] = element;
            }
          }}
          {...project}
          onOpenProject={onOpenProject}
        />
      ))}
    </ul>
  </>
);
