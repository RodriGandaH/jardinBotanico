<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMedicinalPropertiesTable extends Migration
{
    public function up()
    {
        Schema::create('medicinal_properties', function (Blueprint $table) {
            $table->id();
            $table->string('description');
            $table->foreignId('plant_id')->nullable()->constrained();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('medicinal_properties');
    }
}
