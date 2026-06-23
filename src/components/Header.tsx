import { ShoppingCart } from "lucide-react";

export default function Header() {
  return (
    <header className="bg-white border-b">

      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

        <div className="flex items-center gap-2">

          <div
            className="
            w-8
            h-8
            rounded-md
            bg-purple-600
            text-white
            flex
            items-center
            justify-center
            font-bold
            "
          >
            S
          </div>

          <span className="font-bold">
            ShirtStore
          </span>

        </div>

        <ShoppingCart size={20} />

      </div>

    </header>
  );
}