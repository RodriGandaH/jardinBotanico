<?php

namespace Database\Factories;

use App\Models\Category;
use App\Models\Plant;
use Illuminate\Database\Eloquent\Factories\Factory;

class PlantFactory extends Factory
{
    protected $model = Plant::class;

    public function definition()
    {
        return [
            'name' => $this->faker->word,
            'scientific_name' => $this->faker->word,
            'description' => $this->faker->sentence,
            'image' => $this->faker->imageUrl(),
            'category_id' => Category::factory(),
        ];
    }
}
