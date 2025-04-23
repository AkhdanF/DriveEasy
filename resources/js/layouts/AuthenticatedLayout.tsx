// resources/js/Layouts/AuthenticatedLayout.tsx
import React, { ReactNode } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { User } from '@/types';

interface Props {
  children: ReactNode;
  user: User;
  title?: string;
  header?: ReactNode;
}

export default function AuthenticatedLayout({ children, user, title, header }: Props) {
  const handleLogout = (e: React.FormEvent) => {
    e.preventDefault();
    router.post('/logout');
  };

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
              <Link 
                href={user.role === 'admin' ? '/admin/panel' : '/dashboard'} 
                className="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium"
              >
                Dashboard
              </Link>
              <Link 
                href={user.role === 'admin' ? '/admin/panel' : '/cars'} 
                className="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium"
              >
                Cars
              </Link>
              <Link 
                href={user.role === 'admin' ? '/admin/panel' : '/drivers'} 
                className="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium"
              >
                Drivers
              </Link>
              <Link 
                href={user.role === 'admin' ? '/admin/panel' : '/bookings'} 
                className="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium"
              >
                Bookings
              </Link>
              {/* Tambahkan menu lain sesuai kebutuhan */}
            </nav>

            {/* User Dropdown & Logout */}
            <div className="ml-4 flex items-center md:ml-6">
              <div className="ml-3 relative">
                <div className="flex items-center space-x-4">
                  <span className="text-sm font-medium text-gray-700">
                    {user.name}
                  </span>
                  <form onSubmit={handleLogout}>
                    <button
                      type="submit"
                      className="text-sm text-gray-500 hover:text-gray-700"
                    >
                      Logout
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {children}
        </div>
      </main>
    </div>
  );
}