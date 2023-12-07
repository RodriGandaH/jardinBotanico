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

        $categories = Category::factory()->count(3)->create();


        $controller = new CategoryController();


        $response = $controller->index();


        $this->assertEquals(200, $response->getStatusCode());


        $this->assertCount(3, $response->getData(true));
    }

    public function testGetCategories()
    {

        $categories = Category::factory()->count(3)->create();


        $controller = new CategoryController();


        $response = $controller->getCategories();


        $this->assertEquals(200, $response->getStatusCode());


        $this->assertCount(3, $response->getData(true));
    }

    public function testStore()
    {

        $request = new StoreCategoryRequest();
        $request->replace([
            'name' => 'Deserticas',
        ]);


        $controller = new CategoryController();


        $response = $controller->store($request);


        $this->assertEquals(201, $response->getStatusCode());


        $this->assertEquals('Deserticas', $response->getData(true)['name']);
    }

    public function testShow()
    {

        $category = Category::factory()->create();


        $controller = new CategoryController();


        $response = $controller->show($category->id);


        $this->assertEquals(200, $response->getStatusCode());


        $this->assertEquals($category->id, $response->getData(true)['id']);
    }

    public function testUpdate()
    {

        $category = Category::factory()->create();


        $request = new StoreCategoryRequest();
        $request->replace([
            'name' => 'DeserticasEditado',
        ]);

        $controller = new CategoryController();


        $response = $controller->update($request, $category->id);


        $this->assertEquals(200, $response->getStatusCode());


        $this->assertEquals('DeserticasEditado', $response->getData(true)['name']);
    }
    public function testDestroy()
    {

        $category = Category::factory()->create();


        $controller = new CategoryController();


        $response = $controller->destroy($category->id);

        $this->assertEquals(200, $response->getStatusCode());


        $this->assertNull(Category::find($category->id));
    }
}
