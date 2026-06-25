import styles from './NewsletterInput.module.css'

export default function NewsletterInput({
    placeholder = 'Seu email aqui',
    buttonText = 'Assinar',
    onSubmit,
}) {
    function handleSubmit(event) {
        event.preventDefault()

        const email = event.target.email.value

        if (onSubmit) {
            onSubmit(email)
        }
    }

    return (
        <form className={styles.newsletterForm} onSubmit={handleSubmit}>
            <input
                type="email"
                name="email"
                placeholder={placeholder}
                required
            />

            <button type="submit">
                {buttonText}
            </button>
        </form>
    )
}