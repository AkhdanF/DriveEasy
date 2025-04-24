import { Star, Users, Fuel, Settings } from "lucide-react"

const cars = [
  {
    id: 1,
    name: "Toyota Avanza",
    category: "MPV",
    image: "/placeholder.svg?height=200&width=300",
    price: 350000,
    rating: 4.8,
    seats: 7,
    transmission: "Manual",
    fuel: "Bensin",
  },
  {
    id: 2,
    name: "Honda Brio",
    category: "Hatchback",
    image: "/placeholder.svg?height=200&width=300",
    price: 300000,
    rating: 4.7,
    seats: 5,
    transmission: "Automatic",
    fuel: "Bensin",
  },
  {
    id: 3,
    name: "Toyota Innova",
    category: "MPV",
    image: "/placeholder.svg?height=200&width=300",
    price: 450000,
    rating: 4.9,
    seats: 7,
    transmission: "Automatic",
    fuel: "Diesel",
  },
  {
    id: 4,
    name: "Honda HR-V",
    category: "SUV",
    image: "/placeholder.svg?height=200&width=300",
    price: 500000,
    rating: 4.8,
    seats: 5,
    transmission: "Automatic",
    fuel: "Bensin",
  },
]

const FeaturedCars = () => {
  return (
    <section className="py-12 bg-[#111827]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">Mobil Unggulan Kami</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Pilihan mobil terbaik dengan kondisi prima dan harga terjangkau untuk memenuhi kebutuhan perjalanan Anda.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cars.map((car) => (
            <div
              key={car.id}
              className="bg-gray-900 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="relative">
                <img src={car.image || "/placeholder.svg"} alt={car.name} className="w-full h-48 object-cover" />
                <div className="absolute top-2 left-2 bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded">
                  {car.category}
                </div>
              </div>

              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-bold text-white">{car.name}</h3>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    <span className="text-sm text-gray-300 ml-1">{car.rating}</span>
                  </div>
                </div>

                <div className="flex justify-between text-sm text-gray-400 mb-4">
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-1" />
                    <span>{car.seats} Kursi</span>
                  </div>
                  <div className="flex items-center">
                    <Settings className="h-4 w-4 mr-1" />
                    <span>{car.transmission}</span>
                  </div>
                  <div className="flex items-center">
                    <Fuel className="h-4 w-4 mr-1" />
                    <span>{car.fuel}</span>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-lg font-bold text-orange-500">Rp {car.price.toLocaleString()}</span>
                    <span className="text-xs text-gray-400">/hari</span>
                  </div>
                  <a
                    href={`/cars/${car.id}`}
                    className="bg-orange-500 text-white text-sm px-3 py-1.5 rounded hover:bg-orange-600 transition"
                  >
                    Detail
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <a
            href="/cars"
            className="inline-block border-2 border-orange-500 text-orange-500 px-6 py-2 rounded-md font-medium hover:bg-orange-500 hover:text-white transition"
          >
            Lihat Semua Mobil
          </a>
        </div>
      </div>
    </section>
  )
}

export default FeaturedCars
