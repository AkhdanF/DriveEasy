"use client"

import type React from "react"
import { useState } from "react"
import { useForm } from "@inertiajs/react"
import { X, Loader } from "lucide-react"
import { router } from "@inertiajs/react"

interface AddBrandModalProps {
  isOpen: boolean
  onClose: () => void
}

// File size limit in bytes (5MB)
const MAX_FILE_SIZE = 5 * 1024 * 1024
// Allowed image types
const ALLOWED_FILE_TYPES = ["image/jpeg", "image/png", "image/webp"]

export default function AddBrandModal({ isOpen, onClose }: AddBrandModalProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [fileError, setFileError] = useState<string | null>(null)

  const { data, setData, post, processing, errors, reset } = useForm({
    name: "",
    description: "",
    logo: null as File | null,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    router.post(route("admin.brands.store"), data, {
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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFileError(null)

    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]

      if (file.size > MAX_FILE_SIZE) {
        setFileError("File size exceeds the limit of 5MB")
        e.target.value = ""
        return
      }

      if (!ALLOWED_FILE_TYPES.includes(file.type)) {
        setFileError("Only JPEG, PNG and WebP images are allowed")
        e.target.value = ""
        return
      }

      setData("logo", file)
    }
  }

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 transition-opacity duration-300"
      role="dialog"
      aria-modal="true"
      aria-labelledby="brand-modal-title"
    >
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 animate-fade-in">
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h3 id="brand-modal-title" className="text-xl font-semibold text-gray-900">
            🏢 Add New Brand
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
          <div>
            <label htmlFor="brand-name" className="block text-sm font-medium text-gray-700 mb-1">
              Brand Name
            </label>
            <input
              type="text"
              id="brand-name"
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
            <label htmlFor="brand-description" className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              id="brand-description"
              value={data.description}
              onChange={(e) => setData("description", e.target.value)}
              rows={3}
              className="block w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-900"
            />
            {errors.description && (
              <p className="text-sm text-red-500 mt-1">{errors.description}</p>
            )}
          </div>

          <div>
            <label htmlFor="brand-logo" className="block text-sm font-medium text-gray-700 mb-1">
              Logo
            </label>
            <input
              type="file"
              id="brand-logo"
              onChange={handleFileChange}
              accept="image/jpeg,image/png,image/webp"
              className="block w-full text-sm text-gray-500
                                    file:mr-4 file:py-2 file:px-4
                                    file:rounded-lg file:border-0
                                    file:text-sm file:font-medium
                                    file:bg-indigo-50 file:text-indigo-700
                                    hover:file:bg-indigo-100"
            />
            <p className="mt-1 text-xs text-gray-500">
              Accepted formats: JPG, PNG, WebP. Max size: 5MB
            </p>
            {fileError && (
              <p className="text-sm text-red-500 mt-1">{fileError}</p>
            )}
            {errors.logo && <p className="text-sm text-red-500 mt-1">{errors.logo}</p>}
          </div>

          <div className="flex justify-end gap-3 pt-4">
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
                "Save Brand"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
