<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CarController;
use App\Http\Controllers\BrandController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\AdminController;

// Public routes (accessible to everyone)
Route::get('/', function () {
    return Inertia::render('landing');
})->name('home');



// Authenticated user routes (accessible to all logged-in users)
Route::middleware(['auth'])->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::get('/cars', [CarController::class, 'index'])->name('cars.index');
    Route::get('/cars/{car}', [CarController::class, 'show'])->name('cars.show');

    // You can add more user-specific routes here
});

// Admin routes (accessible only to users with 'admin' role)
Route::middleware(['auth', 'role:admin'])->prefix('admin/panel')->name('admin.')->group(function () {
    Route::get('/', [AdminController::class, 'index'])->name('index');


// Car management routes
Route::resource('cars', CarController::class)->except(['index', 'show']);
Route::get('/cars', [CarController::class, 'adminIndex'])->name('cars.index');
Route::post('/cars', [CarController::class, 'store'])->name('cars.store');
Route::get('/cars/{car}/edit', [CarController::class, 'edit'])->name('cars.edit');
Route::put('/cars/{car}', [CarController::class, 'update'])->name('cars.update');

// Brand management routes
Route::resource('brands', BrandController::class);

// Category management routes
Route::resource('categories', CategoryController::class);

    
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';


