import { UserOutIcon, SearchIcon, ShopIcon, ShirtIcon, ShirtTraningIcon, PlanetIcon, OfferIcon, DeliveryIcon, SecurityIcon, CheckIcon, ReturnIcon } from '../../assets/icons/Icons'

export const menuItems = ['Início', 'Catálogo']

export const categories = [
  {
    title: 'Clubes',
    text: 'Nacionais ou internacionais',
    icon: <ShirtIcon />,
  },
  {
    title: 'Seleções',
    text: 'Vista as cores do seu País',
    icon: <PlanetIcon />,
  },
  {
    title: 'Treino',
    text: 'Performance e conforto para todos os dias',
    icon: <ShirtTraningIcon />,
  },
  {
    title: 'Ofertas',
    text: 'Descontos imperdíveis por tempo limitado',
    icon: <OfferIcon />,
  },
]

export const products = [
  {
    id: 1,
    name: 'Vasco da Gama',
    price: 'R$ 349,90',
    installments: 'Até 6x de R$ 58,31',
  },
  {
    id: 2,
    name: 'Flamengo',
    price: 'R$ 349,90',
    installments: 'Até 6x de R$ 58,31',
  },
  {
    id: 3,
    name: 'Barcelona',
    price: 'R$ 349,90',
    installments: 'Até 6x de R$ 58,31',
  },
  {
    id: 4,
    name: 'Palmeiras',
    price: 'R$ 349,90',
    installments: 'Até 6x de R$ 58,31',
  },
  {
    id: 5,
    name: 'Brasil',
    price: 'R$ 349,90',
    installments: 'Até 6x de R$ 58,31',
  },
]

export const benefits = [
  {
    icon: <DeliveryIcon/>,
    title: 'Frete grátis',
    text: 'Acima de R$ 299 para todo o Brasil',
  },
  {
    icon: <CheckIcon />,
    title: 'Produtos oficiais',
    text: 'Licenciados e originais dos clubes e seleções',
  },
  {
    icon: <SecurityIcon />,
    title: 'Compra segura',
    text: 'Seus dados 100% protegidos',
  },
  {
    icon: <ReturnIcon />,
    title: 'Troca fácil',
    text: 'Até 7 dias após o recebimento',
  },
]