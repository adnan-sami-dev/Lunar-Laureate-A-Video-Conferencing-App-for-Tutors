'use client'

import React from 'react'
import { sidebarLinks } from '@/constants'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'

const SideBar = () => {
  const pathname = usePathname()

  return (
    <section className='sticky left-0 top-0 h-screen w-fit flex flex-col 
    justify-between bg-secondary-background p-6 pt-28 text-primary-text max-sm:hidden lg:w-80'>
        <div className='flex flex-col gap-6'>
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
                    :'hover:bg-sidebar-hover'}`}>
                  <Icon size={24} className='max-md:hidden' />
                  <span>{sidebarLink.label}</span>
                </Link>
              )
            })
          }
        </div>
    </section>
  )
}

export default SideBar