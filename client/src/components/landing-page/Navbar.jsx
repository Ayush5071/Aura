import {useState} from 'react'
import AnchorLink from 'react-anchor-link-smooth-scroll';
const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const toggleMenu = () => {
      setIsOpen(!isOpen);
    }
  return (
    <div>       <nav className = 'bg-transparent relative z-10'>
    <div className = 'container mx-auto px-4 py-4 flex justify-between items-center'>
      <img src="/landing-page/bg-logo.png" alt="Logo" className="w-28 h-12 mr-2" />
      <div className = "hidden lg:flex space-x-6">
        <AnchorLink href = "#vision" className = "text-white hover:text-red-600">The Visionary</AnchorLink>
        <AnchorLink  href = "#evolution" className = "text-white hover:text-red-600">Evolution of Recyling</AnchorLink>
        <a href = "#features" className = "text-white hover:text-red-600">Features</a>
        <a  href = "#community" className = "text-white hover:text-red-600">Join The Community</a>
        <a href = "#updates" className = "text-white hover:text-red-600">Updates</a>  
      </div>
      <button className = 'lg:hidden text-white focus:outline-none' onClick={toggleMenu}>
        <svg className = "w-6 h-6" fill = "none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
        </svg>
      </button>

    </div>
    <div className={`lg:hidden transition-transform duration-300 ease-in-out transform ${isOpen ? 'translate-y-0' : '-translate-y-full'} overflow-hidden`}>
        {isOpen && (
          <div className="lg:hidden">
            <ul className="flex flex-col space-y-2 p-4 bg-red-600 bg-opacity-90 rounded shadow-lg text-white">
            <a href = "#vision" className = " hover:text-yellow-300 transition">The Visionary</a>
            <a  href = "#evolution" className = "hover:text-yellow-300 transition">Evolution of Recyling</a>
            <a  href = "#features" className = "hover:text-yellow-300 transition">Features</a>
            <a  href = "#community" className = "hover:text-yellow-300 transition">Join The Community</a>
            <a  href = "#updates" className = "hover:text-yellow-300 transition">Updates</a>
            </ul>
          </div>
        )}
    </div>
   </nav></div>
  )
}

export default Navbar