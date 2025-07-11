import React from "react";
import style from "./App.module.css";
import HeroSection from "./components/sections/HeroSection/HeroSection";
import AboutSection from "./components/sections/AboutSection/AboutSection";
import ProjectsSection from "./components/sections/ProjectsSection/ProjectsSection";
import ContactSection from "./components/sections/ContactSection/ContactSection";
import KeySection from "./components/sections/KeySection/KeySection";

const App = () => {
    const handleClick = (section) => {
        const element = document.getElementById(section);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    };
    return (
        <div className={style.App}>
            <HeroSection onNavClick={handleClick} />
            <AboutSection />
            <ProjectsSection />
            <KeySection/>
            <ContactSection />
        </div>
    );
};

export default App;
