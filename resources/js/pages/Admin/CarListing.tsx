import React, { useState } from 'react';
import { Car } from '@/types';
import { Link, router } from '@inertiajs/react';
import { Pencil, Trash2, Eye } from 'lucide-react';
import { toast } from 'react-hot-toast';

interface CarListingProps {
    cars: {
        data: Car[];
        current_page: number;
        last_page: number;
        links: { url: string | null; label: string; active: boolean }[];
        from: number;
        to: number;
        total: number;
    };
}

export default function CarListing({ cars }: CarListingProps) {
    const [isDeleting, setIsDeleting] = useState<number | null>(null);

    const handleDelete = (carId: number) => {
        if (confirm('Are you sure you want to delete this car?')) {
            setIsDeleting(carId);
            router.delete(route('admin.cars.destroy', carId), {
                onSuccess: () => {
                    setIsDeleting(null);
                },
                onError: () => {
                    setIsDeleting(null);
                }
            });
        }
    };

    return (
        <div className="space-y-6">
            {cars.data.length === 0 ? (
                <div className="bg-white rounded-lg shadow p-6 text-center">
                    <p className="text-gray-500">No cars found. Add a new car to get started.</p>
                </div>
            ) : (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {cars.data.map((car) => (
                            <div key={car.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                                <div className="h-48 bg-gray-200 relative group">
                                    {car.thumbnail ? (
                                        <img 
                                            src={`/storage/${car.thumbnail}`} 
                                            alt={car.name} 
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                        />
                                    ) : (
                                        <div className="flex items-center justify-center h-full bg-gray-100">
                                            <span className="text-gray-400">No Image</span>
                                        </div>
                                    )}
                                    <div className="absolute top-2 right-2 flex gap-2">
                                        <div className="px-2 py-1 text-xs rounded-full bg-opacity-75 bg-gray-800 text-white">
                                            {car.status.charAt(0).toUpperCase() + car.status.slice(1)}
                                        </div>
                                        {!car.is_available && (
                                            <div className="px-2 py-1 text-xs rounded-full bg-opacity-75 bg-red-600 text-white">
                                                Not Available
                                            </div>
                                        )}
                                    </div>
                                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                                        <h3 className="text-lg font-semibold text-white truncate">{car.name}</h3>
                                        <div className="flex items-center text-sm text-white/90">
                                            <span className="mr-2">{car.brand?.name}</span>
                                            <span>•</span>
                                            <span className="mx-2">{car.year}</span>
                                            <span>•</span>
                                            <span className="ml-2">{car.category?.name}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-4">
                                    <div className="flex justify-between items-center mb-3">
                                        <div className="flex items-center">
                                            <span className="text-lg font-bold text-indigo-600">${car.price_per_day}</span>
                                            <span className="text-sm text-gray-500 ml-1">/day</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Link
                                                href={route('admin.cars.edit', car.id)}
                                                className="p-2 text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors duration-200"
                                                title="Edit Car"
                                            >
                                                <Pencil className="w-4 h-4" />
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(car.id)}
                                                disabled={isDeleting === car.id}
                                                className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200 disabled:opacity-50"
                                                title="Delete Car"
                                            >
                                                {isDeleting === car.id ? (
                                                    <div className="w-4 h-4 border-2 border-gray-300 border-t-indigo-600 rounded-full animate-spin" />
                                                ) : (
                                                    <Trash2 className="w-4 h-4" />
                                                )}
                                            </button>
                                            <Link
                                                href={route('cars.show', car.slug)}
                                                className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
                                                title="View Details"
                                            >
                                                <Eye className="w-4 h-4" />
                                            </Link>
                                        </div>
                                    </div>
                                    <div className="flex flex-wrap gap-2 mb-3">
                                        <div className="px-2 py-1 bg-indigo-50 text-indigo-700 text-xs rounded-md">
                                            {car.seats} seats
                                        </div>
                                        <div className="px-2 py-1 bg-indigo-50 text-indigo-700 text-xs rounded-md">
                                            {car.doors} doors
                                        </div>
                                        <div className="px-2 py-1 bg-indigo-50 text-indigo-700 text-xs rounded-md">
                                            {car.transmission.charAt(0).toUpperCase() + car.transmission.slice(1)}
                                        </div>
                                        <div className="px-2 py-1 bg-indigo-50 text-indigo-700 text-xs rounded-md">
                                            {car.fuel_type.charAt(0).toUpperCase() + car.fuel_type.slice(1)}
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center">
                                            <div className="flex items-center">
                                                {[1, 2, 3, 4, 5].map((star) => (
                                                    <svg 
                                                        key={star}
                                                        className={`w-4 h-4 ${star <= Math.round(car.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                                                        fill="currentColor" 
                                                        viewBox="0 0 20 20"
                                                    >
                                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                    </svg>
                                                ))}
                                            </div>
                                            <span className="text-xs text-gray-500 ml-1">
                                                ({car.rating_count})
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    
                    {/* Pagination */}
                    {cars.last_page > 1 && (
                        <div className="flex justify-center mt-8">
                            <nav className="flex items-center space-x-1">
                                {cars.links.map((link, index) => (
                                    <Link
                                        key={index}
                                        href={link.url || '#'}
                                        className={`px-3 py-1 rounded-md text-sm ${
                                            link.active
                                                ? 'bg-indigo-600 text-white'
                                                : link.url === null
                                                ? 'text-gray-400 cursor-not-allowed'
                                                : 'text-gray-700 hover:bg-gray-100'
                                        }`}
                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                    />
                                ))}
                            </nav>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}