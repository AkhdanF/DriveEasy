<?php

namespace App\Http\Controllers;

use App\Models\Car;
use App\Models\Brand;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class CarController extends Controller
{
    /**
     * Display a listing of the cars.
     */
    public function index()
    {
        $cars = Car::with(['category', 'brand'])
            ->latest()
            ->paginate(10);
            
        $categories = Category::all();
        $brands = Brand::all();
        
        return Inertia::render('Cars', [
            'cars' => $cars,
            'categories' => $categories,
            'brands' => $brands,
        ]);
    }
    
    /**
     * Store a newly created car in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'category_id' => 'required|exists:categories,id',
            'brand_id' => 'required|exists:brands,id',
            'description' => 'nullable|string',
            'year' => 'required|integer|min:1900|max:' . (date('Y') + 1),
            'license_plate' => 'required|string|max:20|unique:cars',
            'price_per_day' => 'required|numeric|min:0',
            'price_per_week' => 'nullable|numeric|min:0',
            'price_per_month' => 'nullable|numeric|min:0',
            'seats' => 'required|integer|min:1|max:20',
            'doors' => 'required|integer|min:1|max:6',
            'transmission' => 'required|in:manual,automatic,semi-automatic',
            'fuel_type' => 'required|in:gasoline,diesel,electric,hybrid',
            'engine_capacity' => 'nullable|string|max:20',
            'features' => 'nullable|array',
            'is_available' => 'boolean',
            'status' => 'required|in:active,maintenance,repair',
            'thumbnail' => 'nullable|image|max:2048',
        ]);
        
        // Generate slug
        $slug = Str::slug($request->name);
        $originalSlug = $slug;
        $count = 1;
        
        // Make sure slug is unique
        while (Car::where('slug', $slug)->exists()) {
            $slug = $originalSlug . '-' . $count;
            $count++;
        }
        
        // Handle thumbnail upload
        $thumbnailPath = null;
        if ($request->hasFile('thumbnail')) {
            $thumbnailPath = $request->file('thumbnail')->store('cars', 'public');
        }
        
        // Create car
        $car = Car::create([
            'name' => $request->name,
            'slug' => $slug,
            'category_id' => $request->category_id,
            'brand_id' => $request->brand_id,
            'description' => $request->description,
            'year' => $request->year,
            'license_plate' => $request->license_plate,
            'price_per_day' => $request->price_per_day,
            'price_per_week' => $request->price_per_week,
            'price_per_month' => $request->price_per_month,
            'seats' => $request->seats,
            'doors' => $request->doors,
            'transmission' => $request->transmission,
            'fuel_type' => $request->fuel_type,
            'engine_capacity' => $request->engine_capacity,
            'features' => $request->features,
            'is_available' => $request->is_available,
            'status' => $request->status,
            'thumbnail' => $thumbnailPath,
            'rating' => 0,
            'rating_count' => 0,
        ]);
        
        // Get updated data
        $cars = Car::with(['category', 'brand'])
            ->withTrashed()
            ->latest()
            ->paginate(10);
            
        $categories = Category::all();
        $brands = Brand::all();
        
        return to_route('admin.cars.index')->with([
            'cars' => $cars,
            'categories' => $categories,
            'brands' => $brands,
            'success' => 'Car created successfully!'
        ]);
    }
    
    /**
     * Show car details.
     */
    public function show($slug)
    {
        $car = Car::with(['category', 'brand', 'images', 'reviews'])
            ->where('slug', $slug)
            ->firstOrFail();
            
        return Inertia::render('CarDetails', [
            'car' => $car
        ]);
    }
    
    /**
     * Update the specified car in storage.
     */
    public function update(Request $request, Car $car)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'category_id' => 'required|exists:categories,id',
            'brand_id' => 'required|exists:brands,id',
            'description' => 'nullable|string',
            'year' => 'required|integer|min:1900|max:' . (date('Y') + 1),
            'license_plate' => 'required|string|max:20|unique:cars,license_plate,' . $car->id,
            'price_per_day' => 'required|numeric|min:0',
            'price_per_week' => 'nullable|numeric|min:0',
            'price_per_month' => 'nullable|numeric|min:0',
            'seats' => 'required|integer|min:1|max:20',
            'doors' => 'required|integer|min:1|max:6',
            'transmission' => 'required|in:manual,automatic,semi-automatic',
            'fuel_type' => 'required|in:gasoline,diesel,electric,hybrid',
            'engine_capacity' => 'nullable|string|max:20',
            'features' => 'nullable|array',
            'is_available' => 'boolean',
            'status' => 'required|in:active,maintenance,repair',
            'thumbnail' => 'nullable|image|max:2048',
        ]);
        
        // Generate new slug if name changed
        if ($car->name !== $request->name) {
            $slug = Str::slug($request->name);
            $originalSlug = $slug;
            $count = 1;
            
            while (Car::where('slug', $slug)->where('id', '!=', $car->id)->exists()) {
                $slug = $originalSlug . '-' . $count;
                $count++;
            }
            
            $car->slug = $slug;
        }
        
        // Handle thumbnail upload
        if ($request->hasFile('thumbnail')) {
            // Delete old thumbnail if exists
            if ($car->thumbnail && Storage::disk('public')->exists($car->thumbnail)) {
                Storage::disk('public')->delete($car->thumbnail);
            }
            
            $thumbnailPath = $request->file('thumbnail')->store('cars', 'public');
            $car->thumbnail = $thumbnailPath;
        }
        
        // Update car
        $car->name = $request->name;
        $car->category_id = $request->category_id;
        $car->brand_id = $request->brand_id;
        $car->description = $request->description;
        $car->year = $request->year;
        $car->license_plate = $request->license_plate;
        $car->price_per_day = $request->price_per_day;
        $car->price_per_week = $request->price_per_week;
        $car->price_per_month = $request->price_per_month;
        $car->seats = $request->seats;
        $car->doors = $request->doors;
        $car->transmission = $request->transmission;
        $car->fuel_type = $request->fuel_type;
        $car->engine_capacity = $request->engine_capacity;
        $car->features = $request->features;
        $car->is_available = $request->is_available;
        $car->status = $request->status;
        
        $car->save();
        
        return redirect()->route('cars.index')->with('success', 'Car updated successfully!');
    }
    
    /**
     * Remove the specified car from storage.
     */
    public function destroy(Car $car)
    {
        try {
            // Check if force delete is requested
            $forceDelete = request()->input('force', false);
            
            // Delete thumbnail if exists
            if ($car->thumbnail && Storage::disk('public')->exists($car->thumbnail)) {
                Storage::disk('public')->delete($car->thumbnail);
            }
            
            // Delete associated images
            foreach ($car->images as $image) {
                if (Storage::disk('public')->exists($image->path)) {
                    Storage::disk('public')->delete($image->path);
                }
                $image->delete();
            }
            
            // Delete the car (soft delete or force delete)
            if ($forceDelete) {
                $car->forceDelete();
                $message = 'Car permanently deleted!';
            } else {
                $car->delete();
                $message = 'Car deleted successfully!';
            }
            
            return redirect()->back()->with('success', $message);
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Failed to delete car: ' . $e->getMessage());
        }
    }
    
    /**
     * Admin view for car management
     */
    public function adminIndex()
    {
        $cars = Car::with(['category', 'brand'])
            ->withTrashed() // Include soft deleted cars
            ->latest()
            ->paginate(10);
            
        $categories = Category::all();
        $brands = Brand::all();
        
        return Inertia::render('Admin/Cars', [
            'cars' => $cars,
            'categories' => $categories,
            'brands' => $brands,
        ]);
    }
    
    /**
     * Show the form for editing the specified car.
     */
    public function edit(Car $car)
    {
        $categories = Category::all();
        $brands = Brand::all();
        
        return Inertia::render('Admin/CarEdit', [
            'car' => $car,
            'categories' => $categories,
            'brands' => $brands,
        ]);
    }
    
    /**
     * Restore a soft-deleted car
     */
    public function restore($id)
    {
        $car = Car::withTrashed()->findOrFail($id);
        $car->restore();
        
        return redirect()->back()->with('success', 'Car restored successfully!');
    }
    
    /**
     * Permanently delete a car
     */
    public function forceDelete($id)
    {
        $car = Car::withTrashed()->findOrFail($id);
        
        // Delete thumbnail if exists
        if ($car->thumbnail && Storage::disk('public')->exists($car->thumbnail)) {
            Storage::disk('public')->delete($car->thumbnail);
        }
        
        // Delete associated images
        foreach ($car->images as $image) {
            if (Storage::disk('public')->exists($image->path)) {
                Storage::disk('public')->delete($image->path);
            }
            $image->forceDelete();
        }
        
        // Force delete the car
        $car->forceDelete();
        
        return redirect()->back()->with('success', 'Car permanently deleted!');
    }
}