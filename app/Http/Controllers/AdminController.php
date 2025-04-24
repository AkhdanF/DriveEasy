<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminController extends Controller
{
    /**
     * Display the admin dashboard.
     */
    public function index()
    {
        return Inertia::render('Admin/Panel', [
            'stats' => [
                'total_cars' => 0, // You can add actual stats here
                'total_brands' => 0,
                'total_categories' => 0,
                'total_bookings' => 0,
            ]
        ]);
    }
}
