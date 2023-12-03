<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreCategoryRequest;

use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;


class CategoryController extends Controller
{
    public function index()
    {
        $categories = Category::with('plants.images')->get();

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


    public function update(Request $request, $id)
    {
        try {
            $this->validate($request, [
                'name' => 'required|unique:categories,name,' . $id,
            ]);
        } catch (ValidationException $e) {
            return response()->json(['errors' => $e->errors()], 422);
        }

        $category = Category::find($id);

        if ($category) {
            $category->name = $request->name;
            $category->save();
            return response()->json($category, 200);
        } else {
            return response()->json(['error' => 'Category not found'], 404);
        }
    }


    public function destroy($id)
    {
        $category = Category::find($id);

        if ($category) {
            foreach ($category->plants as $plant) {
                $plant->category_id = 0;
                $plant->save();
            }

            $category->delete();

            return response()->json(['message' => 'Categoría eliminada, las plantas asociadas ahora tienen category_id = 0'], 200);
        } else {
            return response()->json(['error' => 'Categoría no encontrada'], 404);
        }
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
