<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorePlantRequest;
use App\Http\Requests\UpdatePlantRequest;
use App\Models\Plant;

class PlantController extends Controller
{
    public function index()
    {
        $plants = Plant::with('category')->get();


        return response()->json($plants, 200);
    }

    public function store(StorePlantRequest $request)
    {
        $imageName = time() . '.' . $request->image->extension();
        $request->image->move(public_path('img'), $imageName);

        $plant = Plant::create([
            'name' => $request->name,
            'description' => $request->description,
            'image' => 'img/' . $imageName,
            'category_id' => $request->category_id
        ]);
        $plant->load('category');

        return response()->json($plant, 201);
    }

    public function show($id)
    {
        $plant = Plant::find($id);
        $plant->load('category');
        return response()->json($plant, 200);
    }

    public function update(UpdatePlantRequest $request, $id)
    {
        $plant = Plant::find($id);

        if ($request->hasFile('image')) {

            if ($plant->image) {
                $oldImagePath = public_path($plant->image);
                if (file_exists($oldImagePath)) {
                    unlink($oldImagePath);
                }
            }

            $imageName = time() . '.' . $request->image->extension();
            $request->image->move(public_path('img'), $imageName);
            $plant->image = 'img/' . $imageName;
        }

        $plant->name = $request->name;
        $plant->description = $request->description;
        $plant->category_id = $request->category_id;

        $plant->save();
        $plant->load('category');

        return response()->json($plant, 201);
    }

    public function destroy($id)
    {
        $plant = Plant::find($id);

        $imagePath = $plant->image;

        if (file_exists($imagePath)) {
            unlink($imagePath);
        }

        $plant->delete();

        return response()->json(['message' => 'Plant deleted']);
    }
}
