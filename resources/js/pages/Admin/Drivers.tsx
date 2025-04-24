import AuthenticatedLayout from '@/layouts/AuthenticatedLayout';
import { User } from '@/types'

interface DriverProps {
    auth: {
        user: User;
    };
}

export default function Drivers({auth}: DriverProps) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            title="Bookings Management"
        >
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <h1 className="text-3xl font-bold mb-6">Drivers</h1>
                            {/* Add your car listing or management content here */}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}