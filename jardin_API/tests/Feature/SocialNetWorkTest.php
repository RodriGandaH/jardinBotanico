<?php

namespace Tests\Feature;

use App\Models\SocialNetwork;
use App\Models\User;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;


class SocialNetWorkTest extends TestCase
{

    public function testIndex()
    {
        $socialNetworks = SocialNetwork::factory()->count(5)->create();

        $response = $this->getJson('api/networks');

        $response->assertStatus(200);
        $response->assertJsonCount(5, $key = null);
    }

    public function testStore()
    {
        $user = User::factory()->create();
        $socialNetworkData = [
            'name' => 'Facebook',
            'data' => 'https://www.facebook.com',
        ];

        $response = $this->actingAs($user)->postJson('api/networks', $socialNetworkData);

        $response->assertStatus(201);
        $this->assertDatabaseHas('social_networks', [
            'name' => 'Facebook',
            'data' => 'https://www.facebook.com',
        ]);
    }
    public function testUpdate()
    {
        $user = User::factory()->create();
        $socialNetwork = SocialNetwork::create([
            'name' => 'Facebook2',
            'data' => 'https://www.facebook2.com',
        ]);

        $updatedSocialNetworkData = [
            'name' => 'Updated Facebook2',
            'data' => 'https://www.updated-facebook2.com',
        ];

        $response = $this->actingAs($user)->putJson("api/networks/{$socialNetwork->id}", $updatedSocialNetworkData);

        $response->assertStatus(200);
        $this->assertDatabaseHas('social_networks', [
            'id' => $socialNetwork->id,
            'name' => 'Updated Facebook2',
            'data' => 'https://www.updated-facebook2.com',
        ]);
    }

    public function show()
    {
        $socialNetwork = SocialNetwork::factory()->create();

        $response = $this->getJson("/social-networks/{$socialNetwork->id}");

        $response->assertStatus(200);
        $response->assertJson([
            'id' => $socialNetwork->id,
            'name' => $socialNetwork->name,
            'data' => $socialNetwork->data,
        ]);
    }

    public function testDestroy()
    { {
            $user = User::factory()->create();

            $socialNetwork = SocialNetwork::create([
                'name' => 'Facebook5',
                'data' => 'https://www.facebook5.com',
            ]);

            $response = $this->actingAs($user)->deleteJson("api/networks/{$socialNetwork->id}");
            $response->assertStatus(204);
            $this->assertDatabaseMissing('social_networks', [
                'id' => $socialNetwork->id,
            ]);
        }
    }
}
