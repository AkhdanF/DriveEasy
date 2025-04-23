<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\CarController;
use App\Http\Controllers\DriverController;
use App\Http\Controllers\BookingController;
use App\Http\Controllers\AdminController;

// Public routes
Route::get('/', function () {
    return Inertia::render('landing');
})->name('home');

// Authenticated routes
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', function () {
        // Auto-redirect based on role
        if (auth()->user()->role === 'admin') {
            return redirect()->route('admin.panel');
        }
        
        return Inertia::render('dashboard');
    })->name('dashboard');
    
    // User routes
    Route::middleware('role:user')->group(function () {
        // Cars
        Route::get('/cars', [CarController::class, 'index'])->name('cars.index');
        Route::get('/cars/{car}', [CarController::class, 'show'])->name('cars.show');
        
        // Drivers
        Route::get('/drivers', [DriverController::class, 'index'])->name('drivers.index');
        Route::get('/drivers/{driver}', [DriverController::class, 'show'])->name('drivers.show');
        
        // Bookings
        Route::get('/bookings', [BookingController::class, 'index'])->name('bookings.index');
        Route::get('/bookings/create', [BookingController::class, 'create'])->name('bookings.create');
        Route::post('/bookings', [BookingController::class, 'store'])->name('bookings.store');
        Route::get('/bookings/{booking}', [BookingController::class, 'show'])->name('bookings.show');
        Route::delete('/bookings/{booking}', [BookingController::class, 'destroy'])->name('bookings.destroy');
    });
    
    // Admin routes
    Route::middleware('role:admin')->prefix('admin')->group(function () {
        Route::get('/panel', function () {
            return Inertia::render('Admin/Panel');
        })->name('admin.panel');
        
        // Admin Cars Management
        Route::get('/cars', [AdminController::class, 'carsIndex'])->name('admin.cars.index');
        Route::get('/cars/create', [AdminController::class, 'carsCreate'])->name('admin.cars.create');
        Route::post('/cars', [AdminController::class, 'carsStore'])->name('admin.cars.store');
        Route::get('/cars/{car}/edit', [AdminController::class, 'carsEdit'])->name('admin.cars.edit');
        Route::put('/cars/{car}', [AdminController::class, 'carsUpdate'])->name('admin.cars.update');
        Route::delete('/cars/{car}', [AdminController::class, 'carsDestroy'])->name('admin.cars.destroy');
        
        // Admin Drivers Management
        Route::get('/drivers', [AdminController::class, 'driversIndex'])->name('admin.drivers.index');
        Route::get('/drivers/create', [AdminController::class, 'driversCreate'])->name('admin.drivers.create');
        Route::post('/drivers', [AdminController::class, 'driversStore'])->name('admin.drivers.store');
        Route::get('/drivers/{driver}/edit', [AdminController::class, 'driversEdit'])->name('admin.drivers.edit');
        Route::put('/drivers/{driver}', [AdminController::class, 'driversUpdate'])->name('admin.drivers.update');
        Route::delete('/drivers/{driver}', [AdminController::class, 'driversDestroy'])->name('admin.drivers.destroy');
        
        // Admin Bookings Management
        Route::get('/bookings', [AdminController::class, 'bookingsIndex'])->name('admin.bookings.index');
        Route::get('/bookings/{booking}', [AdminController::class, 'bookingsShow'])->name('admin.bookings.show');
        Route::put('/bookings/{booking}', [AdminController::class, 'bookingsUpdate'])->name('admin.bookings.update');
        Route::delete('/bookings/{booking}', [AdminController::class, 'bookingsDestroy'])->name('admin.bookings.destroy');
        
        // Admin Users Management
        Route::get('/users', [AdminController::class, 'usersIndex'])->name('admin.users.index');
        Route::get('/users/{user}/edit', [AdminController::class, 'usersEdit'])->name('admin.users.edit');
        Route::put('/users/{user}', [AdminController::class, 'usersUpdate'])->name('admin.users.update');
    });
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';