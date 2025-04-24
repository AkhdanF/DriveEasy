"use client"

import { useState, useEffect } from "react"
import { Head } from "@inertiajs/react"
import AuthenticatedLayout from "@/layouts/AuthenticatedLayout"
import type { User, Category, Brand, Car } from "@/types"
import { Plus, Tag, CarIcon } from "lucide-react"
import CarListing from "./CarListing"
import AddCarModal from "./AddCarModal"
import AddCategoryModal from "./AddCategoryModal"
import AddBrandModal from "./AddBrandModal"

interface CarsProps {
    auth: {
    user: User
  }
  categories: Category[]
  brands: Brand[]
    cars: {
    data: Car[]
    current_page: number
    last_page: number
    links: { url: string | null; label: string; active: boolean }[]
    from: number
    to: number
    total: number
  }
}

export default function Cars({ auth, categories, brands, cars }: CarsProps) {
  const [isCarModalOpen, setIsCarModalOpen] = useState(false)
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false)
  const [isBrandModalOpen, setIsBrandModalOpen] = useState(false)
    
    // Debug logging for categories and brands
    useEffect(() => {
    console.log("Categories received:", categories)
    console.log("Brands received:", brands)
  }, [categories, brands])

    return (
    <AuthenticatedLayout user={auth.user} title="Cars Management">
            <Head title="Cars Management" />
            
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div className="flex justify-between items-center mb-6">
                                <h1 className="text-2xl font-semibold">Cars Management</h1>
                                <div className="flex space-x-2">
                                    <button
                                        type="button"
                                        onClick={() => setIsCategoryModalOpen(true)}
                                        className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 flex items-center"
                                        aria-label="Add new category"
                                    >
                                        <Tag className="w-4 h-4 mr-2" aria-hidden="true" />
                                        Add Category
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setIsBrandModalOpen(true)}
                                        className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 flex items-center"
                                        aria-label="Add new brand"
                                    >
                    <CarIcon className="w-4 h-4 mr-2" aria-hidden="true" />
                                        Add Brand
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setIsCarModalOpen(true)}
                                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center"
                                        aria-label="Add new car"
                                    >
                                        <Plus className="w-4 h-4 mr-2" aria-hidden="true" />
                                        Add New Car
                                    </button>
                                </div>
                            </div>
                            
              <div className="bg-gray-100 p-6 rounded-md">
                            <CarListing cars={cars} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
      {/* Modals */}
            {isCarModalOpen && (
        <AddCarModal
          isOpen={isCarModalOpen}
          onClose={() => setIsCarModalOpen(false)}
          categories={categories}
          brands={brands}
        />
      )}

            {isCategoryModalOpen && (
        <AddCategoryModal isOpen={isCategoryModalOpen} onClose={() => setIsCategoryModalOpen(false)} />
      )}

      {isBrandModalOpen && <AddBrandModal isOpen={isBrandModalOpen} onClose={() => setIsBrandModalOpen(false)} />}
        </AuthenticatedLayout>
  )
}
