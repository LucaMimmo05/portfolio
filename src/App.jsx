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
            <section className={style.AppHero} id="home">
                <Overlay top={-250} left={-350} right={0} bottom={0} />
                <Navbar onClick={handleClick} />

                <main className={style.AppMain}>
                    <h1>WEB DEVELOPER</h1>
                    <p>
                        Hi, I'm Luca web developer & UI enthusiast.{" "}
                        <span>Get my CV</span>
                    </p>
                </main>

                <div className={style.AppDiveIn}>
                    <img
                        src="/double-arrow-bottom-icon.svg"
                        alt=""
                        srcset=""
                    />
                    <h4>DIVE IN</h4>
                    <img
                        src="/double-arrow-bottom-icon.svg"
                        alt=""
                        srcset=""
                    />
                </div>
            </section>

            <section id="about" className={style.AppAbout}>
                <Overlay top={-150} left={900} right={0} bottom={0} />
                <div className={style.AppAboutLeft}>
                    <div className={style.AppAboutLeftText}>
                        <h3>I'm</h3>
                        <div className={style.AppAboutLeftTitle}>
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
                <div className={style.AppAboutRight}>
                    <div className={style.AppAboutRightContent}>
                        <div className={style.AppAboutRightImage}></div>
                        <div className={style.AppAboutRightSkills}>
                            <h3>Skills</h3>
                            <Carousel/>
                        </div>
                        
                    </div>
                </div>
            </section>
            <section id="projects" className={style.AppProjects}></section>
            <section id="contact" className={style.AppContact}></section>
        </div>
    );
};

export default App;
