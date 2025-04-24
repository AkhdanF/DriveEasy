"use client"

import type React from "react"
import { useState } from "react"
import { useForm } from "@inertiajs/react"
import { X, Loader } from "lucide-react"

interface AddCategoryModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function AddCategoryModal({ isOpen, onClose }: AddCategoryModalProps) {
  const [isLoading, setIsLoading] = useState(false)

  const { data, setData, post, processing, errors, reset } = useForm({
    name: "",
    description: "",
    icon: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    post(route("admin.categories.store"), {
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

  if (!isOpen) return null

  return (
    <div
  className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 transition-opacity duration-300"
  role="dialog"
  aria-modal="true"
  aria-labelledby="category-modal-title"
>
  <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg mx-4 animate-fade-in">
    <div className="flex justify-between items-center p-6 border-b border-gray-200">
      <h3
        id="category-modal-title"
        className="text-xl font-semibold text-gray-900"
      >
        🗂️ Add New Category
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
        <label htmlFor="category-name" className="block text-sm font-medium text-gray-700 mb-1">
          Category Name
        </label>
        <input
          type="text"
          id="category-name"
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
        <label htmlFor="category-description" className="block text-sm font-medium text-gray-700 mb-1">
          Description
        </label>
        <textarea
          id="category-description"
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
        <label htmlFor="category-icon" className="block text-sm font-medium text-gray-700 mb-1">
          Icon (Font Awesome class)
        </label>
        <input
          type="text"
          id="category-icon"
          value={data.icon}
          onChange={(e) => setData("icon", e.target.value)}
          className="block w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-900"
          placeholder="e.g., fa-car"
        />
        {errors.icon && (
          <p className="text-sm text-red-500 mt-1">{errors.icon}</p>
        )}
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
            "Save Category"
          )}
        </button>
      </div>
    </form>
  </div>
</div>

  )
}
