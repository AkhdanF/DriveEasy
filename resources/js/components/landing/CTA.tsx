import { Link } from '@inertiajs/react'

export default function CTA  ()  {
  return (
    <div className="mx-auto max-w-7xl px-6 lg:px-8">
                        <div className="mx-auto max-w-3xl text-center">
                            <h2 className="mb-6 text-3xl font-bold">Ready to Hit the Road?</h2>
                            <p className="mb-8 text-lg text-gray-300">
                                Book your car today and enjoy the freedom of exploring at your own pace.
                            </p>
                            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
                                <Link href="#book-now" className="rounded-md bg-[#FF6B35] px-8 py-3 font-medium text-white hover:bg-[#E85A24]">
                                    Book a Car Now
                                </Link>
                                <Link href="#contact" className="rounded-md border border-white px-8 py-3 font-medium text-white hover:bg-white hover:text-[#0F172A]">
                                    Contact Us
                                </Link>
                            </div>
                        </div>
                    </div>
  )
}
