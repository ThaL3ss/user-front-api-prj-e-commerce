
import styles from "./ContainerStep.module.css";

export default function ContainerStep({ step, title, children }) {
  return (
    <section className={styles.container}>
      <header className={styles.header}>
        {/* Numero da opcao */}
        <div className={styles.step}>{step}</div>
{/* Nome da opcao */}
        <span className={styles.title}>
          {title}
        </span>
      </header>

      <div className={styles.content}>
        {children}
      </div>
    </section>
  );
}