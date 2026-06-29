import { Link, Route, Routes, useLocation } from "react-router-dom";
import { Header } from "./components/Header";
import { ProjectFilters } from "./components/ProjectFilters";
import { PageHome } from "./routes/PageHome";
import { PageProject } from "./routes/PageProject";
import importedProjects from "./data/projects.json";
import importedCategories from "./data/categories.json";
import type { Category, PageTransition, Project } from "./types";
import { useRef, useState } from "react";
import { motion, AnimatePresence, useScroll } from "motion/react";
import { Icon } from "./components/ui/Icon";
import { Page } from "./components/ui/Page";

function App() {
  const location = useLocation();

  const [activeCategory, setActiveCategory] = useState<string | undefined>(
    undefined,
  );

  const [projectPageTransition, setProjectPageTransition] =
    useState<PageTransition>("fade");

  const [animateOutOffset, setAnimateOutOffset] = useState(0);
  const [homeY, setHomeY] = useState(0);

  const { scrollY } = useScroll();
  const headerRef = useRef<HTMLDivElement>(null);
  const projectRefs = useRef<Record<string, HTMLLIElement | null>>({});

  const projects = importedProjects.map((project) => {
    const categories = (project.categories ?? [])
      .map((categoryId) =>
        importedCategories.find(({ id }) => id === categoryId),
      )
      .filter((c) => c !== undefined);

    return { ...project, categories };
  }) as Project[];

  const filteredProjects = projects.filter((project) =>
    activeCategory
      ? project.categories.find((c) => c.id === activeCategory)
      : true,
  );

  const categories = importedCategories.map((c) => ({
    ...c,
    count: projects.filter((p) => p.categories.find((pc) => pc.id === c.id))
      .length,
  })) as Category[];

  const projectId =
    location.pathname === "/" ? undefined : location.pathname.slice(1);

  const onCategoryChange = (categoryId: string | undefined) => {
    setActiveCategory(categoryId);
    window.scrollTo(0, 0);
  };

  const onOpenProject = () => {
    const currentY = scrollY.get();
    const targetScrollY = headerRef.current?.clientHeight ?? 0;

    setHomeY(currentY);
    setProjectPageTransition("slideFromRight");
    setAnimateOutOffset(currentY);

    window.scrollTo({
      top: targetScrollY,
      behavior: "instant",
    });
  };

  const onBackToOverview = () => {
    const currentY = scrollY.get();

    setProjectPageTransition("slideFromRight");
    setAnimateOutOffset(currentY);

    window.scrollTo({
      top: homeY,
      behavior: "instant",
    });
  };

  return (
    <>
      <Header ref={headerRef} />

      <div className="sticky bg-bg-page top-0 h-15 flex items-center z-100">
        {projectId ? (
          <motion.div
            className="relative containerPadding"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Link className="buttonText" to="/" onClick={onBackToOverview}>
              <Icon name="m10:arrow-left-alt-rounded" />
              Back to overview
            </Link>
          </motion.div>
        ) : (
          <ProjectFilters
            categories={categories}
            activeCategory={activeCategory}
            totalEntries={projects.length}
            onCategoryChange={onCategoryChange}
          />
        )}
      </div>

      <div className="relative overflow-x-hidden">
        <AnimatePresence mode="sync">
          <Routes location={location} key={location.pathname}>
            <Route
              index
              element={
                <Page
                  name="home"
                  pageTransition="fade"
                  layer="base"
                  animateOutOffset={animateOutOffset}
                >
                  <PageHome
                    projects={filteredProjects}
                    onOpenProject={onOpenProject}
                    projectRefs={projectRefs}
                  />
                </Page>
              }
            />

            <Route
              path=":projectId"
              element={
                <Page
                  name="project"
                  pageTransition={projectPageTransition}
                  layer="overlay"
                  animateOutOffset={animateOutOffset}
                  className="max-w-5xl mx-auto"
                >
                  <PageProject projects={projects} />
                </Page>
              }
            />
          </Routes>
        </AnimatePresence>
      </div>
    </>
  );
}

export default App;
