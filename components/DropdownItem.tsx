import { ReactNode } from "react"


const DropdownItem = ({onClick, children} : {onClick:()=>void, children: ReactNode}) => {
  return (
    <div onClick={onClick}
      className = 'w-full rounded-2xl px-3 py-2 text-left text-xs text-white \
      transition-colors hover:bg-sidebar-hover'>
      {children}
    </div>
  )
}

export default DropdownItem