<?php

namespace Tests\Unit;

use App\Http\Controllers\UserController;
use App\Http\Requests\UserRequest;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;

use Tests\TestCase;


class UserControllerTest extends TestCase
{
    use RefreshDatabase;

    public function testLogin()
    {
        $user = User::factory()->create([
            'username' => 'testuser',
            'password' => 'password',
        ]);

        $request = new UserRequest();
        $request->replace([
            'username' => 'testuser',
            'password' => 'password',
        ]);

        $controller = new UserController();

        $response = $controller->login($request);

        $this->assertEquals(200, $response->getStatusCode());

        $this->assertArrayHasKey('token', $response->getData(true));
    }

    public function testLogout()
    {
        $user = User::factory()->create();
        $token = $user->createToken('auth_token')->plainTextToken;

        $this->actingAs($user);

        $controller = new UserController();

        $response = $controller->logout();

        $this->assertEquals(200, $response->getStatusCode());

        $this->assertFalse($user->tokens()->where('token', hash('sha256', $token))->exists());
    }
}
