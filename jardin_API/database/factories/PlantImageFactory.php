<?php

namespace Database\Factories;

use App\Models\PlantImage;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Http\UploadedFile;

class PlantImageFactory extends Factory
{
    protected $model = PlantImage::class;

    public function definition()
    {
        return [
            'image' => UploadedFile::fake()->image('image.jpg'),
            'plant_id' => null,
        ];
    }
}
