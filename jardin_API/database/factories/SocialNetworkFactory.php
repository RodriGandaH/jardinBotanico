<?php

namespace Database\Factories;

use App\Models\SocialNetwork;
use Illuminate\Database\Eloquent\Factories\Factory;

class SocialNetworkFactory extends Factory
{
    protected $model = SocialNetwork::class;

    public function definition()
    {
        return [
            'name' => $this->faker->word,
            'data' => $this->faker->url,
        ];
    }
}
