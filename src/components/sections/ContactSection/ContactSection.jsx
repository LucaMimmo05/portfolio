import React from "react";
import style from "./ContactSection.module.css";
import { useIntersectionObserver } from "../../../hooks/useIntersectionObserver";

const ContactSection = () => {
    const [ref, isVisible] = useIntersectionObserver();

    return (
        <section
            ref={ref}
            id="contact"
            className={`${style.Contact} ${isVisible ? style.visible : ""}`}
        ></section>
    );
};

export default ContactSection;
