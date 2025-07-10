import React from "react";
import style from "./App.module.css";
import Overlay from "./components/overlay/Overlay";
import Navbar from "./components/navbar/Navbar";
import Carousel from "./components/carousel/Carousel";

const App = () => {
    const handleClick = (section) => {
        const element = document.getElementById(section);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    };
    return (
        <div className={style.App}>
            <section className={style.Hero} id="home">
                <Overlay top={-250} left={-350} right={0} bottom={0} />
                <Navbar onClick={handleClick} />

                <main className={style.Main}>
                    <h1>WEB DEVELOPER</h1>
                    <p>
                        Hi, I'm Luca web developer & UI enthusiast.{" "}
                        <span>Get my CV</span>
                    </p>
                </main>

                <div className={style.DiveIn}>
                    <img src="/double-arrow-bottom-icon.svg" alt="" srcset="" />
                    <h4>DIVE IN</h4>
                    <img src="/double-arrow-bottom-icon.svg" alt="" srcset="" />
                </div>
            </section>

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
                        Always working on cool side projects.
                    </p>
                </div>
                <div className={style.AboutRight}>
                    <div className={style.AboutRightContent}>
                        <div className={style.AboutRightImage}></div>
                        <div className={style.AboutRightSkills}>
                            <h3>Skills</h3>
                            <Carousel />
                        </div>
                    </div>
                </div>
            </section>
            <section id="projects" className={style.Projects}></section>
            <section id="contact" className={style.Contact}></section>
        </div>
    );
};

export default App;
