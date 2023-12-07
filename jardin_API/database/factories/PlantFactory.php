<?php

namespace Database\Factories;

use App\Models\Category;
use App\Models\Plant;
use App\Models\PlantImage;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Http\UploadedFile;

class PlantFactory extends Factory
{
    protected $model = Plant::class;

    public function definition()
    {
        return [
            'name' => $this->faker->word,
            'scientific_name' => $this->faker->word,
            'description' => $this->faker->sentence,
            'category_id' => Category::factory(),
        ];
    }

    public function configure()
    {
        return $this->afterCreating(function (Plant $plant) {
            PlantImage::factory()->count(3)->create(['plant_id' => $plant->id]);
        });
    }
}
