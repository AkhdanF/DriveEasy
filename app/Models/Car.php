<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Car extends Model
{
    use HasFactory, SoftDeletes;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'slug',
        'category_id',
        'brand_id',
        'description',
        'year',
        'license_plate',
        'price_per_day',
        'price_per_week',
        'price_per_month',
        'seats',
        'doors',
        'transmission',
        'fuel_type',
        'engine_capacity',
        'features',
        'is_available',
        'status',
        'thumbnail',
        'rating',
        'rating_count',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'features' => 'array',
        'is_available' => 'boolean',
        'price_per_day' => 'float',
        'price_per_week' => 'float',
        'price_per_month' => 'float',
        'rating' => 'float',
        'rating_count' => 'integer',
        'year' => 'integer',
        'seats' => 'integer',
        'doors' => 'integer',
    ];

    /**
     * Get the category that owns the car.
     */
    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    /**
     * Get the brand that owns the car.
     */
    public function brand()
    {
        return $this->belongsTo(Brand::class);
    }

    /**
     * Get the images for the car.
     */
    public function images()
    {
        return $this->hasMany(CarImage::class);
    }

    /**
     * Get the bookings for the car.
     */
    public function bookings()
    {
        return $this->hasMany(Booking::class);
    }

    /**
     * Get the reviews for the car.
     */
    public function reviews()
    {
        return $this->hasMany(Review::class);
    }

    /**
     * Scope a query to only include available cars.
     */
    public function scopeAvailable($query)
    {
        return $query->where('is_available', true)
                     ->where('status', 'active');
    }

    /**
     * Scope a query to filter cars by category.
     */
    public function scopeByCategory($query, $categoryId)
    {
        return $query->where('category_id', $categoryId);
    }

    /**
     * Scope a query to filter cars by brand.
     */
    public function scopeByBrand($query, $brandId)
    {
        return $query->where('brand_id', $brandId);
    }

    /**
     * Scope a query to filter cars by price range.
     */
    public function scopeByPriceRange($query, $min, $max)
    {
        return $query->whereBetween('price_per_day', [$min, $max]);
    }

    /**
     * Scope a query to filter cars by transmission type.
     */
    public function scopeByTransmission($query, $transmission)
    {
        return $query->where('transmission', $transmission);
    }

    /**
     * Scope a query to filter cars by fuel type.
     */
    public function scopeByFuelType($query, $fuelType)
    {
        return $query->where('fuel_type', $fuelType);
    }

    /**
     * Scope a query to filter cars by number of seats.
     */
    public function scopeBySeats($query, $seats)
    {
        return $query->where('seats', $seats);
    }

    /**
     * Get the route key for the model.
     */
    public function getRouteKeyName()
    {
        return 'slug';
    }
}
