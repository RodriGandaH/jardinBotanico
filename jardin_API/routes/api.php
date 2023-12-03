<?php

use App\Http\Controllers\SocialNetworkController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\EventController;
use App\Http\Controllers\PlantController;
use App\Http\Controllers\UserController;


use Illuminate\Support\Facades\Route;

Route::group(['middleware' => ['cors']], function () {
    Route::post('/login', [UserController::class, 'login']);

    Route::get('events', [EventController::class, 'index']);
    Route::get('events/{id}', [EventController::class, 'show']);

    Route::get('categories', [CategoryController::class, 'index']);
    Route::get('categories/getCategories', [CategoryController::class, 'getCategories']);
    Route::get('categories/{id}', [CategoryController::class, 'show']);

    Route::get('plants', [PlantController::class, 'index']);
    Route::get('plants/{id}', [PlantController::class, 'show']);

    Route::get('/categories/{categoryName}/plants/{plantId}', [CategoryController::class, 'showPlant']);
});

Route::group(['middleware' => ['auth:sanctum', 'cors']], function () {

    Route::get('/logout', [UserController::class, 'logout']);

    Route::post('events', [EventController::class, 'store']);
    Route::post('events/{id}', [EventController::class, 'update']);
    Route::delete('events/{id}', [EventController::class, 'destroy']);
    Route::delete('/events/images/{id}', [EventController::class, 'destroyImage']);

    Route::post('categories', [CategoryController::class, 'store']);
    Route::put('categories/{id}', [CategoryController::class, 'update']);
    Route::delete('categories/{id}', [CategoryController::class, 'destroy']);

    Route::post('plants', [PlantController::class, 'store']);
    Route::post('plants/{id}', [PlantController::class, 'update']);
    Route::delete('plants/{id}', [PlantController::class, 'destroy']);
    Route::delete('/plants/images/{id}', [PlantController::class, 'destroyImage']);
    Route::delete('/plants/medicinalProperties/{id}', [PlantController::class, 'destroyMedicinalProperty']);

    Route::get('/networks', [SocialNetworkController::class, 'index']);
    Route::post('/networks', [SocialNetworkController::class, 'store']);
    Route::get('/networks/{id}', [SocialNetworkController::class, 'show']);
    Route::put('/networks/{id}', [SocialNetworkController::class, 'update']);
    Route::delete('/networks/{id}', [SocialNetworkController::class, 'destroy']);
});
