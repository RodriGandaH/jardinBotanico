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
        // Crear un usuario de prueba
        $user = User::factory()->create([
            'username' => 'testuser',
            'password' => 'password',
        ]);

        // Crear una solicitud de prueba
        $request = new UserRequest();
        $request->replace([
            'username' => 'testuser',
            'password' => 'password',
        ]);

        // Crear una instancia del controlador
        $controller = new UserController();

        // Llamar al método de inicio de sesión y obtener la respuesta
        $response = $controller->login($request);

        // Asegurarse de que la respuesta tiene un estado 200
        $this->assertEquals(200, $response->getStatusCode());

        // Asegurarse de que la respuesta tiene un token
        $this->assertArrayHasKey('token', $response->getData(true));
    }

    public function testLogout()
    {
        // Crear un usuario de prueba y generar un token de autenticación
        $user = User::factory()->create();
        $token = $user->createToken('auth_token')->plainTextToken;

        // Autenticar como el usuario de prueba
        $this->actingAs($user);

        // Crear una instancia del controlador
        $controller = new UserController();

        // Llamar al método de cierre de sesión y obtener la respuesta
        $response = $controller->logout();

        // Asegurarse de que la respuesta tiene un estado 200
        $this->assertEquals(200, $response->getStatusCode());

        // Asegurarse de que el token ya no es válido
        $this->assertFalse($user->tokens()->where('token', hash('sha256', $token))->exists());
    }
}
