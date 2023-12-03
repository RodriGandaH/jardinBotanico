<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    use HasFactory;

    protected $table = "events";

    protected $fillable = ['name', 'date', 'time',  'description'];

    public function images()
    {
        return $this->hasMany(EventImage::class);
    }


    public $timestamps = false;
}
