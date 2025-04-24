import { Link } from "@inertiajs/react"
import { Car, Mail, Phone, MapPin, Facebook, Instagram, Twitter } from "lucide-react"

const Footer = () => {
  return (
    <footer className="bg-black text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center mb-4">
              <Car className="h-8 w-8 text-orange-500" />
              <span className="ml-2 text-xl font-bold">DriveEasy</span>
            </div>
            <p className="text-gray-400 mb-4">
              Solusi rental mobil terpercaya dengan armada berkualitas dan layanan prima untuk kebutuhan transportasi
              Anda.
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com" className="text-gray-400 hover:text-orange-500">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="https://instagram.com" className="text-gray-400 hover:text-orange-500">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="https://twitter.com" className="text-gray-400 hover:text-orange-500">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Link Cepat</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-gray-400 hover:text-orange-500">
                  Tentang Kami
                </Link>
              </li>
              <li>
                <Link href="/cars" className="text-gray-400 hover:text-orange-500">
                  Mobil Kami
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-gray-400 hover:text-orange-500">
                  Layanan
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-gray-400 hover:text-orange-500">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-400 hover:text-orange-500">
                  Syarat & Ketentuan
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-400 hover:text-orange-500">
                  Kebijakan Privasi
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Layanan Kami</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/services/with-driver" className="text-gray-400 hover:text-orange-500">
                  Rental Dengan Sopir
                </Link>
              </li>
              <li>
                <Link href="/services/self-drive" className="text-gray-400 hover:text-orange-500">
                  Rental Lepas Kunci
                </Link>
              </li>
              <li>
                <Link href="/services/long-term" className="text-gray-400 hover:text-orange-500">
                  Sewa Jangka Panjang
                </Link>
              </li>
              <li>
                <Link href="/services/airport" className="text-gray-400 hover:text-orange-500">
                  Antar Jemput Bandara
                </Link>
              </li>
              <li>
                <Link href="/services/corporate" className="text-gray-400 hover:text-orange-500">
                  Layanan Korporat
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Hubungi Kami</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-orange-500 mr-2 mt-0.5" />
                <span className="text-gray-400">Jl. Raya Utama No. 123, Jakarta Selatan, Indonesia</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 text-orange-500 mr-2" />
                <span className="text-gray-400">+62 812-3456-7890</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 text-orange-500 mr-2" />
                <span className="text-gray-400">info@driveeasy.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8">
          <p className="text-center text-gray-400">&copy; {new Date().getFullYear()} DriveEasy. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
