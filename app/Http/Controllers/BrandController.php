<?php

namespace App\Http\Controllers;

use App\Models\Brand;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class BrandController extends Controller
{
    /**
     * Display a listing of the brands.
     */
    public function index()
    {
        $brands = Brand::latest()->paginate(10);
        
        return Inertia::render('Admin/Brands', [
            'brands' => $brands,
        ]);
    }

    /**
     * Store a newly created brand in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255|unique:brands',
            'description' => 'nullable|string',
            'logo' => 'required|image|max:5120', // 5MB max
        ]);

        // Generate slug
        $slug = Str::slug($request->name);
        $originalSlug = $slug;
        $count = 1;
        
        // Make sure slug is unique
        while (Brand::where('slug', $slug)->exists()) {
            $slug = $originalSlug . '-' . $count;
            $count++;
        }

        // Handle logo upload
        $logoPath = null;
        if ($request->hasFile('logo')) {
            $logoPath = $request->file('logo')->store('brands', 'public');
        }

        // Create brand
        $brand = Brand::create([
            'name' => $request->name,
            'slug' => $slug,
            'description' => $request->description,
            'logo' => $logoPath,
        ]);

        return redirect()->route('admin.brands.index')->with('success', 'Brand created successfully!');
    }

    /**
     * Update the specified brand in storage.
     */
    public function update(Request $request, Brand $brand)
    {
        $request->validate([
            'name' => 'required|string|max:255|unique:brands,name,' . $brand->id,
            'description' => 'nullable|string',
            'logo' => 'nullable|image|max:5120', // 5MB max
        ]);

        // Generate new slug if name changed
        if ($brand->name !== $request->name) {
            $slug = Str::slug($request->name);
            $originalSlug = $slug;
            $count = 1;
            
            while (Brand::where('slug', $slug)->where('id', '!=', $brand->id)->exists()) {
                $slug = $originalSlug . '-' . $count;
                $count++;
            }
            
            $brand->slug = $slug;
        }

        // Handle logo upload
        if ($request->hasFile('logo')) {
            // Delete old logo if exists
            if ($brand->logo && Storage::disk('public')->exists($brand->logo)) {
                Storage::disk('public')->delete($brand->logo);
            }
            
            $logoPath = $request->file('logo')->store('brands', 'public');
            $brand->logo = $logoPath;
        }

        $brand->name = $request->name;
        $brand->description = $request->description;
        $brand->save();

        return redirect()->route('admin.brands.index')->with('success', 'Brand updated successfully!');
    }

    /**
     * Remove the specified brand from storage.
     */
    public function destroy(Brand $brand)
    {
        // Delete logo if exists
        if ($brand->logo && Storage::disk('public')->exists($brand->logo)) {
            Storage::disk('public')->delete($brand->logo);
        }
        
        $brand->delete();

        return redirect()->route('admin.brands.index')->with('success', 'Brand deleted successfully!');
    }
} 