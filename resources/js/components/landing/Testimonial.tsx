import React from 'react'

export default function Testimonial() {
  return (
    <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {/* Testimonial 1 */}
            <div className="rounded-xl bg-[#111111] p-6 shadow-sm">
                <div className="mb-4 flex">
                    {[...Array(5)].map((_, i) => (
                        <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                    ))}
                </div>
                <p className="mb-4 italic text-gray-400">
                    "The rental process was seamless from start to finish. The car was immaculate and performed beautifully. Will definitely use DriveEasy again!"
                </p>
                <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-gray-700"></div>
                    <div className="ml-4">
                        <h4 className="font-medium">Sarah Johnson</h4>
                        <p className="text-sm text-gray-400">Business Traveler</p>
                    </div>
                </div>
            </div>

            {/* Testimonial 2 */}
            <div className="rounded-xl bg-[#111111] p-6 shadow-sm">
                <div className="mb-4 flex">
                    {[...Array(5)].map((_, i) => (
                        <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                    ))}
                </div>
                <p className="mb-4 italic text-gray-400">
                    "Customer service was outstanding. When my plans changed last minute, they accommodated my schedule change with no hassle at all."
                </p>
                <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-gray-700"></div>
                    <div className="ml-4">
                        <h4 className="font-medium">Michael Thomas</h4>
                        <p className="text-sm text-gray-400">Family Vacation</p>
                    </div>
                </div>
            </div>

            {/* Testimonial 3 */}
            <div className="rounded-xl bg-[#111111] p-6 shadow-sm">
                <div className="mb-4 flex">
                    {[...Array(5)].map((_, i) => (
                        <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                    ))}
                </div>
                <p className="mb-4 italic text-gray-400">
                    "The luxury SUV was perfect for our road trip. Plenty of space, comfort, and amazing fuel efficiency. Pricing was transparent with no surprises."
                </p>
                <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-gray-700"></div>
                    <div className="ml-4">
                        <h4 className="font-medium">Jessica Rodriguez</h4>
                        <p className="text-sm text-gray-400">Road Trip Enthusiast</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
}