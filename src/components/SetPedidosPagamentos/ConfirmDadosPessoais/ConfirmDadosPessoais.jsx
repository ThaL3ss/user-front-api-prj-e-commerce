import styles from "./DadosPessoais.module.css";
import { useState } from "react";

export default function DadosPessoais() {
  const comprador = {
    nome: "João Pessoa Silva",
    cpf: "123.456.789-01",
    email: "joao@email.com",
    telefone: "(21) 99999-9991",
  };

const [destinatario, setDestinatario] = useState(`${comprador.nome}` || "");

  return (
    <div className={styles.container}>

      <div className={styles.nome}>
        <label>Nome:</label>
        <span>{comprador.nome}</span>
      </div>

      <div className={styles.cpf}>
        <label>CPF:</label>
        <span>{comprador.cpf}</span>
      </div>

      <div className={styles.email}>
        <label>Email:</label>
        <span>{comprador.email}</span>
      </div>

      <div className={styles.telefone}>
        <label>Telefone:</label>
        <span>{comprador.telefone}</span>
      </div>

      <div className={styles.destinatario}>
        <label>Destinatário:</label>

        <input
          type="text"
          value={destinatario}
          onChange={(e) => setDestinatario(e.target.value)}
        />
      </div>

    </div>
  );
}