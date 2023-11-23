<?php

namespace Tests\Unit;

use App\Http\Controllers\EventController;
use App\Http\Requests\StoreEventRequest;
use App\Http\Requests\UpdateEventRequest;
use App\Models\Event;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

class EventControllerTest extends TestCase
{
    use RefreshDatabase;

    public function testIndex()
    {
        // Crear eventos de prueba
        $events = Event::factory()->count(3)->create();

        // Crear una instancia del controlador
        $controller = new EventController();

        // Llamar al método index y obtener la respuesta
        $response = $controller->index();

        // Asegurarse de que la respuesta tiene un estado 200
        $this->assertEquals(200, $response->getStatusCode());

        // Asegurarse de que la respuesta incluye todos los eventos
        $this->assertCount(3, $response->getData(true));
    }

    public function testStore()
    {
        // Crear una imagen de prueba
        $image = UploadedFile::fake()->image('EventoNavideño.jpg');

        // Crear una solicitud de prueba
        $request = new StoreEventRequest();
        $request->replace([
            'name' => 'EventoNavideño',
            'date' => '2023-12-31',
            'time' => '12:00:00',
            'image' => $image,
            'description' => 'EventoNavideño',
        ]);

        // Crear una instancia del controlador
        $controller = new EventController();

        // Llamar al método store y obtener la respuesta
        $response = $controller->store($request);

        // Asegurarse de que la respuesta tiene un estado 201
        $this->assertEquals(201, $response->getStatusCode());

        // Asegurarse de que la respuesta incluye el evento creado
        $this->assertEquals('EventoNavideño', $response->getData(true)['name']);
        $this->assertEquals('2023-12-31', $response->getData(true)['date']);
        $this->assertEquals('12:00:00', $response->getData(true)['time']);
        $this->assertEquals('EventoNavideño', $response->getData(true)['description']);
        $this->assertNotNull($response->getData(true)['image']);
    }

    public function testShow()
    {
        // Crear un evento de prueba
        $event = Event::factory()->create();

        // Crear una instancia del controlador
        $controller = new EventController();

        // Llamar al método show y obtener la respuesta
        $response = $controller->show($event->id);

        // Asegurarse de que la respuesta tiene un estado 200
        $this->assertEquals(200, $response->getStatusCode());

        // Asegurarse de que la respuesta incluye el evento
        $this->assertEquals($event->id, $response->getData(true)['id']);
    }

    public function testUpdate()
    {
        // Crear un evento de prueba
        $event = Event::factory()->create();

        // Crear una imagen de prueba
        $image = UploadedFile::fake()->image('EventoNavideño2.jpg');

        // Crear una solicitud de prueba
        $request = new UpdateEventRequest();
        $request->replace([
            'name' => 'EventoNavideño2',
            'date' => '2024-02-01',
            'time' => '14:00:00',
            'image' => $image,
            'description' => 'EventoNavideño2',
        ]);

        // Crear una instancia del controlador
        $controller = new EventController();

        // Llamar al método update y obtener la respuesta
        $response = $controller->update($request, $event->id);

        // Asegurarse de que la respuesta tiene un estado 200
        $this->assertEquals(200, $response->getStatusCode());

        // Asegurarse de que la respuesta incluye el evento actualizado
        $this->assertEquals('EventoNavideño2', $response->getData(true)['name']);
        $this->assertEquals('2024-02-01', $response->getData(true)['date']);
        $this->assertEquals('14:00:00', $response->getData(true)['time']);
        $this->assertEquals('EventoNavideño2', $response->getData(true)['description']);
        $this->assertNotNull($response->getData(true)['image']);
    }

    public function testDestroy()
    {
        // Crear un evento de prueba
        $event = Event::factory()->create();

        // Crear una instancia del controlador
        $controller = new EventController();

        // Llamar al método destroy y obtener la respuesta
        $response = $controller->destroy($event->id);

        // Asegurarse de que la respuesta tiene un estado 200
        $this->assertEquals(200, $response->getStatusCode());

        // Asegurarse de que el evento fue eliminado
        $this->assertDeleted($event);
    }
}
