<?php

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\EventController;
use App\Http\Controllers\PlantController;
use App\Http\Controllers\UserController;

use Illuminate\Support\Facades\Route;


Route::post('/login', [UserController::class, 'login']);

Route::get('events', [EventController::class, 'index']);
Route::get('events/{event}', [EventController::class, 'show']);

Route::get('categories', [CategoryController::class, 'index']);
Route::get('categories/getCategories', [CategoryController::class, 'getCategories']);
Route::get('categories/{category}', [CategoryController::class, 'show']);

Route::get('plants', [PlantController::class, 'index']);
Route::get('plants/{plant}', [PlantController::class, 'show']);

Route::get('/categories/{categoryName}/plants/{plantId}', [CategoryController::class, 'showPlant']);

Route::group(['middleware' => ['auth:sanctum']], function () {
    Route::post('events', [EventController::class, 'store']);
    Route::put('events/{event}', [EventController::class, 'update']);
    Route::delete('events/{event}', [EventController::class, 'destroy']);

    Route::post('categories', [CategoryController::class, 'store']);
    Route::put('categories/{category}', [CategoryController::class, 'update']);
    Route::delete('categories/{category}', [CategoryController::class, 'destroy']);

    Route::post('plants', [PlantController::class, 'store']);
    Route::post('plants/{id}', [PlantController::class, 'update']);
    Route::delete('plants/{plant}', [PlantController::class, 'destroy']);
});
