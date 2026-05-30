// Logo do ShirtStore: quadrado roxo arredondado com a letra "S" branca.
export default function Logo({ size = 'md', className = '' }) {
  const dimensions = {
    sm: 'w-10 h-10 text-xl rounded-lg',
    md: 'w-16 h-16 text-3xl rounded-2xl',
  }

  return (
    <div
      className={`flex items-center justify-center bg-gradient-to-br from-[#7B4FDB] to-[#E040A0] font-bold text-white ${dimensions[size]} ${className}`}
    >
      S
    </div>
  )
}
