import React from "react";
import style from "./HeroSection.module.css";
import Overlay from "../../overlay/Overlay";
import Navbar from "../../navbar/Navbar";
import { useIntersectionObserver } from "../../../hooks/useIntersectionObserver";

const HeroSection = ({ onNavClick }) => {
    const [ref, isVisible] = useIntersectionObserver();

    const handleDownload = () => {
        var link = document.createElement("a");
        link.href = "/CV-MIMMO.zip";
        link.download = "CV-MIMMO.zip";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    return (
        <section
            ref={ref}
            className={`${style.Hero} ${isVisible ? style.visible : ""}`}
            id="home"
        >
            <Overlay top={-250} left={-350} right={0} bottom={0} />
            <Navbar onClick={onNavClick} />

            <main className={style.Main}>
                <h1>WEB DEVELOPER</h1>
                <p>
                    Hi, I'm Luca web developer & UI enthusiast.{" "}
                    <span onClick={() => handleDownload()}>Get my CV</span>
                </p>
            </main>

            <div className={style.DiveIn}>
                <img src="/double-arrow-bottom-icon.svg" alt="" srcSet="" />
                <h4>DIVE IN</h4>
                <img src="/double-arrow-bottom-icon.svg" alt="" srcSet="" />
            </div>
        </section>
    );
};

export default HeroSection;
