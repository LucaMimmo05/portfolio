import React from "react";
import style from "./App.module.css";
import Overlay from "./components/overlay/Overlay";
import Navbar from "./components/navbar/Navbar";

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
                    <img src="../public/double-arrow-bottom-icon.svg" alt="" srcset="" />
                    <h4>DIVE IN</h4>
                    <img src="../public/double-arrow-bottom-icon.svg" alt="" srcset="" />
                </div>
            </section>

            <section id="about" className={style.AppAbout}></section>
            <section id="projects" className={style.AppProjects}></section>
            <section id="contact" className={style.AppContact}></section>
        </div>
    );
};

export default App;
