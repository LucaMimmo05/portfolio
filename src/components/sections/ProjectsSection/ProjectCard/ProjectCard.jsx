import styles from "./ProjectCard.module.css";

const ProjectCard = ({ num, title, description }) => {
    return (
        <div className={styles.ProjectCard}>
            <div className={styles.ProjectImage}>
                <h1>{num}</h1>
            </div>

            <div className={styles.ProjectDetails}>
                <div className={styles.ProjectInfo}>
                    <h3>{title}</h3>
                    <p>{description}</p>
                </div>

                <div className={styles.ProjectLink}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="30"
                        height="30"
                        viewBox="0 0 30 30"
                        fill="none"
                    >
                        <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M26.25 4.6875C26.25 4.43886 26.1512 4.2004 25.9754 4.02459C25.7996 3.84877 25.5611 3.75 25.3125 3.75H14.0625C13.8139 3.75 13.5754 3.84877 13.3996 4.02459C13.2238 4.2004 13.125 4.43886 13.125 4.6875C13.125 4.93614 13.2238 5.1746 13.3996 5.35041C13.5754 5.52623 13.8139 5.625 14.0625 5.625H23.0494L4.02374 24.6488C3.93658 24.7359 3.86744 24.8394 3.82026 24.9533C3.77309 25.0672 3.74881 25.1892 3.74881 25.3125C3.74881 25.4358 3.77309 25.5578 3.82026 25.6717C3.86744 25.7856 3.93658 25.8891 4.02374 25.9762C4.11091 26.0634 4.21439 26.1326 4.32828 26.1797C4.44216 26.2269 4.56422 26.2512 4.68749 26.2512C4.81076 26.2512 4.93283 26.2269 5.04671 26.1797C5.1606 26.1326 5.26408 26.0634 5.35124 25.9762L24.375 6.95062V15.9375C24.375 16.1861 24.4738 16.4246 24.6496 16.6004C24.8254 16.7762 25.0639 16.875 25.3125 16.875C25.5611 16.875 25.7996 16.7762 25.9754 16.6004C26.1512 16.4246 26.25 16.1861 26.25 15.9375V4.6875Z"
                            fill="#FEFEFE"
                        />
                    </svg>
                </div>
            </div>
        </div>
    );
};

export default ProjectCard;
