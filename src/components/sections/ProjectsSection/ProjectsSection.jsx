import React from "react";
import style from "./ProjectsSection.module.css";
import Overlay from "../../overlay/Overlay";
import ProjectCard from "./ProjectCard/ProjectCard";
import { useIsMobile } from "../../../hooks/useIsMobile";

import { useRef } from "react";

const ProjectsSection = () => {
    const isMobile = useIsMobile();
    const projectListRef = useRef(null);

    const SCROLL_AMOUNT = 300;

    const handleLeft = () => {
        console.log("click");

        if (projectListRef.current) {
            projectListRef.current.scrollBy({
                left: -SCROLL_AMOUNT,
                behavior: "smooth",
            });
        }
    };

    const handleRight = () => {
        console.log("click");
        if (projectListRef.current) {
            projectListRef.current.scrollBy({
                left: SCROLL_AMOUNT,
                behavior: "smooth",
            });
        }
    };

    return (
        <section id="projects" className={style.Projects}>
            <Overlay top={-300} left={-400} />
            <div className={style.ProjectContent}>
                <div className={style.ProjectTop}>
                    <h2 className={style.ProjectTitle}>Projects</h2>

                    {isMobile && (
                        <div className={style.Circles}>
                            <div className={style.Circle} onClick={handleLeft}>
                                <svg
                                    fill="#fefefe"
                                    version="1.1"
                                    id="Layer_1"
                                    xmlns="http://www.w3.org/2000/svg"
                                    xmlns:xlink="http://www.w3.org/1999/xlink"
                                    width="32px"
                                    height="32px"
                                    viewBox="0 0 100 100"
                                    enable-background="new 0 0 100 100"
                                    xml:space="preserve"
                                >
                                    <g
                                        id="SVGRepo_bgCarrier"
                                        stroke-width="0"
                                    ></g>
                                    <g
                                        id="SVGRepo_tracerCarrier"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                    ></g>
                                    <g id="SVGRepo_iconCarrier">
                                        {" "}
                                        <g>
                                            {" "}
                                            <path d="M33.934,54.458l30.822,27.938c0.383,0.348,0.864,0.519,1.344,0.519c0.545,0,1.087-0.222,1.482-0.657 c0.741-0.818,0.68-2.083-0.139-2.824L37.801,52.564L64.67,22.921c0.742-0.818,0.68-2.083-0.139-2.824 c-0.817-0.742-2.082-0.679-2.824,0.139L33.768,51.059c-0.439,0.485-0.59,1.126-0.475,1.723 C33.234,53.39,33.446,54.017,33.934,54.458z"></path>{" "}
                                        </g>{" "}
                                    </g>
                                </svg>
                            </div>
                            <div className={style.Circle} onClick={handleRight}>
                                <svg
                                    fill="#fefefe"
                                    version="1.1"
                                    id="Layer_1"
                                    xmlns="http://www.w3.org/2000/svg"
                                    xmlns:xlink="http://www.w3.org/1999/xlink"
                                    width="32px"
                                    height="32px"
                                    viewBox="0 0 100 100"
                                    enable-background="new 0 0 100 100"
                                    xml:space="preserve"
                                    transform="rotate(180)"
                                >
                                    <g
                                        id="SVGRepo_bgCarrier"
                                        stroke-width="0"
                                    ></g>
                                    <g
                                        id="SVGRepo_tracerCarrier"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                    ></g>
                                    <g id="SVGRepo_iconCarrier">
                                        {" "}
                                        <g>
                                            {" "}
                                            <path d="M33.934,54.458l30.822,27.938c0.383,0.348,0.864,0.519,1.344,0.519c0.545,0,1.087-0.222,1.482-0.657 c0.741-0.818,0.68-2.083-0.139-2.824L37.801,52.564L64.67,22.921c0.742-0.818,0.68-2.083-0.139-2.824 c-0.817-0.742-2.082-0.679-2.824,0.139L33.768,51.059c-0.439,0.485-0.59,1.126-0.475,1.723 C33.234,53.39,33.446,54.017,33.934,54.458z"></path>{" "}
                                        </g>{" "}
                                    </g>
                                </svg>
                            </div>
                        </div>
                    )}
                </div>
                <div className={style.ProjectList} ref={projectListRef}>
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
