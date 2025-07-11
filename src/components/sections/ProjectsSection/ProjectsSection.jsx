import React from "react";
import style from "./ProjectsSection.module.css";
import Overlay from "../../overlay/Overlay";
import ProjectCard from "./ProjectCard/ProjectCard";

const ProjectsSection = () => {
    return (
        <section id="projects" className={style.Projects}>
            <Overlay top={-300} left={-400} />
            <div className={style.ProjectContent}>
                <h2 className={style.ProjectTitle}>Projects</h2>
                <div className={style.ProjectList}>
                    <ProjectCard
                        num={1}
                        title={"Devhub"}
                        description={"Simple Dashboard for developers."}
                    />
                    <ProjectCard
                        num={2}
                        title={"Lorem Ipsum"}
                        description={"Lorem ipsum dolor sit amet"}
                    />
                    <ProjectCard
                        num={3}
                        title={"Lorem Ipsum"}
                        description={"Lorem ipsum dolor sit amet"}
                    />
                    <ProjectCard
                        num={4}
                        title={"Lorem Ipsum"}
                        description={"Lorem ipsum dolor sit amet"}
                    />
                </div>
            </div>
        </section>
    );
};

export default ProjectsSection;
