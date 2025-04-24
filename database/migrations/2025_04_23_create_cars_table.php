<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('categories', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('slug')->unique();
            $table->text('description')->nullable();
            $table->string('icon')->nullable();
            $table->timestamps();
        });

        Schema::create('brands', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('slug')->unique();
            $table->string('logo')->nullable();
            $table->text('description')->nullable();
            $table->timestamps();
        });

        Schema::create('cars', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('slug')->unique();
            $table->foreignId('category_id')->constrained()->onDelete('cascade');
            $table->foreignId('brand_id')->constrained()->onDelete('cascade');
            $table->text('description')->nullable();
            $table->integer('year');
            $table->string('license_plate')->unique();
            $table->decimal('price_per_day', 10, 2);
            $table->decimal('price_per_week', 10, 2)->nullable();
            $table->decimal('price_per_month', 10, 2)->nullable();
            $table->integer('seats');
            $table->integer('doors');
            $table->string('transmission'); // manual, automatic
            $table->string('fuel_type'); // bensin, diesel, listrik
            $table->string('engine_capacity')->nullable();
            $table->json('features')->nullable(); // AC, Bluetooth, GPS, dll
            $table->boolean('is_available')->default(true);
            $table->string('status')->default('active'); // active, maintenance, retired
            $table->string('thumbnail')->nullable();
            $table->float('rating', 3, 2)->default(0);
            $table->integer('rating_count')->default(0);
            $table->timestamps();
            $table->softDeletes();
        });

        Schema::create('car_images', function (Blueprint $table) {
            $table->id();
            $table->foreignId('car_id')->constrained()->onDelete('cascade');
            $table->string('image_path');
            $table->boolean('is_primary')->default(false);
            $table->integer('order')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('car_images');
        Schema::dropIfExists('cars');
        Schema::dropIfExists('brands');
        Schema::dropIfExists('categories');
    }
};
