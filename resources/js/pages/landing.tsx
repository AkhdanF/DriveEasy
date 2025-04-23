import CTA from '@/components/landing/CTA';
import Footer from '@/components/landing/Footer';
import Header from '@/components/landing/Header';
import Hero from '@/components/landing/Hero';
import Service from '@/components/landing/Service';
import Testimonial from '@/components/landing/Testimonial';
import { Head } from '@inertiajs/react';

export default function Landing() {
    return (
        <>
            <Head title="DriveEasy - Premium Car Rental">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            <div className="flex min-h-screen flex-col bg-[#0a0a0a] text-[#EDEDEC]">
                {/* Navigation Bar */}
                <header className="sticky top-0 z-10 w-full bg-[#0a0a0a]/90 py-4 backdrop-blur-sm">
                    <Header />
                </header>

                {/* Hero Section */}
<section className="w-full min-h-screen bg-[#0c1425] flex items-center py-20 px-4 md:px-10">
  <Hero />
</section>


                {/* Services Section */}
                <section id="services" className="w-full bg-[#0a0a0a] py-20">
                    <div className="mx-auto max-w-7xl px-6 lg:px-8">
                        <h2 className="mb-4 text-center text-3xl font-bold">Our Services</h2>
                        <p className="mx-auto mb-12 max-w-2xl text-center text-gray-400">
                            We offer comprehensive car rental services to meet all your needs.
                        </p>
                    </div>
                    <Service/>
                </section>

                {/* Testimonials Section */}
                <section className="w-full bg-[#0a0a0a] py-20">
                    <div className="mx-auto max-w-7xl px-6 lg:px-8">
                        <h2 className="mb-4 text-center text-3xl font-bold">What Our Customers Say</h2>
                        <p className="mx-auto mb-12 max-w-2xl text-center text-gray-400">
                            Don't just take our word for it. Hear from our satisfied customers.
                        </p>
                    </div>
                    <Testimonial/>
                </section>

                {/* CTA Section */}
                <section className="w-full bg-[#0F172A] py-16">
                    <CTA />
                </section>

                {/* Footer */}
                <footer id="footer" className="w-full bg-[#0a0a0a] py-12">
                    <Footer />
                </footer>
            </div>
        </>
    );
}