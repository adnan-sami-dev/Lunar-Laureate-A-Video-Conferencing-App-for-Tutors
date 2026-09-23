import { useState } from "react"

const Dropdown = () => {
    const [isOpen, setIsOpen] = useState(false)
    return (
    <button className='flex items-center justify-center text-white gap-2 bg-gray-700 px-3 py-2
    rounded-2xl border-2 border-primary-text text-xs cursor-pointer transition-colors duration-300 hover:bg-sidebar-hover'
    
    onClick={() => setIsOpen(!isOpen)}>
        {isOpen? "Close" : "Open"}
    </button>
    )
}

export default Dropdown