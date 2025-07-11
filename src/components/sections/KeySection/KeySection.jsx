import styles from "./KeySection.module.css";
import KeyCard from "./KeyCard/KeyCard";
import Overlay from "../../overlay/Overlay";

const KeySection = () => {
    return (
        <section id="key" className={styles.KeySection}>
            <Overlay bottom={-250} right={-400}/>
            <h2>Key Points</h2>
            <div className={styles.KeyCards}>
                <KeyCard title="Full Stack Development" description="Designed and developed complete web applications, managing frontend, backend, authentication, and database operations." />
                <KeyCard title="Responsive & Modern UI Design" description="Created modern, responsive, and user-friendly interfaces with consistent layouts and optimized usability across all devices." />
                <KeyCard title="API Integration and Data Visualization" description="Integrated external APIs and implemented dynamic data dashboards with real-time charts and interactive visual components." />
            </div>
        </section>
    );
};

export default KeySection;
