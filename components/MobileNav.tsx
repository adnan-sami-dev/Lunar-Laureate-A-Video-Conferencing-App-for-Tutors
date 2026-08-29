
import { sidebarLinks } from '@/constants'
import { usePathname } from 'next/navigation'
import { MdClose } from "react-icons/md";
import Link from 'next/link'

const MobileNav = ({closeMobileNav} : {closeMobileNav : () => void}) => {
  const pathname = usePathname()

  return (
    <div className='fixed top-0 left-0 h-full w-3/4 sm:w-1/2 flex flex-col 
      gap-6 bg-secondary-background p-6 pt-30 text-primary-text z-50'>
        <div className='absolute top-10 right-10 cursor-pointer' onClick={closeMobileNav}>
          <MdClose size={24} />
        </div>
        {
          sidebarLinks.map( (sidebarLink) => {
            {/* example scenarios : '/recordings' or '/meetings/123', 
                the latter requiring .startsWith() comparison */}
            const isActive = (pathname === sidebarLink.route) || pathname.startsWith(sidebarLink.route, 1)
            const Icon = sidebarLink.icon

            return (
              <Link href={sidebarLink.route} key={sidebarLink.label} className={`group flex flex-row gap-4 items-center justify-start font-medium
                cursor-pointer rounded-full p-6
                ${isActive 
                  ?'bg-sidebar-active text-text-active'
                  :'hover:bg-sidebar-hover'}`}
                onClick={closeMobileNav}>

                <Icon size={24} className='max-md:hidden' />
                <span>{sidebarLink.label}</span>
                
              </Link>
            )
          })
        }
    </div>
  )
}

export default MobileNav