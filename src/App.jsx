import React from "react";
import style from "./App.module.css";
import HeroSection from "./components/sections/HeroSection/HeroSection";
import AboutSection from "./components/sections/AboutSection/AboutSection";
import ProjectsSection from "./components/sections/ProjectsSection/ProjectsSection";
import ContactSection from "./components/sections/ContactSection/ContactSection";
import KeySection from "./components/sections/KeySection/KeySection";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/sections/Footer/Footer";
import { useIsMobile } from "./hooks/useIsMobile";
import BurgerMenu from "./components/burgerMenu/BurgerMenu";

const App = () => {
    const isMobile = useIsMobile();
    const handleClick = (section) => {
        const element = document.getElementById(section);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    };
    return (
        <div className={style.App}>
            {isMobile ? (
                <BurgerMenu onClick={handleClick} />
            ) : (
                <Navbar onClick={handleClick} />
            )}
            <HeroSection onNavClick={handleClick} />
            <AboutSection />
            <ProjectsSection />
            <KeySection />
            <ContactSection />
            <Footer />
        </div>
    );
};

export default App;
