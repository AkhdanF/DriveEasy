
import { Head } from "@inertiajs/react"
import Header from "@/components/Public/Header"
import HeroBanner from "@/components/Public/HeroBanner"
import FeaturedCars from "../components/Public/FeaturedCars"
import Footer from "@/components/Public/Footer"

const breadcrumbs = [
  {
    title: "Dashboard",
    href: "/dashboard",
  },
]

export default function Dashboard() {
  return (
    <>
      <Head title="DriveEasy - Rental Mobil Terpercaya" />

      {/* Header */}
      <Header />

      {/* Main Content */}
      <main>
        {/* Hero Banner with Search Form */}
        <HeroBanner />

        {/* Featured Cars Section */}
        <FeaturedCars />

      </main>

      {/* Footer */}
      <Footer />
    </>
  )
}
