
import { LuLoaderCircle } from "react-icons/lu";

const Loader = () => {
  return (
    <div className="flex items-center justify-center w-full h-screen animate-spin">
      <LuLoaderCircle size={50} />
    </div>
  )
}

export default Loader