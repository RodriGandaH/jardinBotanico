<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Plant extends Model
{
    use HasFactory;

    protected $table = "plants";

    protected $fillable = ['name', 'scientific_name', 'description', 'category_id'];

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function images()
    {
        return $this->hasMany(PlantImage::class);
    }
    public function medicinalProperties()
    {
        return $this->hasMany(MedicinalProperty::class);
    }


    public $timestamps = false;
}
