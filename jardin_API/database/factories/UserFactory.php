<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Hash;

class UserFactory extends Factory
{

    public function definition()
    {
        return [
            'name' => $this->faker->name(),
            'username' => $this->faker->userName,
            'password' => Hash::make('password'), // contraseña segura

        ];
    }
}
