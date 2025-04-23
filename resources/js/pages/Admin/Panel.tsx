// resources/js/Pages/Admin/Panel.tsx
import React from 'react';
import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/layouts/AuthenticatedLayout';
import { User, SharedData } from '@/types';

interface AdminPanelProps {
    auth: {
        user: User;
    };
    // Anda bisa menambahkan props lain sesuai kebutuhan
}

// resources/js/Pages/Admin/Panel.tsx
export default function AdminPanel({ auth }: AdminPanelProps) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            title="Admin Panel" // Tambahkan prop title
        >
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <p>Welcome back, {auth.user.name}!</p>
                            <div className="mt-4">
                                <p className="text-sm text-gray-600">
                                    You have admin privileges and can manage the car rental system.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}