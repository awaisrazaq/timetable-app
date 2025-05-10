import { useState } from "react"
import { Link } from "react-router-dom"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="bg-white shadow">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-xl font-bold">
            Timetable Manager
          </Link>

          <div className="hidden md:flex space-x-6">
            <Link to="/" className="hover:text-gray-600">
              Home
            </Link>
          </div>

          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {isMenuOpen ? <path d="M18 6L6 18M6 6l12 12" /> : <path d="M3 12h18M3 6h18M3 18h18" />}
            </svg>
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden mt-4 py-2 space-y-2">
            <Link to="/" className="block hover:text-gray-600" onClick={() => setIsMenuOpen(false)}>
              Home
            </Link>
            <Link to="/settings" className="block hover:text-gray-600" onClick={() => setIsMenuOpen(false)}>
              Settings
            </Link>
          </div>
        )}
      </div>
    </header>
  )
}
