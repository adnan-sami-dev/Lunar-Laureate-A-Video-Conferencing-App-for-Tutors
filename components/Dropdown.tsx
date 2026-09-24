import { ReactNode, useState, useRef, useEffect } from "react"

const Dropdown = ({trigger, children} : {trigger: ReactNode, children: ReactNode}) => {
    const [isOpen, setIsOpen] = useState(false)
    const ref = useRef<HTMLDivElement>(null)

    useEffect(() => {
        // creating an even listener
        const onClick = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setIsOpen(false)
            }
        }

        // adding the listener to the entire document
        document.addEventListener('mousedown', onClick)

        // removing the listener
        return () => document.removeEventListener('mousedown', onClick)
    }, [])


    return (
        <div ref={ref} className="relative"
            onClick={() => setIsOpen(!isOpen)}>
            <button className='flex items-center justify-center text-white gap-2 bg-gray-700 px-3 py-2
            rounded-2xl border-2 border-primary-text text-xs cursor-pointer transition-colors duration-300 hover:bg-sidebar-hover'
            
            onClick={() => setIsOpen(!isOpen)}>
                {trigger}
            </button>

            {
                isOpen && (
                    <div className='absolute bg-gray-800 p-5 mt-2 min-w-40 rounded-2xl text-sm shadow-lg 
                        cursor-pointer hover:bg-gray-700'>
                        {children}
                    </div>
                )
            }
        </div>
    )
}

export default Dropdown