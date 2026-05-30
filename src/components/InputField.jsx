// Campo de formulário com label, ícone à esquerda e ação opcional à direita
// (ex.: botão mostrar/ocultar senha). Reutilizável nas telas de auth.
export default function InputField({ label, icon, trailing, id, className = '', ...inputProps }) {
  return (
    <div className={className}>
      {label && (
        <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}

      <div className="relative">
        {icon && (
          <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
            {icon}
          </span>
        )}

        <input
          id={id}
          className={`w-full rounded-lg border border-gray-300 bg-white py-2.5 text-gray-900 placeholder-gray-400 outline-none transition focus:border-[#7B4FDB] focus:ring-2 focus:ring-[#7B4FDB]/30 ${
            icon ? 'pl-10' : 'pl-3'
          } ${trailing ? 'pr-10' : 'pr-3'}`}
          {...inputProps}
        />

        {trailing && (
          <span className="absolute inset-y-0 right-0 flex items-center pr-3">{trailing}</span>
        )}
      </div>
    </div>
  )
}
