<?php

namespace Database\Factories;

use App\Models\Event;
use App\Models\EventImage;
use Illuminate\Database\Eloquent\Factories\Factory;

class EventImageFactory extends Factory
{
    protected $model = EventImage::class;

    public function definition()
    {
        return [
            'image' => $this->faker->imageUrl,
            'event_id' => Event::factory(),
        ];
    }
}
