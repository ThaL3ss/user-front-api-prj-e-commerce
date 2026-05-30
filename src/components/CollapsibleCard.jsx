import { useState } from 'react'
import { ChevronDownIcon } from './icons'

// Card colapsável: mostra só o título + seta quando fechado; expande/recolhe
// com animação suave (transição de grid-rows 0fr → 1fr, sem altura fixa).
export default function CollapsibleCard({ title, defaultOpen = false, children }) {
  const [open, setOpen] = useState(defaultOpen)

  return (
    <section className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-lg">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="flex w-full items-center justify-between p-6 text-left"
      >
        <h4 className="text-lg font-bold text-gray-900">{title}</h4>
        <ChevronDownIcon
          className={`shrink-0 text-gray-500 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
        />
      </button>

      <div
        className={`grid transition-all duration-300 ease-in-out ${
          open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
        }`}
      >
        <div className="overflow-hidden">
          <div className="px-6 pb-6">{children}</div>
        </div>
      </div>
    </section>
  )
}
