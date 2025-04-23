import { Link } from '@inertiajs/react';

export default function Header() {
    return (
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 lg:px-8">
                        <div className="flex items-center">
                            <a href=""><h1 className="text-2xl font-bold text-[#1b1b18] dark:text-[#EDEDEC]">DriveEasy</h1></a>
                        </div>
                        <nav className="hidden items-center gap-8 md:flex">
                            <Link href="#services" className="text-sm font-medium hover:text-[#FF6B35]">Services</Link>
                            <Link href="#footer" className="text-sm font-medium hover:text-[#FF6B35]">About Us</Link>
                        </nav>
                        <div className="flex items-center gap-4">
                            <Link
                                href={route('login')}
                                className="inline-block rounded-sm border border-transparent px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#19140035] dark:text-[#EDEDEC] dark:hover:border-[#3E3E3A]"
                            >
                                Log in
                            </Link>
                            <Link
                                href={route('register')}
                                className="inline-block rounded-sm border border-[#19140035] bg-[#FF6B35] px-5 py-1.5 text-sm font-medium leading-normal text-white hover:bg-[#E85A24] dark:border-[#FF6B35]"
                            >
                                Register
                            </Link>
                        </div>
                    </div>
        );
}