import React, { useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/layouts/AuthenticatedLayout';
import { User } from '@/types';
import { Plus, X, Loader } from 'lucide-react';

interface Brand {
    id: number;
    name: string;
    slug: string;
    description: string;
    logo: string;
}

interface BrandsProps {
    auth: {
        user: User;
    };
    brands: {
        data: Brand[];
        current_page: number;
        last_page: number;
        links: { url: string | null; label: string; active: boolean }[];
        from: number;
        to: number;
        total: number;
    };
}

export default function Brands({ auth, brands }: BrandsProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [fileError, setFileError] = useState<string | null>(null);

    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        description: '',
        logo: null as File | null,
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        post(route('admin.brands.store'), {
            onSuccess: () => {
                reset();
                setIsModalOpen(false);
                setIsLoading(false);
            },
            onError: () => {
                setIsLoading(false);
            }
        });
    };

    const openModal = () => {
        reset();
        setFileError(null);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFileError(null);
        
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            
            // Check file size (5MB limit)
            if (file.size > 5 * 1024 * 1024) {
                setFileError('File size exceeds the limit of 5MB');
                e.target.value = '';
                return;
            }
            
            // Check file type
            if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
                setFileError('Only JPEG, PNG and WebP images are allowed');
                e.target.value = '';
                return;
            }
            
            setData('logo', file);
        }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            title="Brands Management"
        >
            <Head title="Brands Management" />
            
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div className="flex justify-between items-center mb-6">
                                <h1 className="text-2xl font-semibold">Brands Management</h1>
                                <button
                                    type="button"
                                    onClick={openModal}
                                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center"
                                    aria-label="Add new brand"
                                >
                                    <Plus className="w-4 h-4 mr-2" aria-hidden="true" />
                                    Add New Brand
                                </button>
                            </div>

                            {/* Brands Table */}
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Logo</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {brands.data.map((brand) => (
                                            <tr key={brand.id}>
                                                <td className="px-6 py-4 whitespace-nowrap">{brand.name}</td>
                                                <td className="px-6 py-4">{brand.description}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    {brand.logo && (
                                                        <img 
                                                            src={`/storage/${brand.logo}`} 
                                                            alt={`${brand.name} logo`} 
                                                            className="h-10 w-10 object-contain"
                                                        />
                                                    )}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                    <button className="text-blue-600 hover:text-blue-900 mr-3">Edit</button>
                                                    <button className="text-red-600 hover:text-red-900">Delete</button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Add Brand Modal */}
            {isModalOpen && (
                <div 
                    className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50"
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="modal-title"
                >
                    <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
                        <div className="flex justify-between items-center p-6 border-b">
                            <h3 id="modal-title" className="text-lg font-medium">Add New Brand</h3>
                            <button
                                type="button"
                                onClick={closeModal}
                                className="text-gray-400 hover:text-gray-500"
                                aria-label="Close modal"
                            >
                                <X className="w-6 h-6" aria-hidden="true" />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="p-6">
                            <div className="space-y-4">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                        Brand Name
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                        required
                                        aria-describedby="name-error"
                                    />
                                    {errors.name && <div id="name-error" className="text-red-500 text-sm mt-1">{errors.name}</div>}
                                </div>

                                <div>
                                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                                        Description
                                    </label>
                                    <textarea
                                        id="description"
                                        value={data.description}
                                        onChange={(e) => setData('description', e.target.value)}
                                        rows={3}
                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                        aria-describedby="description-error"
                                    />
                                    {errors.description && <div id="description-error" className="text-red-500 text-sm mt-1">{errors.description}</div>}
                                </div>

                                <div>
                                    <label htmlFor="logo" className="block text-sm font-medium text-gray-700">
                                        Logo
                                    </label>
                                    <input
                                        type="file"
                                        id="logo"
                                        onChange={handleFileChange}
                                        accept="image/jpeg,image/png,image/webp"
                                        className="mt-1 block w-full text-sm text-gray-500
                                            file:mr-4 file:py-2 file:px-4
                                            file:rounded-md file:border-0
                                            file:text-sm file:font-medium
                                            file:bg-blue-50 file:text-blue-700
                                            hover:file:bg-blue-100"
                                        aria-describedby="logo-error logo-help"
                                    />
                                    <p id="logo-help" className="mt-1 text-xs text-gray-500">
                                        Accepted formats: JPG, PNG, WebP. Max size: 5MB
                                    </p>
                                    {fileError && <div id="logo-error" className="text-red-500 text-sm mt-1">{fileError}</div>}
                                    {errors.logo && <div className="text-red-500 text-sm mt-1">{errors.logo}</div>}
                                </div>
                            </div>

                            <div className="mt-6 flex justify-end space-x-3">
                                <button
                                    type="button"
                                    onClick={closeModal}
                                    className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                    disabled={processing || isLoading}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={processing || isLoading}
                                    className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 flex items-center"
                                >
                                    {(processing || isLoading) ? (
                                        <>
                                            <Loader className="w-4 h-4 mr-2 animate-spin" aria-hidden="true" />
                                            Saving...
                                        </>
                                    ) : 'Save Brand'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </AuthenticatedLayout>
    );
} 