import {
  Facebook,
  Instagram,
  Twitter,
  MapPin,
  Phone,
  Mail,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-white mt-16">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Empresa */}
          <div>
            <h3 className="font-bold text-xl mb-4">
              ShirtStore
            </h3>

            <p className="text-sm text-gray-300 leading-relaxed mb-4">
              As melhores camisas com qualidade premium para você.
              Moda, conforto e estilo em um só lugar.
            </p>

            <div className="flex gap-4">
              <Facebook
                size={18}
                className="cursor-pointer hover:text-blue-400"
              />

              <Instagram
                size={18}
                className="cursor-pointer hover:text-pink-400"
              />

              <Twitter
                size={18}
                className="cursor-pointer hover:text-sky-400"
              />
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-bold text-lg mb-4">
              Links Rápidos
            </h3>

            <ul className="space-y-2 text-gray-300">
              <li>Catálogo</li>
              <li>Meus Pedidos</li>
              <li>Carrinho</li>
              <li>Sobre Nós</li>
            </ul>
          </div>

          {/* Categorias */}
          <div>
            <h3 className="font-bold text-lg mb-4">
              Categorias
            </h3>

            <ul className="space-y-2 text-gray-300">
              <li>Básicas</li>
              <li>Premium</li>
              <li>Polos</li>
              <li>Casuais</li>
              <li>Fashion</li>
            </ul>
          </div>

          {/* Contato */}
          <div>
            <h3 className="font-bold text-lg mb-4">
              Contato
            </h3>

            <div className="space-y-4 text-gray-300">
              <div className="flex items-start gap-2">
                <MapPin size={18} />
                <span>Rua das Camisas, 123 São Paulo - SP</span>
              </div>

              <div className="flex items-center gap-2">
                <Phone size={18} />
                <span>(11) 9999-9999</span>
              </div>

              <div className="flex items-center gap-2">
                <Mail size={18} />
                <span>contato@shirtstore.com</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-10 pt-6 text-center text-sm text-gray-400">
          © 2026 ShirtStore. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
}