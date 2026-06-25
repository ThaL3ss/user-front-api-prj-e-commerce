// Ícones inline (sem dependência externa) usados nas telas de auth — ver _context/figma.

export const MailIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m22 7-10 5L2 7" />
  </svg>
)

export const LockIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
)

export const UserIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
)

export const IdIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="5" width="20" height="14" rx="2" />
    <path d="M14 10h4M14 14h2M7 15a2 2 0 1 1 4 0" />
    <circle cx="9" cy="11" r="1.5" />
  </svg>
)

export const EyeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
)

export const EyeOffIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9.88 9.88a3 3 0 0 0 4.24 4.24" />
    <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
    <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
    <line x1="2" y1="2" x2="22" y2="22" />
  </svg>
)

export const HomeIcon = (props) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <path d="M9 22V12h6v10" />
  </svg>
)

export const BoxIcon = (props) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
    <path d="m3.3 7 8.7 5 8.7-5M12 22V12" />
  </svg>
)

export const StarIcon = (props) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
)

export const CartIcon = (props) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <circle cx="8" cy="21" r="1" />
    <circle cx="19" cy="21" r="1" />
    <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
  </svg>
)

export const LogoutIcon = (props) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
    <path d="m16 17 5-5-5-5M21 12H9" />
  </svg>
)

export const ShieldIcon = (props) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
)

export const MapPinIcon = (props) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
)

export const HashIcon = (props) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <line x1="4" y1="9" x2="20" y2="9" />
    <line x1="4" y1="15" x2="20" y2="15" />
    <line x1="10" y1="3" x2="8" y2="21" />
    <line x1="16" y1="3" x2="14" y2="21" />
  </svg>
)

export const TrashIcon = (props) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m3 0v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
    <line x1="10" y1="11" x2="10" y2="17" />
    <line x1="14" y1="11" x2="14" y2="17" />
  </svg>
)

export const PencilIcon = (props) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M12 20h9" />
    <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
  </svg>
)

export const ChevronDownIcon = (props) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="m6 9 6 6 6-6" />
  </svg>
)

export const HelpIcon = (props) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <circle cx="12" cy="12" r="10" />
    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
    <line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>
)

export const SearchIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M11 6C13.7614 6 16 8.23858 16 11M16.6588 16.6549L21 21M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
)

export const UserOutIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M12 14C8.13401 14 5 17.134 5 21H19C19 17.134 15.866 14 12 14Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
)

export const ShopIcon = (props) => (
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}> <g id="handbag"> <path fill="none" stroke="currentColor" strokeWidth="1.91" strokeMiterlimit="10" d="M3.41,7.23H20.59a0,0,0,0,1,0,0v12a3.23,3.23,0,0,1-3.23,3.23H6.64a3.23,3.23,0,0,1-3.23-3.23v-12A0,0,0,0,1,3.41,7.23Z" /><path fill="none" stroke="currentColor" strokeWidth="1.91" strokeMiterlimit="10" d="M8.18,10.09V5.32A3.82,3.82,0,0,1,12,1.5h0a3.82,3.82,0,0,1,3.82,3.82v4.77" /></g></svg>
);

export const ShirtIcon = (props) => (
  <svg fill="#bee324" height="200px" width="200px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 513.277 513.277" xml:space="preserve" stroke="#bee324"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M512.615,264.062c-0.32-0.533-0.427-0.96-0.533-1.28l-95.147-186.88c-1.28-2.453-3.307-4.267-5.867-5.227l-82.667-29.973 c-12.48-27.413-62.293-24.107-72.427-23.147c-10.133-0.96-59.947-4.373-72.427,23.147L100.88,70.675 c-2.56,0.96-4.693,2.773-5.867,5.227L1.148,262.782c-2.667,5.227-0.533,11.627,4.8,14.293c0.32,0.213,0.64,0.32,1.067,0.427 l69.227,26.133c4.8,1.813,10.24-0.107,12.907-4.48l28.267-47.36v233.92c0,5.867,4.8,10.667,10.667,10.667h256 c5.867,0,10.667-4.8,10.667-10.667V251.902l28.267,47.36c2.667,4.373,8,6.293,12.8,4.587l70.507-26.133 C511.868,275.688,514.641,269.502,512.615,264.062z M255.335,38.355c0.747,0.107,1.6,0.107,2.347,0 c16.853-1.92,41.6-0.213,49.813,8l-50.987,50.987l-50.987-50.987C213.628,38.142,238.375,36.542,255.335,38.355z M319.975,63.528 v64.747l-45.333-19.413L319.975,63.528z M191.975,63.528l45.333,45.333l-45.333,19.413V63.528z M436.668,280.382l-43.52-72.96 c-2.987-5.013-9.6-6.72-14.613-3.733c-3.2,1.92-5.227,5.44-5.227,9.173v262.187H138.641v-262.08c0-5.867-4.8-10.667-10.667-10.667 c-3.733,0-7.253,2.027-9.173,5.227l-43.52,72.96l-49.813-18.88l86.72-172.8l58.453-21.227v76.8c0,5.867,4.8,10.667,10.667,10.667 c1.493,0,2.88-0.32,4.16-0.853l70.507-30.187l70.507,30.187c5.44,2.347,11.733-0.213,13.973-5.653 c0.533-1.28,0.853-2.773,0.853-4.16v-76.8l58.453,21.227l87.787,172.693L436.668,280.382z"></path> </g> </g> </g></svg>
);

export const ShirtTraningIcon = (props) => (
  <svg fill="#ffffff" height="200px" width="200px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512.054 512.054" xml:space="preserve" stroke="#ffffff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M509.04,184.454L391.707,67.12c-2.027-2.027-4.693-3.093-7.573-3.093H356.4L327.493,35.12 c-0.107-0.213-0.427-0.213-0.533-0.32c-0.747-0.64-1.493-1.173-2.453-1.6c-0.32-0.213-0.64-0.32-0.96-0.427 c-1.173-0.427-2.347-0.64-3.627-0.747h-128c-1.28,0-2.453,0.213-3.627,0.747c-0.32,0.107-0.64,0.32-0.96,0.427 c-0.853,0.427-1.707,0.96-2.453,1.6c-0.213,0.107-0.427,0.213-0.533,0.32l-28.8,28.907h-27.52c-2.88,0-5.547,1.173-7.573,3.093 L3.12,184.454c-4.16,4.16-4.16,10.88,0,15.04l64,64c4.267,4.053,10.88,4.053,15.04,0l35.093-35.093v240.96 c0,5.867,4.8,10.667,10.667,10.667h256c5.867,0,10.667-4.8,10.667-10.667V228.4l35.2,35.2c4.16,4.16,10.88,4.16,15.04,0l64-64 C513.093,195.44,513.093,188.72,509.04,184.454z M336.88,74.694l-48.96,48.96l-16.96-16.96l48.96-48.96L336.88,74.694z M294.213,53.36L255.92,91.654L217.627,53.36H294.213z M191.92,57.734l48.96,48.96l-16.96,16.96l-48.96-48.96L191.92,57.734z M437.36,240.987l-45.867-45.76c-4.16-4.16-10.88-4.16-15.04,0c-2.027,2.027-3.093,4.693-3.093,7.467v256H138.693v-256 c0-5.867-4.8-10.667-10.667-10.667c-2.88,0-5.547,1.173-7.573,3.093l-45.76,45.867l-48.96-48.96L132.4,85.36h23.147l60.907,60.907 c4.16,4.16,10.88,4.16,15.04,0l13.76-13.76v133.867c0,5.333,3.84,10.133,9.067,10.88c6.613,0.96,12.267-4.16,12.267-10.56V132.4 l13.76,13.76c4.16,4.16,10.88,4.16,15.04,0l61.12-60.8h23.253l106.667,106.667L437.36,240.987z"></path> </g> </g> </g></svg>
);

export const PlanetIcon = (props) => (
  <svg viewBox="0 0 55.818 55.818" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g id="Group_6" data-name="Group 6" transform="translate(-1212.948 -289.602)"> <path id="Path_19" data-name="Path 19" d="M1249.54,294.79s-4.5.25-5,6.25a17.908,17.908,0,0,0,2.5,10.5s2.193-1.558-.028,5.971,7.278,14.529,10.778,6.279-.5-11.783,2-12.641a33.771,33.771,0,0,0,5.382-2.6l-3.229-6.081-5.21-5.421-7.43-4.027Z" fill="#d1d3d4"></path> <path id="Path_20" data-name="Path 20" d="M1219.365,331.985s2.675-14.195,6.425-10.695.25,5.5,2.5,9,5.25,1.5,5.5,5.5.755,6.979,2.618,7.241S1222.967,339.984,1219.365,331.985Z" fill="#d1d3d4"></path> <path id="Path_21" data-name="Path 21" d="M1266.766,317.511a25.909,25.909,0,1,1-25.91-25.909A25.909,25.909,0,0,1,1266.766,317.511Z" fill="none" stroke="#bee324" stroke-linecap="round" stroke-linejoin="round" stroke-width="4"></path> <path id="Path_22" data-name="Path 22" d="M1240.122,311.619a6.078,6.078,0,1,1-6.078-6.079A6.079,6.079,0,0,1,1240.122,311.619Z" fill="#d1d3d4"></path> </g> </g></svg>
);

export const OfferIcon = (props) => (
  <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" fill="none" {...props}><path d="M15 13h-3.5C9.6 13 8 14.6 8 16.5c0 1.4-1.1 2.5-2.5 2.5S3 17.9 3 16.5V16c0-3.3 2.7-6 6-6h2" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" /><path d="M11 8v7.9l8.7 8.7c.8.8 2 .8 2.8 0l5-5c.8-.8.8-2 0-2.8L18.9 8H11z" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" /></svg>
);

export const DeliveryIcon = ({ color = "currentColor", ...props }) => (
  <svg viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}><path d="M311.069 130.515c-.963-5.641-5.851-9.768-11.578-9.768H35.43c-7.61 0-13.772 6.169-13.772 13.765 0 7.61 6.162 13.772 13.772 13.772h64.263c7.61 0 13.772 6.17 13.772 13.773 0 7.603-6.162 13.772-13.772 13.772H13.772C6.169 175.829 0 181.998 0 189.601c0 7.603 6.169 13.764 13.772 13.764h117.114c6.72 0 12.172 5.46 12.172 12.18 0 6.72-5.452 12.172-12.172 12.172H68.665c-7.61 0-13.772 6.17-13.772 13.773 0 7.602 6.162 13.772 13.772 13.772h45.857c6.726 0 12.179 5.452 12.179 12.172 0 6.719-5.453 12.172-12.179 12.172H51.215c-7.61 0-13.772 6.169-13.772 13.772 0 7.603 6.162 13.772 13.772 13.772h87.014l5.488 31.042h31.52a38.31 38.31 0 0 0-2.911 14.598c0 21.245 17.218 38.464 38.464 38.464 21.237 0 38.456-17.219 38.456-38.464a38.31 38.31 0 0 0-2.911-14.598h100.04l-35.306-207.676ZM227.342 352.789c0 9.146-7.407 16.553-16.553 16.553-9.152 0-16.56-7.407-16.56-16.553 0-6.364 3.627-11.824 8.892-14.598h15.329c5.264 2.774 8.892 8.234 8.892 14.598Z" fill={color} /><path d="m511.598 314.072-15.799-77.941-57.689-88.759H333.074l32.534 190.819h38.42a38.31 38.31 0 0 0-2.904 14.598c0 21.245 17.219 38.464 38.456 38.464 21.246 0 38.464-17.219 38.464-38.464a38.31 38.31 0 0 0-2.91-14.598h16.741c6.039 0 11.759-2.708 15.582-7.386 3.816-4.669 5.343-10.817 4.141-16.733ZM392.529 182.882h26.314l34.162 52.547h-51.512l-8.964-52.547Zm63.611 169.907c0 9.146-7.407 16.553-16.56 16.553-9.138 0-16.552-7.407-16.552-16.553 0-6.364 3.635-11.824 8.892-14.598h15.329c5.264 2.774 8.891 8.234 8.891 14.598Z" fill={color} /></svg>
);

export const SecurityIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M11.74 17.7499H17.66C17.57 17.8299 17.48 17.8999 17.39 17.9799L13.12 21.1799C11.71 22.2299 9.41001 22.2299 7.99001 21.1799L3.71001 17.9799C2.77001 17.2799 2 15.7299 2 14.5599V7.14986C2 5.92986 2.93001 4.57986 4.07001 4.14986L9.05 2.27986C9.87 1.96986 11.23 1.96986 12.05 2.27986L17.02 4.14986C17.97 4.50986 18.78 5.50986 19.03 6.52986H11.73C11.51 6.52986 11.31 6.53987 11.12 6.53987C9.27 6.64987 8.78999 7.31986 8.78999 9.42986V14.8598C8.79999 17.1598 9.39001 17.7499 11.74 17.7499Z" stroke="#bee324" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M8.80005 11.22H22" stroke="#bee324" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M22 9.41977V14.9698C21.98 17.1898 21.37 17.7397 19.06 17.7397H11.7401C9.39005 17.7397 8.80005 17.1498 8.80005 14.8398V9.40976C8.80005 7.30976 9.28005 6.63974 11.1301 6.51974C11.3201 6.51974 11.5201 6.50977 11.7401 6.50977H19.06C21.41 6.51977 22 7.09977 22 9.41977Z" stroke="#bee324" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M11.3201 15.2598H12.6501" stroke="#bee324" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M14.75 15.2598H18.02" stroke="#bee324" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
);

export const CheckIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M13.8179 4.54512L13.6275 4.27845C12.8298 3.16176 11.1702 3.16176 10.3725 4.27845L10.1821 4.54512C9.76092 5.13471 9.05384 5.45043 8.33373 5.37041L7.48471 5.27608C6.21088 5.13454 5.13454 6.21088 5.27608 7.48471L5.37041 8.33373C5.45043 9.05384 5.13471 9.76092 4.54512 10.1821L4.27845 10.3725C3.16176 11.1702 3.16176 12.8298 4.27845 13.6275L4.54512 13.8179C5.13471 14.2391 5.45043 14.9462 5.37041 15.6663L5.27608 16.5153C5.13454 17.7891 6.21088 18.8655 7.48471 18.7239L8.33373 18.6296C9.05384 18.5496 9.76092 18.8653 10.1821 19.4549L10.3725 19.7215C11.1702 20.8382 12.8298 20.8382 13.6275 19.7215L13.8179 19.4549C14.2391 18.8653 14.9462 18.5496 15.6663 18.6296L16.5153 18.7239C17.7891 18.8655 18.8655 17.7891 18.7239 16.5153L18.6296 15.6663C18.5496 14.9462 18.8653 14.2391 19.4549 13.8179L19.7215 13.6275C20.8382 12.8298 20.8382 11.1702 19.7215 10.3725L19.4549 10.1821C18.8653 9.76092 18.5496 9.05384 18.6296 8.33373L18.7239 7.48471C18.8655 6.21088 17.7891 5.13454 16.5153 5.27608L15.6663 5.37041C14.9462 5.45043 14.2391 5.13471 13.8179 4.54512Z" stroke="#bee324" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M9 12L10.8189 13.8189V13.8189C10.9189 13.9189 11.0811 13.9189 11.1811 13.8189V13.8189L15 10" stroke="#bee324" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
);

export const ReturnIcon = (props) => (
  <svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" fill="#bee324"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M0 0h48v48H0z" fill="none"></path> <g id="Shopicon"> <path d="M10,22v2c0,7.72,6.28,14,14,14s14-6.28,14-14s-6.28-14-14-14h-6.662l3.474-4.298l-3.11-2.515L10.577,12l7.125,8.813 l3.11-2.515L17.338,14H24c5.514,0,10,4.486,10,10s-4.486,10-10,10s-10-4.486-10-10v-2H10z"></path> </g> </g></svg>
);