<?php

namespace Tests\Unit;

use App\Http\Controllers\EventController;
use App\Http\Requests\StoreEventRequest;
use App\Http\Requests\UpdateEventRequest;
use App\Models\Event;
use App\Models\EventImage;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

class EventControllerTest extends TestCase
{
    use RefreshDatabase;

    public function testIndex()
    {

        $user = User::factory()->create();
        $events = Event::factory()->count(5)->create()->each(function ($event) {
            EventImage::factory()->count(2)->create(['event_id' => $event->id]);
        });


        $response = $this->actingAs($user)->getJson('api/events');


        $response->assertStatus(200);
        $response->assertJsonCount(5, $key = null);
    }

    public function testStore()
    {

        $user = User::factory()->create();
        $eventData = [
            'name' => 'New Event',
            'date' => '2023-12-31',
            'time' => '12:00:00',
            'description' => 'This is a new event.',
            'images' => [UploadedFile::fake()->image('img1.jpg'), UploadedFile::fake()->image('img2.jpg')]
        ];


        $response = $this->actingAs($user)->postJson('api/events', $eventData);


        $response->assertStatus(201);
        $this->assertDatabaseHas('events', [
            'name' => 'New Event',
            'date' => '2023-12-31',
            'time' => '12:00:00',
            'description' => 'This is a new event.',
        ]);
        $this->assertCount(1, Event::all());
    }


    public function testShow()
    {

        $event = Event::factory()->create();


        $controller = new EventController();


        $response = $controller->show($event->id);


        $this->assertEquals(200, $response->getStatusCode());


        $this->assertEquals($event->id, $response->getData(true)['id']);
    }

    public function testUpdate()
    {

        $user = User::factory()->create();
        $event = Event::factory()->create();

        $updatedEventData = [
            'name' => 'Updated Event',
            'date' => '2024-01-01',
            'time' => '13:00:00',
            'description' => 'This is an updated event.',
            'images' => [UploadedFile::fake()->image('updated_img1.jpg'), UploadedFile::fake()->image('updated_img2.jpg')]
        ];


        $response = $this->actingAs($user)->postJson("api/events/{$event->id}", $updatedEventData);


        $response->assertStatus(200);
        $this->assertDatabaseHas('events', [
            'id' => $event->id,
            'name' => 'Updated Event',
            'date' => '2024-01-01',
            'time' => '13:00:00',
            'description' => 'This is an updated event.',
        ]);
    }
    public function testDestroy()
    {

        $event = Event::factory()->create();


        $controller = new EventController();


        $response = $controller->destroy($event->id);


        $this->assertEquals(200, $response->getStatusCode());


        $this->assertDeleted($event);
    }
}
