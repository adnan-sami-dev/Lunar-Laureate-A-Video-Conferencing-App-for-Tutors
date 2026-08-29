'use client'

import Link from "next/link"
import ThemeToggle from "./ThemeToggle"
import { LuMoonStar } from "react-icons/lu";
import { MdMenu } from "react-icons/md";
import { useState } from "react";
import MobileNav from "./MobileNav";

const NavBar = () => {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false)

  const toggleMobileNav = () => {
    setIsMobileNavOpen(!isMobileNavOpen)
  }

  const closeMobileNav = () => {
    setIsMobileNavOpen(false)
  }

  return (
    <>
      <nav className='p-6 flex flex-row justify-between items-center fixed z-10 w-full bg-secondary-background'>
        <Link href='/' className='font-bold text-2xl flex flex-row items-center gap-3'>
          <LuMoonStar size={24} />
          <span className='max-sm:hidden'>Lunar Laureatte</span>
        </Link>

        <div className='flex flex-row items-center justify-center gap-2'>
          <div>
            {/* clerk user management */}
          </div>
          <ThemeToggle />
          <button className='cursor-pointer lg:hidden' onClick={toggleMobileNav}>
            <MdMenu size={24} />
          </button>
        </div>
      </nav>

      {/* Mobile Nav */}

      <MobileNav closeMobileNav={closeMobileNav} isMobileNavOpen={isMobileNavOpen} />
    </>
  )
}

export default NavBar