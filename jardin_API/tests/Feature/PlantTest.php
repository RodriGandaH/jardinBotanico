<?php

namespace Tests\Unit;

use App\Http\Controllers\PlantController;
use App\Http\Requests\StorePlantRequest;
use App\Http\Requests\UpdatePlantRequest;
use App\Models\Category;
use App\Models\Plant;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

class PlantControllerTest extends TestCase
{
    use RefreshDatabase;

    public function testIndex()
    {
        // Crear plantas de prueba
        $plants = Plant::factory()->count(3)->create();

        // Crear una instancia del controlador
        $controller = new PlantController();

        // Llamar al método index y obtener la respuesta
        $response = $controller->index();

        // Asegurarse de que la respuesta tiene un estado 200
        $this->assertEquals(200, $response->getStatusCode());

        // Asegurarse de que la respuesta incluye todas las plantas
        $this->assertCount(3, $response->getData(true));
    }

    public function testStore()
    {
        // Crear una categoría de prueba
        $category = Category::factory()->create();

        // Crear una imagen de prueba
        $image = UploadedFile::fake()->image('testplant.jpg');

        // Crear una solicitud de prueba
        $request = new StorePlantRequest();
        $request->replace([
            'name' => 'testplant',
            'scientific_name' => 'testplant',
            'description' => 'testplant',
            'image' => $image,
            'category_id' => $category->id,
        ]);

        // Crear una instancia del controlador
        $controller = new PlantController();

        // Llamar al método store y obtener la respuesta
        $response = $controller->store($request);

        // Asegurarse de que la respuesta tiene un estado 201
        $this->assertEquals(201, $response->getStatusCode());

        // Asegurarse de que la respuesta incluye la planta creada
        $this->assertEquals('testplant', $response->getData(true)['name']);
        $this->assertEquals('testplant', $response->getData(true)['scientific_name']);
        $this->assertEquals('testplant', $response->getData(true)['description']);
        $this->assertEquals($category->id, $response->getData(true)['category_id']);
        $this->assertNotNull($response->getData(true)['image']);
    }

    public function testShow()
    {
        // Crear una planta de prueba
        $plant = Plant::factory()->create();

        // Crear una instancia del controlador
        $controller = new PlantController();

        // Llamar al método show y obtener la respuesta
        $response = $controller->show($plant->id);

        // Asegurarse de que la respuesta tiene un estado 200
        $this->assertEquals(200, $response->getStatusCode());

        // Asegurarse de que la respuesta incluye la planta
        $this->assertEquals($plant->id, $response->getData(true)['id']);
    }

    public function testUpdate()
    {
        // Crear una planta de prueba
        $plant = Plant::factory()->create();

        // Crear una solicitud de prueba
        $request = new UpdatePlantRequest();
        $request->replace([
            'name' => 'newname',
            'scientific_name' => 'newname',
            'description' => 'newname',
            'image' => 'newname.jpg',
            'category_id' => $plant->category_id,
        ]);

        // Crear una instancia del controlador
        $controller = new PlantController();

        // Llamar al método update y obtener la respuesta
        $response = $controller->update($request, $plant->id);

        // Asegurarse de que la respuesta tiene un estado 201
        $this->assertEquals(201, $response->getStatusCode());

        // Asegurarse de que la respuesta incluye la planta actualizada
        $this->assertEquals('newname', $response->getData(true)['name']);
        $this->assertEquals('newname', $response->getData(true)['scientific_name']);
        $this->assertEquals('newname', $response->getData(true)['description']);
        $this->assertEquals($plant->category_id, $response->getData(true)['category_id']);
        $this->assertNotNull($response->getData(true)['image']);
    }

    public function testDestroy()
    {
        // Crear una planta de prueba
        $plant = Plant::factory()->create();

        // Crear una instancia del controlador
        $controller = new PlantController();

        // Llamar al método destroy y obtener la respuesta
        $response = $controller->destroy($plant->id);

        // Asegurarse de que la respuesta tiene un estado 200
        $this->assertEquals(200, $response->getStatusCode());

        // Asegurarse de que la planta ha sido eliminada
        $this->assertNull(Plant::find($plant->id));
    }
}
