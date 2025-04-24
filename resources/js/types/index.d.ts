import { LucideIcon } from 'lucide-react';
import type { Config } from 'ziggy-js';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: string;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    ziggy: Config & { location: string };
    sidebarOpen: boolean;
    [key: string]: unknown;
}

export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    role: 'admin' | 'user'; // Tambahkan ini
    [key: string]: unknown;
}

export interface Category {
    id: number;
    name: string;
    slug: string;
    description?: string;
    created_at: string;
    updated_at: string;
}

export interface Brand {
    id: number;
    name: string;
    slug: string;
    description?: string;
    logo?: string;
    created_at: string;
    updated_at: string;
}

export interface Car {
    id: number;
    name: string;
    slug: string;
    category_id: number;
    category?: Category;
    brand_id: number;
    brand?: Brand;
    description?: string;
    year: number;
    license_plate: string;
    price_per_day: number;
    price_per_week?: number;
    price_per_month?: number;
    seats: number;
    doors: number;
    transmission: string;
    fuel_type: string;
    engine_capacity?: string;
    features: string[];
    is_available: boolean;
    status: string;
    thumbnail?: string;
    rating: number;
    rating_count: number;
    created_at: string;
    updated_at: string;
    deleted_at?: string;
    images?: CarImage[];
    reviews?: Review[];
}

export interface CarImage {
    id: number;
    car_id: number;
    path: string;
    created_at: string;
    updated_at: string;
}

export interface Review {
    id: number;
    car_id: number;
    user_id: number;
    user?: User;
    rating: number;
    comment?: string;
    created_at: string;
    updated_at: string;
}

export interface Booking {
    id: number;
    user_id: number;
    car_id: number;
    user?: User;
    car?: Car;
    start_date: string;
    end_date: string;
    total_price: number;
    status: string;
    created_at: string;
    updated_at: string;
}


export type PageProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
    auth: {
        user: User;
    };
};

