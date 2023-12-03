<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePlantImagesTable extends Migration
{
    public function up()
    {
        Schema::create('plant_images', function (Blueprint $table) {
            $table->id();
            $table->string('image');
            $table->foreignId('plant_id')->constrained();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('plant_images');
    }
}
