import ContainerStep from "../components/SetPedidosPagamentos/ContainerStep/ContainerStep";
import ConfirmDadosPessoais from "../components/SetPedidosPagamentos/ConfirmDadosPessoais/ConfirmDadosPessoais";
import OpcaoPagamento from "../components/SetPedidosPagamentos/OpcaoPagamento/OpcaoPagamento";
import DadosEntrega from "../components/SetPedidosPagamentos/DadosEntrega/DadosEntrega";
import styles from "./ConfirmarPedido.module.css";

export default function ConfirmarPedido() {
    return (
        <div className={styles.container}>
            <section className={styles.steps}>
                <ContainerStep step={"I"} title="Dados do Comprador">
                    <ConfirmDadosPessoais />
                </ContainerStep>

                <ContainerStep step={"II"} title="Opção de Pagamento">
                    <OpcaoPagamento />
                </ContainerStep>

                <ContainerStep step={"III"} title="Opção de Entrega">
                    <DadosEntrega />
                </ContainerStep>
            </section>
        </div>
    );
}