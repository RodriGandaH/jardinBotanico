<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorePlantRequest;
use App\Models\MedicinalProperty;
use App\Models\Plant;
use App\Models\PlantImage;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;




class PlantController extends Controller
{
    public function index()
    {
        $plants = Plant::with('category', 'images', 'medicinalProperties')->get();

        return response()->json($plants, 200);
    }


    public function store(StorePlantRequest $request)
    {
        $plant = Plant::create([
            'name' => $request->name,
            'scientific_name' => $request->scientific_name,
            'description' => $request->description,
            'category_id' => $request->category_id
        ]);

        if ($request->has('medicinal_properties')) {
            foreach ($request->medicinal_properties as $property) {
                MedicinalProperty::create([
                    'description' => $property,
                    'plant_id' => $plant->id
                ]);
            }
        }

        if ($request->hasfile('images')) {
            $counter = 1;
            foreach ($request->file('images') as $image) {
                $imageName = time() . '_' . $counter . '.' . $image->extension();
                $image->move(public_path('img'), $imageName);

                PlantImage::create([
                    'image' => 'img/' . $imageName,
                    'plant_id' => $plant->id
                ]);

                $counter++;
            }
        }

        $plant->load('category');
        $plant->load('images');
        $plant->load('medicinalProperties');

        return response()->json($plant, 201);
    }


    public function show($id)
    {
        $plant = Plant::with('images', 'medicinalProperties')->find($id);

        if ($plant) {
            return response()->json($plant, 200);
        } else {
            return response()->json(['error' => 'Plant not found'], 404);
        }
    }



    public function update(Request $request, $id)
    {
        try {
            $this->validate($request, [
                'name' => 'required',
                'scientific_name' => 'required',
                'description' => 'required',
                'category_id' => 'required',
                'images' => 'sometimes|array',
                'images.*' => 'image|mimes:jpeg,png,jpg,gif,svg'
            ]);
        } catch (ValidationException $e) {
            return response()->json(['errors' => $e->errors()], 422);
        }

        $plant = Plant::find($id);

        if ($plant) {
            $plant->name = $request->name;
            $plant->scientific_name = $request->scientific_name;
            $plant->description = $request->description;
            $plant->category_id = $request->category_id;

            if ($request->hasfile('images')) {
                $counter = 1;

                foreach ($request->file('images') as $image) {
                    $imageName = time() . '_' . $counter . '.' . $image->extension();
                    $image->move(public_path('img'), $imageName);

                    PlantImage::create([
                        'image' => 'img/' . $imageName,
                        'plant_id' => $plant->id
                    ]);
                    $counter++;
                }
            }

            if ($request->has('medicinal_properties')) {
                $plant->medicinalProperties()->delete(); // eliminar las propiedades medicinales existentes

                foreach ($request->medicinal_properties as $property) {
                    MedicinalProperty::create([
                        'description' => $property,
                        'plant_id' => $plant->id
                    ]);
                }
            }

            $plant->save();
            $plant->load('category');
            $plant->load('images');
            $plant->load('medicinalProperties');

            return response()->json($plant, 200);
        } else {
            return response()->json(['error' => 'Plant not found'], 404);
        }
    }



    public function destroy($id)
    {
        $plant = Plant::find($id);

        if ($plant) {

            foreach ($plant->images as $image) {
                $oldImagePath = public_path($image->image);
                if (file_exists($oldImagePath)) {
                    unlink($oldImagePath);
                }
                $image->delete();
            }

            // Eliminar todas las propiedades medicinales asociadas
            foreach ($plant->medicinalProperties as $property) {
                $property->delete();
            }

            $plant->delete();

            return response()->json(['message' => 'Plant and associated images and medicinal properties deleted']);
        } else {
            return response()->json(['error' => 'Plant not found'], 404);
        }
    }


    public function destroyImage($id)
    {
        $image = PlantImage::find($id);

        if ($image) {

            $oldImagePath = public_path($image->image);
            if (file_exists($oldImagePath)) {
                unlink($oldImagePath);
            }


            $image->delete();

            return response()->json(['message' => 'Image deleted successfully'], 200);
        } else {
            return response()->json(['error' => 'Image not found'], 404);
        }
    }
    public function deleteMedicinalProperty($id)
    {
        $medicinalProperty = MedicinalProperty::find($id);

        if ($medicinalProperty) {
            $medicinalProperty->delete();
            return response()->json(['message' => 'Propiedad medicinal eliminada correctamente'], 200);
        } else {
            return response()->json(['error' => 'Propiedad medicinal no encontrada'], 404);
        }
    }
}
