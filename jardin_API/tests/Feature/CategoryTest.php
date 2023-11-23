<?php

namespace Tests\Unit;

use App\Http\Controllers\CategoryController;
use App\Http\Requests\StoreCategoryRequest;
use App\Models\Category;
use App\Models\Plant;
use Illuminate\Foundation\Testing\RefreshDatabase;

use Tests\TestCase;

class CategoryControllerTest extends TestCase
{
    use RefreshDatabase;

    public function testIndex()
    {
        // Crear categorías de prueba
        $categories = Category::factory()->count(3)->create();

        // Crear una instancia del controlador
        $controller = new CategoryController();

        // Llamar al método index y obtener la respuesta
        $response = $controller->index();

        // Asegurarse de que la respuesta tiene un estado 200
        $this->assertEquals(200, $response->getStatusCode());

        // Asegurarse de que la respuesta incluye todas las categorías
        $this->assertCount(3, $response->getData(true));
    }

    public function testGetCategories()
    {
        // Crear categorías de prueba
        $categories = Category::factory()->count(3)->create();

        // Crear una instancia del controlador
        $controller = new CategoryController();

        // Llamar al método getCategories y obtener la respuesta
        $response = $controller->getCategories();

        // Asegurarse de que la respuesta tiene un estado 200
        $this->assertEquals(200, $response->getStatusCode());

        // Asegurarse de que la respuesta incluye todas las categorías
        $this->assertCount(3, $response->getData(true));
    }

    public function testStore()
    {
        // Crear una solicitud de prueba
        $request = new StoreCategoryRequest();
        $request->replace([
            'name' => 'Deserticas',
        ]);

        // Crear una instancia del controlador
        $controller = new CategoryController();

        // Llamar al método store y obtener la respuesta
        $response = $controller->store($request);

        // Asegurarse de que la respuesta tiene un estado 201
        $this->assertEquals(201, $response->getStatusCode());

        // Asegurarse de que la respuesta incluye la categoría creada
        $this->assertEquals('Deserticas', $response->getData(true)['name']);
    }

    public function testShow()
    {
        // Crear una categoría de prueba
        $category = Category::factory()->create();

        // Crear una instancia del controlador
        $controller = new CategoryController();

        // Llamar al método show y obtener la respuesta
        $response = $controller->show($category->id);

        // Asegurarse de que la respuesta tiene un estado 200
        $this->assertEquals(200, $response->getStatusCode());

        // Asegurarse de que la respuesta incluye la categoría
        $this->assertEquals($category->id, $response->getData(true)['id']);
    }

    public function testUpdate()
    {
        // Crear una categoría de prueba
        $category = Category::factory()->create();

        // Crear una solicitud de prueba
        $request = new StoreCategoryRequest();
        $request->replace([
            'name' => 'DeserticasEditado',
        ]);

        // Crear una instancia del controlador
        $controller = new CategoryController();

        // Llamar al método update y obtener la respuesta
        $response = $controller->update($request, $category->id);

        // Asegurarse de que la respuesta tiene un estado 200
        $this->assertEquals(200, $response->getStatusCode());

        // Asegurarse de que la respuesta incluye la categoría actualizada
        $this->assertEquals('DeserticasEditado', $response->getData(true)['name']);
    }
    public function testDestroy()
    {
        // Crear una categoría de prueba
        $category = Category::factory()->create();

        // Crear una instancia del controlador
        $controller = new CategoryController();

        // Llamar al método destroy y obtener la respuesta
        $response = $controller->destroy($category->id);

        // Asegurarse de que la respuesta tiene un estado 200
        $this->assertEquals(200, $response->getStatusCode());

        // Asegurarse de que la categoría ha sido eliminada
        $this->assertNull(Category::find($category->id));
    }

    public function testShowPlant()
    {
        // Crear una categoría de prueba
        $category = Category::factory()->create();

        // Crear una planta de prueba
        $plant = Plant::factory()->create([
            'category_id' => $category->id,
        ]);

        // Crear una instancia del controlador
        $controller = new CategoryController();

        // Llamar al método showPlant y obtener la respuesta
        $response = $controller->showPlant($category->name, $plant->id);

        // Asegurarse de que la respuesta tiene un estado 200
        $this->assertEquals(200, $response->getStatusCode());

        // Asegurarse de que la respuesta incluye la planta
        $this->assertEquals($plant->id, $response->getData(true)['id']);
    }
}
