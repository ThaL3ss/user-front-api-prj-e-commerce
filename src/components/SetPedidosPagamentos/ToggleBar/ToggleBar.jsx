import { useState } from "react";
import styles from "./ToggleBar.module.css";

export default function ToggleBar({ option1, option2, onToggle, activeOption }) {
  const [selectedOption, setSelectedOption] = useState(activeOption || option1);

  const handleToggle = (option) => {
    setSelectedOption(option);
    onToggle?.(option);
  };

  return (
    <div className={styles.toggleBar}>
      <button
        className={`${styles.toggleButton} ${selectedOption === option1 ? styles.active : ""
          }`}
        onClick={() => handleToggle(option1)}
      >
        {option1}
      </button>
      <button
        className={`${styles.toggleButton} ${selectedOption === option2 ? styles.active : ""
          }`}
        onClick={() => handleToggle(option2)}
      >
        {option2}
      </button>
    </div>
  );
}
