import { useEffect, useState, Fragment } from 'react'
import Topbar from '../../components/shared/Topbar/Topbar'
import ImgHero01 from '../../assets/img_hero_section_home.png'
import ImgHero02 from '../../assets/img-2_hero_section_home.png'
import ImgHero03 from '../../assets/img-3_hero_section_home.png'
import ImgLancamentos from '../../assets/img_lancamentos_home.png'
import ImgPersonalizado from '../../assets/img_personalizado_home.png'
import ImgNewletter from '../../assets/img_newletter_home.png'
import ButtonPrimary from '../../components/shared/Commons/Buttons/Buttons_Primary'
import ButtonSecondary from '../../components/shared/Commons/Buttons/Buttons_Secondary'
import Toast from '../../components/shared/Commons/Toasts/Toast'
import { buttonPrimaryPresets } from '../../data/Buttons/Button_Primary.data'
import { buttonSecondaryPresets } from '../../data/Buttons/Button_Secondary.data'
import { benefits, categories, products as staticProducts } from '../../data/Home/Home.data'
import NewsletterInput from '../../components/shared/Commons/NewsletterInput/NewsletterInput'
import { getAllProducts } from '../../services/product/Product.service'
import { useCart } from '../../context/CartContext'
import styles from './Home.module.css'

export default function Home() {
    const { addItem } = useCart()

    const heroButton = buttonPrimaryPresets.find(
        (button) => button.id === 'home-hero-buy'
    )

    const launchesButton = buttonSecondaryPresets.find(
        (button) => button.id === 'home-launches'
    )

    const customizeButton = buttonSecondaryPresets.find(
        (button) => button.id === 'home-customize'
    )

    const newsletterButton = buttonPrimaryPresets.find(
        (button) => button.id === 'home-newsletter'
    )

    const heroSlides = [
        { id: 1, image: ImgHero01 },
        { id: 2, image: ImgHero02 },
        { id: 3, image: ImgHero03 },
    ]

    const [currentSlide, setCurrentSlide] = useState(0)
    const [products, setProducts] = useState(staticProducts)
    const [selectedSizes, setSelectedSizes] = useState({})
    const [toast, setToast] = useState({ visible: false, title: '', message: '', type: 'success' })

    function showToast(title, message, type = 'success') {
        setToast({ visible: true, title, message, type })
        setTimeout(() => setToast((t) => ({ ...t, visible: false })), 3000)
    }

    function parsePrice(price) {
        if (typeof price === 'number') return price
        return parseFloat(String(price).replace(/[^\d,]/g, '').replace(',', '.')) || 0
    }

    function handleAddToCart(product) {
        const size = selectedSizes[product.id]
        if (!size) {
            showToast('Selecione um tamanho', 'Escolha P, M, G ou GG antes de adicionar.', 'warning')
            return
        }
        addItem(
            { id: product.id, name: product.name, price: parsePrice(product.price), image: product.image ?? null },
            size,
        )
        showToast('Adicionado!', `${product.name} foi adicionado ao carrinho.`, 'success')
    }

    useEffect(() => {
        getAllProducts()
            .then(({ data }) => {
                const apiProducts = data.map((p) => ({
                    id: p.idProduto,
                    name: p.nomeProduto,
                    price: p.precoProduto,
                    image: p.urlImagem ?? null,
                    installments: `3x de R$ ${(p.precoProduto / 3).toFixed(2).replace('.', ',')} sem juros`,
                }))
                if (apiProducts.length > 0) setProducts(apiProducts)
            })
            .catch(() => {
                // Mantém produtos estáticos se a API falhar
            })
    }, [])

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) =>
                prev === heroSlides.length - 1 ? 0 : prev + 1
            )
        }, 4000)

        return () => clearInterval(interval)
    }, [])

    return (
        <main className={styles.page}>
            <Toast
                visible={toast.visible}
                title={toast.title}
                message={toast.message}
                type={toast.type}
                onClose={() => setToast((t) => ({ ...t, visible: false }))}
            />
            <header className={styles.header}>
                <Topbar />
            </header>

            <section className={styles.hero}>
                <div className={styles.heroText}>
                    <h1>
                        Vista sua <strong>paixão</strong>
                    </h1>

                    <p>
                        As melhores camisas de futebol dos seus times favoritos
                    </p>

                    <ButtonPrimary
                        variant={heroButton.variant}
                        size={heroButton.size}
                        full={heroButton.full}
                    >
                        {heroButton.text}
                    </ButtonPrimary>

                    <div className={styles.sliderNumbers}>
                        <button
                            type="button"
                            onClick={() => setCurrentSlide(0)}
                            className={currentSlide === 0 ? styles.activeSlide : ""}
                        >
                            01
                        </button>

                        <i />

                        <button
                            type="button"
                            onClick={() => setCurrentSlide(1)}
                            className={currentSlide === 1 ? styles.activeSlide : ""}
                        >
                            02
                        </button>

                        <button
                            type="button"
                            onClick={() => setCurrentSlide(2)}
                            className={currentSlide === 2 ? styles.activeSlide : ""}
                        >
                            03
                        </button>
                    </div>
                </div>

                <div
                    className={styles.heroImage}
                    style={{ backgroundImage: `url(${heroSlides[currentSlide].image})` }}
                />

                <aside className={styles.verticalText}>
                    <span>Jogue com orgulho</span>
                    <b />
                </aside>
            </section>

            <section className={styles.categories}>
                {categories.map((category, index) => (
                    <Fragment key={category.title}>
                        <article className={styles.category}>
                            <span className={styles.categoryIcon}>{category.icon}</span>

                            <div>
                                <h3>{category.title}</h3>
                                <p>{category.text}</p>
                            </div>
                        </article>

                        {index < categories.length - 1 && (
                            <div className={styles.categoryDivider}></div>
                        )}
                    </Fragment>
                ))}
            </section>

            <section className={styles.banners}>
                <article className={styles.launchCard}>
                    <div className={styles.launchCardText}>
                        <h2>
                            Lançamentos
                            <strong>07/26</strong>
                        </h2>
                        <p>As novas camisas já chegaram!</p>

                        <ButtonSecondary
                            variant={launchesButton.variant}
                            size={launchesButton.size}
                        >
                            {launchesButton.text} →
                        </ButtonSecondary>
                    </div>
                    <div className={styles.launchCardImg}>
                        <img src={ImgLancamentos} alt="ShirtStore" className={styles.logo} />
                    </div>
                </article>

                <article className={styles.customCard}>
                    <div className={styles.customCardText}>
                        <h2>
                            Personalize <strong>do seu jeito</strong>
                        </h2>

                        <p>Nome, número e patches oficiais</p>

                        <ButtonSecondary
                            variant={customizeButton.variant}
                            size={customizeButton.size}
                        >
                            {customizeButton.text} →
                        </ButtonSecondary>
                    </div>
                    <div className={styles.customCardText}>
                        <img src={ImgPersonalizado} alt="ShirtStore" className={styles.logo} />
                    </div>
                </article>
            </section>

            <section className={styles.productsSection}>
                <div className={styles.sectionHeader}>
                    <h2>Mais vendidas</h2>
                    <a href="#">Ver todas →</a>
                </div>

                <div className={styles.productsGrid}>
                    {products.map((product) => (
                        <article key={product.id} className={styles.productCard}>
                            <div className={styles.productImage}>
                                <span>♡</span>
                            </div>

                            <h3>{product.name}</h3>
                            <strong>
                                {typeof product.price === 'number'
                                    ? product.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
                                    : product.price}
                            </strong>
                            <p>{product.installments}</p>

                            <div className={styles.sizes}>
                                {['P', 'M', 'G', 'GG'].map((size) => (
                                    <button
                                        key={size}
                                        type="button"
                                        className={selectedSizes[product.id] === size ? styles.sizeActive : ''}
                                        onClick={() =>
                                            setSelectedSizes((prev) => ({ ...prev, [product.id]: size }))
                                        }
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>

                            <button
                                type="button"
                                className={styles.addToCartBtn}
                                onClick={() => handleAddToCart(product)}
                            >
                                Adicionar ao carrinho
                            </button>
                        </article>
                    ))}
                </div>
            </section>

            <section className={styles.benefits}>
                {benefits.map((benefit) => (
                    <article key={benefit.title}>
                        <span>{benefit.icon}</span>
                        <div>
                            <h3>{benefit.title}</h3>
                            <p>{benefit.text}</p>
                        </div>
                    </article>
                ))}
            </section>

            <section className={styles.newsletter}>
                <div>
                    <h2>
                        Futebol é mais que um jogo
                        <strong> é sobre que você é.</strong>
                    </h2>

                    <p>
                        Receba novidades, ofertas exclusivas e lançamentos em primeira mão
                    </p>

                    <NewsletterInput
                        buttonText="Assinar"
                        onSubmit={(email) => {
                            console.log('Email cadastrado:', email)
                        }}
                    />
                </div>
                <div>
                    <img src={ImgNewletter} alt="ShirtStore" className={styles.footerLogo} />
                </div>
            </section>            
        </main>
    )
}