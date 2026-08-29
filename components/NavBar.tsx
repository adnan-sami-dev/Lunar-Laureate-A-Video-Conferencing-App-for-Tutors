'use client'

import Link from "next/link"
import ThemeToggle from "./ThemeToggle"
import { LuMoonStar } from "react-icons/lu";

const NavBar = () => {
  return (
    <nav className='p-6 flex flex-row justify-between items-center fixed z-10 w-full bg-secondary-background'>
      <Link href='/' className='font-bold text-2xl flex flex-row items-center gap-3'>
        <LuMoonStar size={24} />
        <span className='max-sm:hidden'>Lunar Laureatte</span>
      </Link>

      <div>
        <ThemeToggle />
      </div>
    </nav>
  )
}

export default NavBar