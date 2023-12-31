<?php

namespace Database\Factories;

use App\Models\Event;
use Illuminate\Database\Eloquent\Factories\Factory;

class EventFactory extends Factory
{
    protected $model = Event::class;

    public function definition()
    {
        return [
            'name' => $this->faker->sentence,
            'date' => $this->faker->date,
            'time' => $this->faker->time,
            'description' => $this->faker->paragraph,
        ];
    }
}
