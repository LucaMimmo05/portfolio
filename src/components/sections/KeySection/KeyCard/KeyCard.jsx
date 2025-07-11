import styles from "./KeyCard.module.css";

const KeyCard = ({ title, description }) => {
    return <div className={styles.KeyCard}>
        <h3>{title}</h3>
        <p>{description}</p>
    </div>;
};

export default KeyCard;
