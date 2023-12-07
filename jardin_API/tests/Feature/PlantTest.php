<?php

namespace Tests\Unit;

use App\Http\Controllers\PlantController;
use App\Http\Requests\StorePlantRequest;
use App\Http\Requests\UpdatePlantRequest;
use App\Models\Category;
use App\Models\Plant;
use App\Models\User;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

class PlantControllerTest extends TestCase
{
    use RefreshDatabase;

    public function testIndex()
    {

        $plants = Plant::factory()->count(3)->create();


        $controller = new PlantController();


        $response = $controller->index();


        $this->assertEquals(200, $response->getStatusCode());

        $this->assertCount(3, $response->getData(true));
    }

    public function testStore()
    {
        $user = User::factory()->create();
        $category = Category::factory()->create();
        $plantData = [
            'name' => 'Rose',
            'scientific_name' => 'Rosa',
            'description' => 'A rose is a woody perennial flowering plant.',
            'category_id' => $category->id,
            'medicinal_properties' => ['Helps with digestion', 'Improves skin health'],
            'images' => ['img1.jpg', 'img2.jpg']
        ];

        $response = $this->actingAs($user)->postJson('api/plants', $plantData);

        $response->assertStatus(201);
        $this->assertDatabaseHas('plants', [
            'name' => 'Rose',
            'scientific_name' => 'Rosa',
            'description' => 'A rose is a woody perennial flowering plant.',
            'category_id' => $category->id,
        ]);
        $this->assertCount(1, Plant::all());
    }

    public function testShow()
    {
        $plant = Plant::factory()->create();

        $controller = new PlantController();

        $response = $controller->show($plant->id);

        $this->assertEquals(200, $response->getStatusCode());

        $this->assertEquals($plant->id, $response->getData(true)['id']);
    }

    public function testUpdate()
    {
        $user = User::factory()->create();
        $category = Category::factory()->create();
        $plant = Plant::factory()->create(['category_id' => $category->id]);

        $updatedPlantData = [
            'name' => 'Updated Rose',
            'scientific_name' => 'Updated Rosa',
            'description' => 'An updated description.',
            'category_id' => $category->id,
            'medicinal_properties' => ['Updated property 1', 'Updated property 2'],
            'images' => [UploadedFile::fake()->image('updated_img1.jpg'), UploadedFile::fake()->image('updated_img2.jpg')]
        ];

        $response = $this->actingAs($user)->postJson("api/plants/{$plant->id}", $updatedPlantData);
        $response->assertStatus(200);
        $this->assertDatabaseHas('plants', [
            'id' => $plant->id,
            'name' => 'Updated Rose',
            'scientific_name' => 'Updated Rosa',
            'description' => 'An updated description.',
            'category_id' => $category->id,
        ]);
    }

    public function testDestroy()
    {
        $plant = Plant::factory()->create();

        $controller = new PlantController();

        $response = $controller->destroy($plant->id);

        $this->assertEquals(200, $response->getStatusCode());

        $this->assertNull(Plant::find($plant->id));
    }
}
