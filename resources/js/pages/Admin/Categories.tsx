import React, { useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/layouts/AuthenticatedLayout';
import { User } from '@/types';
import { Plus, X, Loader } from 'lucide-react';
import AddCategoryModal from './AddCategoryModal';

interface Category {
    id: number;
    name: string;
    slug: string;
    description: string;
    icon: string;
}

interface CategoriesProps {
    auth: {
        user: User;
    };
    categories: {
        data: Category[];
        current_page: number;
        last_page: number;
        links: { url: string | null; label: string; active: boolean }[];
        from: number;
        to: number;
        total: number;
    };
}

export default function Categories({ auth, categories }: CategoriesProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        description: '',
        icon: '',
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        post(route('admin.categories.store'), {
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
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            title="Categories Management"
        >
            <Head title="Categories Management" />
            
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div className="flex justify-between items-center mb-6">
                                <h1 className="text-2xl font-semibold text-gray-800">Categories Management</h1>
                                <button
                                    type="button"
                                    onClick={openModal}
                                    className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 flex items-center transition-colors duration-200"
                                    aria-label="Add new category"
                                >
                                    <Plus className="w-4 h-4 mr-2" aria-hidden="true" />
                                    Add New Category
                                </button>
                            </div>

                            {/* Categories Table */}
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Icon</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {categories.data.map((category) => (
                                            <tr key={category.id} className="hover:bg-gray-50">
                                                <td className="px-6 py-4 whitespace-nowrap text-gray-900">{category.name}</td>
                                                <td className="px-6 py-4 text-gray-900">{category.description}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <i className={`${category.icon} text-indigo-600`}></i>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                    <button className="text-indigo-600 hover:text-indigo-900 mr-3 transition-colors duration-200">Edit</button>
                                                    <button className="text-red-600 hover:text-red-900 transition-colors duration-200">Delete</button>
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

            {/* Add Category Modal */}
            {isModalOpen && (
                <AddCategoryModal isOpen={isModalOpen} onClose={closeModal} />

            )}
        </AuthenticatedLayout>
    );
} 