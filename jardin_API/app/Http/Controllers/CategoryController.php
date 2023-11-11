<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreCategoryRequest;

use App\Models\Category;

class CategoryController extends Controller
{
    public function index()
    {

        $categories = Category::all();
        $categories->load('plants');
        return response()->json($categories, 200);
    }

    public function getCategories()
    {
        $categories = Category::all();
        return response()->json($categories, 200);
    }


    public function store(StoreCategoryRequest $request)
    {
        $category = Category::create([
            'name' => $request->name,
        ]);

        return response()->json($category, 201);
    }

    public function show($id)
    {
        $category = Category::find($id);
        $category->load('plants');
        return response()->json($category, 200);
    }

    public function update(StoreCategoryRequest $request, $id)
    {
        $category = Category::find($id);

        $category->name = $request->name;

        $category->save();

        return response()->json($category, 200);
    }

    public function destroy($id)
    {
        $category = Category::find($id);

        foreach ($category->plants as $plant) {

            $imagePath = $plant->image;

            if (file_exists($imagePath)) {
                unlink($imagePath);
            }
            $plant->delete();
        }

        $category->delete();

        return response()->json(['message' => 'Category and its plants deleted']);
    }

    public function showPlant($categoryName, $plantId)
    {
        $category = Category::where('name', $categoryName)->first();

        if (!$category) {
            return response()->json(['message' => 'Category not found'], 404);
        }

        $plant = $category->plants()->where('id', $plantId)->first();

        if (!$plant) {
            return response()->json(['message' => 'Plant not found in this category'], 404);
        }

        return response()->json($plant, 200);
    }
}
