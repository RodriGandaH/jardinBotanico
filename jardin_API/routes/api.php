<?php

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\EventController;
use App\Http\Controllers\PlantController;
use Illuminate\Support\Facades\Route;





/* Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
}); */



Route::apiResource('events', EventController::class);

Route::apiResource('categories', CategoryController::class);

Route::apiResource('plants', PlantController::class);
