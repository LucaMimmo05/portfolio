import React from "react";
import style from "./AboutSection.module.css";
import Overlay from "../../overlay/Overlay";
import Carousel from "../../carousel/Carousel";
import { useIsMobile } from "../../../hooks/useIsMobile";
import GridItem from "../../griditems/GridItem";

const AboutSection = () => {
    const isMobile = useIsMobile();
    return (
        <section id="about" className={style.About}>
            <Overlay top={-150} left={900} right={0} bottom={0} />
            <div className={style.AboutLeft}>
                <div className={style.AboutLeftText}>
                    <h3>I'm</h3>
                    <div className={style.AboutLeftTitle}>
                        <h1>Luca</h1>
                        <h1>Mimmo</h1>
                    </div>
                    <h3>Junior Web Developer</h3>
                </div>
                <hr />
                <p>
                    Hi, I'm Luca Mimmo — I love building websites, designing
                    clean interfaces, and learning new tech every day.
                </p>
            </div>
            <div className={style.AboutRight}>
                <div className={style.AboutRightContent}>
                    <div className={style.AboutRightImage}></div>
                    <div className={style.AboutRightSkills}>
                        <h3>Skills</h3>
                        {isMobile ? <GridItem /> : <Carousel />}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutSection;
