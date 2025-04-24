"use client"

import type React from "react"
import { useState, useEffect, useCallback, useMemo } from "react"
import { useForm } from "@inertiajs/react"
import { X, Loader } from "lucide-react"
import type { Category, Brand } from "@/types"

interface AddCarModalProps {
  isOpen: boolean
  onClose: () => void
  categories: Category[]
  brands: Brand[]
}

// File size limit in bytes (5MB)
const MAX_FILE_SIZE = 5 * 1024 * 1024
// Allowed image types
const ALLOWED_FILE_TYPES = ["image/jpeg", "image/png", "image/webp", "image/jpg"]

export default function AddCarModal({ isOpen, onClose, categories, brands }: AddCarModalProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [fileError, setFileError] = useState<string | null>(null)

  const { data, setData, post, processing, errors, reset } = useForm({
    name: "",
    slug: "",
    category_id: "",
    brand_id: "",
    description: "",
    year: new Date().getFullYear(),
    license_plate: "",
    price_per_day: 0,
    price_per_week: 0,
    price_per_month: 0,
    seats: 5,
    doors: 4,
    transmission: "manual",
    fuel_type: "gasoline",
    engine_capacity: "",
    features: [] as string[],
    is_available: true as boolean,
    status: "active",
    thumbnail: null as File | null,
  })

  const transmissionOptions = useMemo(() => ["manual", "automatic", "semi-automatic"], [])
  const fuelTypeOptions = useMemo(() => ["gasoline", "diesel", "electric", "hybrid"], [])
  const statusOptions = useMemo(() => ["active", "maintenance", "repair"], [])

  // Improved form validation
  const validateForm = useCallback(() => {
    const errors: Record<string, string> = {}

    if (!data.name.trim()) errors.name = "Car name is required"
    if (!data.category_id) errors.category_id = "Category is required"
    if (!data.brand_id) errors.brand_id = "Brand is required"
    if (!data.license_plate.trim()) errors.license_plate = "License plate is required"
    if (data.price_per_day <= 0) errors.price_per_day = "Price per day must be greater than 0"

    if (data.price_per_week && data.price_per_week <= 0) {
      errors.price_per_week = "Price per week must be greater than 0"
    }

    if (data.price_per_month && data.price_per_month <= 0) {
      errors.price_per_month = "Price per month must be greater than 0"
    }

    return Object.keys(errors).length === 0 ? null : errors
  }, [data])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Client-side validation
    const validationErrors = validateForm()
    if (validationErrors) {
      // Handle validation errors (you could set these to a state and display them)
      console.error("Validation errors:", validationErrors)
      return
    }

    setIsLoading(true)

    post(route("admin.cars.store"), {
      onSuccess: () => {
        reset()
        onClose()
        setIsLoading(false)
      },
      onError: () => {
        setIsLoading(false)
      },
    })
  }

  // Improved type for handleFeatureChange
  const handleFeatureChange = useCallback(
    (feature: string) => {
      const features = [...(data.features as string[])]

      if (features.includes(feature)) {
        const index = features.indexOf(feature)
        features.splice(index, 1)
      } else {
        features.push(feature)
      }

      setData("features", features)
    },
    [data.features, setData],
  )

  const availableFeatures = useMemo(
    () => [
      "Air Conditioning",
      "GPS Navigation",
      "Bluetooth",
      "Leather Seats",
      "Sunroof",
      "Backup Camera",
      "Keyless Entry",
      "Cruise Control",
      "USB Port",
      "Heated Seats",
    ],
    [],
  )

  const generateSlug = useCallback((name: string) => {
    return name
      .toLowerCase()
      .replace(/[^\w ]+/g, "")
      .replace(/ +/g, "-")
  }, [])

  useEffect(() => {
    if (data.name) {
      setData("slug", generateSlug(data.name))
    }
  }, [data.name, generateSlug, setData])

  // Improved file handling logic
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFileError(null)

    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]

      // Check file size
      if (file.size > MAX_FILE_SIZE) {
        setFileError(`File size exceeds the limit of ${MAX_FILE_SIZE / (1024 * 1024)}MB`)
        e.target.value = ""
        return
      }

      // Check file type
      if (!ALLOWED_FILE_TYPES.includes(file.type)) {
        setFileError("Only JPEG, JPG, PNG and WebP images are allowed")
        e.target.value = ""
        return
      }

      setData("thumbnail", file)
    }
  }

  // Helper function to capitalize first letter
  const capitalize = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1)
  }

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 transition-opacity duration-300"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-5xl mx-4 max-h-[90vh] overflow-y-auto animate-fade-in">
        <div className="sticky top-0 bg-white z-10 flex justify-between items-center p-6 border-b border-gray-200">
          <h3 id="modal-title" className="text-xl font-semibold text-gray-900">
            🚗 Add New Car
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:text-red-500 transition-colors duration-200"
            aria-label="Close modal"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Basic Information */}
            <div className="space-y-5">
              <h4 className="font-semibold text-gray-900">Basic Information</h4>

              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Car Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={data.name}
                  onChange={(e) => setData("name", e.target.value)}
                  className="block w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-900"
                  required
                />
                {errors.name && (
                  <p className="text-sm text-red-500 mt-1">{errors.name}</p>
                )}
              </div>

              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <select
                  id="category"
                  value={data.category_id}
                  onChange={(e) => setData("category_id", e.target.value)}
                  className="block w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-900"
                  required
                >
                  <option value="">Select Category</option>
                  {Array.isArray(categories) && categories.length > 0 ? (
                    categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))
                  ) : (
                    <option disabled>No categories available</option>
                  )}
                </select>
                {errors.category_id && (
                  <p className="text-sm text-red-500 mt-1">{errors.category_id}</p>
                )}
                {Array.isArray(categories) && categories.length === 0 && (
                  <p className="text-amber-600 text-sm mt-1">No categories available. Please add categories first.</p>
                )}
              </div>

              <div>
                <label htmlFor="brand" className="block text-sm font-medium text-gray-700 mb-1">
                  Brand
                </label>
                <select
                  id="brand"
                  value={data.brand_id}
                  onChange={(e) => setData("brand_id", e.target.value)}
                  className="block w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-900"
                  required
                >
                  <option value="">Select Brand</option>
                  {Array.isArray(brands) && brands.length > 0 ? (
                    brands.map((brand) => (
                      <option key={brand.id} value={brand.id}>
                        {brand.name}
                      </option>
                    ))
                  ) : (
                    <option disabled>No brands available</option>
                  )}
                </select>
                {errors.brand_id && (
                  <p className="text-sm text-red-500 mt-1">{errors.brand_id}</p>
                )}
                {Array.isArray(brands) && brands.length === 0 && (
                  <p className="text-amber-600 text-sm mt-1">No brands available. Please add brands first.</p>
                )}
              </div>

              <div>
                <label htmlFor="year" className="block text-sm font-medium text-gray-700 mb-1">
                  Year
                </label>
                <input
                  type="number"
                  id="year"
                  value={data.year}
                  onChange={(e) => setData("year", Number.parseInt(e.target.value))}
                  min="1900"
                  max={new Date().getFullYear() + 1}
                  className="block w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-900"
                  required
                />
                {errors.year && (
                  <p className="text-sm text-red-500 mt-1">{errors.year}</p>
                )}
              </div>

              <div>
                <label htmlFor="license_plate" className="block text-sm font-medium text-gray-700 mb-1">
                  License Plate
                </label>
                <input
                  type="text"
                  id="license_plate"
                  value={data.license_plate}
                  onChange={(e) => setData("license_plate", e.target.value)}
                  className="block w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-900"
                  required
                />
                {errors.license_plate && (
                  <p className="text-sm text-red-500 mt-1">{errors.license_plate}</p>
                )}
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  id="description"
                  value={data.description}
                  onChange={(e) => setData("description", e.target.value)}
                  rows={3}
                  className="block w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-900"
                />
                {errors.description && (
                  <p className="text-sm text-red-500 mt-1">{errors.description}</p>
                )}
              </div>
            </div>

            {/* Specifications & Pricing */}
            <div className="space-y-5">
              <h4 className="font-semibold text-gray-900">Specifications & Pricing</h4>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="seats" className="block text-sm font-medium text-gray-700 mb-1">
                    Seats
                  </label>
                  <input
                    type="number"
                    id="seats"
                    value={data.seats}
                    onChange={(e) => setData("seats", Number.parseInt(e.target.value))}
                    min="1"
                    max="20"
                    className="block w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-900"
                    required
                  />
                  {errors.seats && (
                    <p className="text-sm text-red-500 mt-1">{errors.seats}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="doors" className="block text-sm font-medium text-gray-700 mb-1">
                    Doors
                  </label>
                  <input
                    type="number"
                    id="doors"
                    value={data.doors}
                    onChange={(e) => setData("doors", Number.parseInt(e.target.value))}
                    min="1"
                    max="6"
                    className="block w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-900"
                    required
                  />
                  {errors.doors && (
                    <p className="text-sm text-red-500 mt-1">{errors.doors}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="transmission" className="block text-sm font-medium text-gray-700 mb-1">
                    Transmission
                  </label>
                  <select
                    id="transmission"
                    value={data.transmission}
                    onChange={(e) => setData("transmission", e.target.value)}
                    className="block w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-900"
                    required
                  >
                    {transmissionOptions.map((option) => (
                      <option key={option} value={option}>
                        {capitalize(option)}
                      </option>
                    ))}
                  </select>
                  {errors.transmission && (
                    <p className="text-sm text-red-500 mt-1">{errors.transmission}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="fuel_type" className="block text-sm font-medium text-gray-700 mb-1">
                    Fuel Type
                  </label>
                  <select
                    id="fuel_type"
                    value={data.fuel_type}
                    onChange={(e) => setData("fuel_type", e.target.value)}
                    className="block w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-900"
                    required
                  >
                    {fuelTypeOptions.map((option) => (
                      <option key={option} value={option}>
                        {capitalize(option)}
                      </option>
                    ))}
                  </select>
                  {errors.fuel_type && (
                    <p className="text-sm text-red-500 mt-1">{errors.fuel_type}</p>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="engine_capacity" className="block text-sm font-medium text-gray-700 mb-1">
                  Engine Capacity (cc)
                </label>
                <input
                  type="text"
                  id="engine_capacity"
                  value={data.engine_capacity}
                  onChange={(e) => setData("engine_capacity", e.target.value)}
                  className="block w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-900"
                />
                {errors.engine_capacity && (
                  <p className="text-sm text-red-500 mt-1">{errors.engine_capacity}</p>
                )}
              </div>

              <div>
                <label htmlFor="price_per_day" className="block text-sm font-medium text-gray-700 mb-1">
                  Price Per Day
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500">$</span>
                  </div>
                  <input
                    type="number"
                    id="price_per_day"
                    value={data.price_per_day}
                    onChange={(e) => setData("price_per_day", Number.parseFloat(e.target.value))}
                    min="0"
                    step="0.01"
                    className="block w-full border border-gray-300 rounded-lg pl-7 pr-4 py-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-900"
                    required
                  />
                </div>
                {errors.price_per_day && (
                  <p className="text-sm text-red-500 mt-1">{errors.price_per_day}</p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="price_per_week" className="block text-sm font-medium text-gray-700 mb-1">
                    Price Per Week
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-500">$</span>
                    </div>
                    <input
                      type="number"
                      id="price_per_week"
                      value={data.price_per_week}
                      onChange={(e) => setData("price_per_week", Number.parseFloat(e.target.value))}
                      min="0"
                      step="0.01"
                      className="block w-full border border-gray-300 rounded-lg pl-7 pr-4 py-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-900"
                    />
                  </div>
                  {errors.price_per_week && (
                    <p className="text-sm text-red-500 mt-1">{errors.price_per_week}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="price_per_month" className="block text-sm font-medium text-gray-700 mb-1">
                    Price Per Month
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-500">$</span>
                    </div>
                    <input
                      type="number"
                      id="price_per_month"
                      value={data.price_per_month}
                      onChange={(e) => setData("price_per_month", Number.parseFloat(e.target.value))}
                      min="0"
                      step="0.01"
                      className="block w-full border border-gray-300 rounded-lg pl-7 pr-4 py-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-900"
                    />
                  </div>
                  {errors.price_per_month && (
                    <p className="text-sm text-red-500 mt-1">{errors.price_per_month}</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Additional Features & Status */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Features</h4>
              <div className="grid grid-cols-2 gap-3">
                {availableFeatures.map((feature) => (
                  <div key={feature} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`feature-${feature}`}
                      checked={(data.features as string[])?.includes(feature)}
                      onChange={() => handleFeatureChange(feature)}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                    <label htmlFor={`feature-${feature}`} className="ml-2 block text-sm text-gray-700">
                      {feature}
                    </label>
                  </div>
                ))}
              </div>
              {errors.features && (
                <p className="text-sm text-red-500 mt-1">{errors.features}</p>
              )}
            </div>

            <div className="space-y-5">
              <div>
                <h4 className="font-semibold text-gray-900 mb-4">Status & Availability</h4>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="is_available"
                    checked={data.is_available}
                    onChange={(e) => setData("is_available", e.target.checked)}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <label htmlFor="is_available" className="block text-sm text-gray-700">
                    Available for Booking
                  </label>
                </div>
                {errors.is_available && (
                  <p className="text-sm text-red-500 mt-1">{errors.is_available}</p>
                )}
              </div>

              <div>
                <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                  Car Status
                </label>
                <select
                  id="status"
                  value={data.status}
                  onChange={(e) => setData("status", e.target.value)}
                  className="block w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-900"
                  required
                >
                  {statusOptions.map((option) => (
                    <option key={option} value={option}>
                      {capitalize(option)}
                    </option>
                  ))}
                </select>
                {errors.status && (
                  <p className="text-sm text-red-500 mt-1">{errors.status}</p>
                )}
              </div>

              <div>
                <label htmlFor="thumbnail" className="block text-sm font-medium text-gray-700 mb-1">
                  Thumbnail Image
                </label>
                <input
                  type="file"
                  id="thumbnail"
                  onChange={handleFileChange}
                  accept="image/jpeg,image/png,image/webp,image/jpg"
                  className="block w-full text-sm text-gray-500
                                        file:mr-4 file:py-2 file:px-4
                                        file:rounded-lg file:border-0
                                        file:text-sm file:font-medium
                                        file:bg-indigo-50 file:text-indigo-700
                                        hover:file:bg-indigo-100"
                />
                <p className="mt-1 text-xs text-gray-500">
                  Accepted formats: JPG, JPEG, PNG, WebP. Max size: 5MB
                </p>
                {fileError && (
                  <p className="text-sm text-red-500 mt-1">{fileError}</p>
                )}
                {errors.thumbnail && <p className="text-sm text-red-500 mt-1">{errors.thumbnail}</p>}
              </div>
            </div>
          </div>

          <div className="sticky bottom-0 bg-white z-10 flex justify-end gap-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-100 transition"
              disabled={processing || isLoading}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={processing || isLoading}
              className="px-5 py-2 text-sm font-medium text-white bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg hover:from-indigo-600 hover:to-purple-700 transition disabled:opacity-50 flex items-center"
            >
              {processing || isLoading ? (
                <>
                  <Loader className="w-4 h-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                "Save Car"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
