import styles from "./OpcaoPagamento.module.css";

export default function OpcaoPagamento() {
  const handlePaymentOptionChange = (event) => {
    const selectedOption = event.target.value;
    console.log("Opção de pagamento selecionada:", selectedOption);
  }

  return (
    <div className={styles.container}>

      {/* Cartão */}
      <div className={styles.option}>

        <label className={styles.radio}>
          <input
            type="radio"
            name="pagamento"
            defaultChecked
            onChange={handlePaymentOptionChange}
          />

          <span>Cartão</span>
        </label>

        <input
          className={styles.cardNumber}
          type="text"
          value="4984-xxxx-xxxx-3325"
          readOnly
        />

        <select className={styles.installments}>
          <option>a vista</option>
          <option>2 vezes s/j</option>
          <option>3 vezes s/j</option>
        </select>

        <button className={styles.button}>
          Mudar cartão
        </button>

      </div>

      {/* Boleto */}

      <label className={styles.option}>
        <input
          type="radio"
          name="pagamento"
        />

        <span>Boleto</span>
      </label>

      {/* Pix */}

      <label className={styles.option}>
        <input
          type="radio"
          name="pagamento"
        />

        <span>Pix</span>
      </label>

    </div>
  );
}