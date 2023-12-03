<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MedicinalProperty extends Model
{
    use HasFactory;

    protected $table = "medicinal_properties";

    protected $fillable = ['description', 'plant_id'];

    public function plant()
    {
        return $this->belongsTo(Plant::class);
    }
}
