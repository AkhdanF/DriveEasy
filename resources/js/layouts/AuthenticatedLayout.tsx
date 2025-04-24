import React, { ReactNode, useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { User as UserType } from '@/types';
import { User, LogOut, X, Menu as MenuIcon } from 'lucide-react';

interface Props {
  children: ReactNode;
  user: UserType;
  title?: string;
  header?: ReactNode;
}

export default function AuthenticatedLayout({ children, user, title, header }: Props) {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = (e: React.FormEvent) => {
    e.preventDefault();
    router.post('/logout');
  };

  // Define navigation items based on user role
  const navigationItems = [
    {
      name: 'Dashboard',
      href: user.role === 'admin' ? '/admin/panel' : '/dashboard',
    },
    {
      name: 'Cars',
      href: user.role === 'admin' ? '/admin/panel/cars' : '/cars',
    },
    {
      name: 'Drivers',
      href: user.role === 'admin' ? '/admin/panel/drivers' : '/drivers',
    },
    {
      name: 'Bookings',
      href: user.role === 'admin' ? '/admin/panel/bookings' : '/bookings',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <Head title={title || 'Dashboard'} />

      {/* Navbar dengan Header Terintegrasi */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo/Brand */}
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="text-xl font-bold text-gray-900">
                Car Rental
              </Link>
            </div>

            {/* Navigation Links */}
            <nav className="hidden md:flex space-x-8">
              {navigationItems.map((item) => (
                <Link 
                  key={item.name}
                  href={item.href}
                  className="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium"
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* User Dropdown & Logout */}
            <div className="hidden md:flex items-center space-x-4">
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center text-gray-700 hover:text-gray-900 focus:outline-none"
                >
                  <span className="mr-2">{user.name}</span>
                  <User className="h-5 w-5" />
                </button>
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg py-1 z-10">
                    {user.role === "admin" && (
                      <Link
                        href="/admin/panel"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                      >
                        Admin Panel
                      </Link>
                    )}
                    <Link
                      href="/dashboard"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                    >
                      Dashboard
                    </Link>
                    <Link
                      href="/profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                    >
                      Profile
                    </Link>
                    <Link
                      href="/bookings"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                    >
                      Bookings
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                    >
                      <div className="flex items-center">
                        <LogOut className="h-4 w-4 mr-2" />
                        Logout
                      </div>
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 focus:outline-none"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-md">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-md"
              >
                {item.name}
              </Link>
            ))}
            <button
              onClick={handleLogout}
              className="w-full text-left block px-3 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-md"
            >
              <div className="flex items-center">
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </div>
            </button>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {header && (
            <div className="mb-6">
              {header}
            </div>
          )}
          {children}
        </div>
      </main>
    </div>
  );
}