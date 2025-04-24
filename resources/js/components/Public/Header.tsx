"use client"

import { useState } from "react"
import { Link, usePage } from "@inertiajs/react"
import { Menu, X, ChevronDown, Car, User, LogOut } from "lucide-react"

const Header = () => {
  const { auth } = usePage().props as any
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)

  return (
    <header className="bg-black shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <Car className="h-8 w-8 text-white" />
              <span className="ml-2 text-xl font-bold text-white">DriveEasy</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link href="/" className="text-white hover:text-orange-500 px-3 py-2 text-sm font-medium">
              Beranda
            </Link>
            <Link href="/cars" className="text-white hover:text-orange-500 px-3 py-2 text-sm font-medium">
              Mobil Kami
            </Link>
            <div className="relative group">
              <button className="flex items-center text-white hover:text-orange-500 px-3 py-2 text-sm font-medium">
                Layanan
                <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              <div className="absolute left-0 mt-2 w-48 bg-gray-900 rounded-md shadow-lg py-1 z-10 hidden group-hover:block">
                <Link
                  href="/services/with-driver"
                  className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 hover:text-orange-500"
                >
                  Dengan Sopir
                </Link>
                <Link
                  href="/services/self-drive"
                  className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 hover:text-orange-500"
                >
                  Lepas Kunci
                </Link>
                <Link
                  href="/services/long-term"
                  className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 hover:text-orange-500"
                >
                  Sewa Jangka Panjang
                </Link>
              </div>
            </div>
            <Link href="/about" className="text-white hover:text-orange-500 px-3 py-2 text-sm font-medium">
              Tentang Kami
            </Link>
            <Link href="/contact" className="text-white hover:text-orange-500 px-3 py-2 text-sm font-medium">
              Kontak
            </Link>
          </nav>

          {/* User Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {auth.user ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center text-white hover:text-orange-500 focus:outline-none"
                >
                  <span className="mr-2">{auth.user.name}</span>
                  <User className="h-5 w-5" />
                </button>
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-gray-900 rounded-md shadow-lg py-1 z-10">
                    {auth.user.role === "admin" && (
                      <Link
                        href="/admin/panel"
                        className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 hover:text-orange-500"
                      >
                        Admin Panel
                      </Link>
                    )}
                    <Link
                      href="/dashboard"
                      className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 hover:text-orange-500"
                    >
                      Dashboard
                    </Link>
                    <Link
                      href="/profile"
                      className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 hover:text-orange-500"
                    >
                      Profile
                    </Link>
                    <Link
                      href="/bookings"
                      className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 hover:text-orange-500"
                    >
                      Bookings
                    </Link>
                    <Link
                      href="/logout"
                      method="post"
                      as="button"
                      className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 hover:text-orange-500"
                    >
                      <div className="flex items-center">
                        <LogOut className="h-4 w-4 mr-2" />
                        Logout
                      </div>
                    </Link>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link href="/login" className="text-white hover:text-orange-500">
                  Log in
                </Link>
                <Link
                  href="/register"
                  className="bg-orange-500 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-orange-600"
                >
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-orange-500 hover:bg-gray-900 focus:outline-none"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-gray-900">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              href="/"
              className="block px-3 py-2 text-base font-medium text-white hover:text-orange-500 hover:bg-gray-800 rounded-md"
            >
              Beranda
            </Link>
            <Link
              href="/cars"
              className="block px-3 py-2 text-base font-medium text-white hover:text-orange-500 hover:bg-gray-800 rounded-md"
            >
              Mobil Kami
            </Link>
            <button className="flex items-center justify-between w-full px-3 py-2 text-base font-medium text-white hover:text-orange-500 hover:bg-gray-800 rounded-md">
              Layanan
              <ChevronDown className="h-4 w-4" />
            </button>
            <div className="pl-4">
              <Link
                href="/services/with-driver"
                className="block px-3 py-2 text-sm text-gray-300 hover:bg-gray-800 hover:text-orange-500 rounded-md"
              >
                Dengan Sopir
              </Link>
              <Link
                href="/services/self-drive"
                className="block px-3 py-2 text-sm text-gray-300 hover:bg-gray-800 hover:text-orange-500 rounded-md"
              >
                Lepas Kunci
              </Link>
              <Link
                href="/services/long-term"
                className="block px-3 py-2 text-sm text-gray-300 hover:bg-gray-800 hover:text-orange-500 rounded-md"
              >
                Sewa Jangka Panjang
              </Link>
            </div>
            <Link
              href="/about"
              className="block px-3 py-2 text-base font-medium text-white hover:text-orange-500 hover:bg-gray-800 rounded-md"
            >
              Tentang Kami
            </Link>
            <Link
              href="/contact"
              className="block px-3 py-2 text-base font-medium text-white hover:text-orange-500 hover:bg-gray-800 rounded-md"
            >
              Kontak
            </Link>
          </div>
          <div className="pt-4 pb-3 border-t border-gray-800">
            {auth.user ? (
              <div className="px-2 space-y-1">
                <div className="px-3 py-2 text-base font-medium text-white">{auth.user.name}</div>
                {auth.user.role === "admin" && (
                  <Link
                    href="/admin/panel"
                    className="block px-3 py-2 text-base font-medium text-gray-300 hover:text-orange-500 hover:bg-gray-800 rounded-md"
                  >
                    Admin Panel
                  </Link>
                )}
                <Link
                  href="/dashboard"
                  className="block px-3 py-2 text-base font-medium text-gray-300 hover:text-orange-500 hover:bg-gray-800 rounded-md"
                >
                  Dashboard
                </Link>
                <Link
                  href="/profile"
                  className="block px-3 py-2 text-base font-medium text-gray-300 hover:text-orange-500 hover:bg-gray-800 rounded-md"
                >
                  Profile
                </Link>
                <Link
                  href="/bookings"
                  className="block px-3 py-2 text-base font-medium text-gray-300 hover:text-orange-500 hover:bg-gray-800 rounded-md"
                >
                  Bookings
                </Link>
                <Link
                  href="/logout"
                  method="post"
                  as="button"
                  className="block w-full text-left px-3 py-2 text-base font-medium text-gray-300 hover:text-orange-500 hover:bg-gray-800 rounded-md"
                >
                  <div className="flex items-center">
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </div>
                </Link>
              </div>
            ) : (
              <div className="flex items-center justify-between px-5">
                <Link
                  href="/login"
                  className="block px-3 py-2 text-base font-medium text-white hover:text-orange-500 hover:bg-gray-800 rounded-md"
                >
                  Log in
                </Link>
                <Link
                  href="/register"
                  className="bg-orange-500 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-orange-600"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  )
}

export default Header
