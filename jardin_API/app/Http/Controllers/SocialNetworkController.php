<?php

namespace App\Http\Controllers;

use App\Models\SocialNetwork;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Validation\ValidationException;

class SocialNetworkController extends Controller
{
    public function index()
    {
        return response()->json(SocialNetwork::all(), 200);
    }

    public function store(Request $request)
    {
        try {
            $request->validate([
                'name' => 'required|unique:social_networks',
                'url' => 'required|unique:social_networks',
            ]);
        } catch (ValidationException $e) {
            return response()->json(['error' => $e->errors()], 400);
        }

        $socialNetwork = SocialNetwork::create($request->all());

        return response()->json($socialNetwork, 201);
    }

    public function show($id)
    {
        $socialNetwork = SocialNetwork::find($id);

        if (!$socialNetwork) {
            return response()->json(['error' => 'SocialNetwork not found'], 404);
        }

        return response()->json($socialNetwork, 200);
    }


    public function update(Request $request, $id)
    {
        $socialNetwork = SocialNetwork::find($id);

        if (!$socialNetwork) {
            return response()->json(['error' => 'SocialNetwork not found'], 404);
        }

        try {
            $request->validate([
                'name' => 'required|unique:social_networks,name,' . $id,
                'url' => 'required|unique:social_networks,url,' . $id,
            ]);
        } catch (ValidationException $e) {
            return response()->json(['error' => $e->errors()], 400);
        }

        $socialNetwork->update($request->all());

        return response()->json($socialNetwork, 200);
    }

    public function destroy($id)
    {
        $socialNetwork = SocialNetwork::find($id);

        if (!$socialNetwork) {
            return response()->json(['error' => 'SocialNetwork not found'], 404);
        }

        $socialNetwork->delete();

        return response()->json('Red Social eliminada', 204);
    }
}
