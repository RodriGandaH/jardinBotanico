<?php

namespace App\Http\Controllers;

use App\Http\Requests\UserRequest;
use App\Models\User;




class UserController extends Controller
{

    public function login(UserRequest $request)
    {
        $user = User::where('username', '=', $request->username)->first();
        if (isset($user)) {

            $token = $user->createToken('auth_token')->plainTextToken;
            return response()->json([$user, 'token' => $token], 200);
        }

        return response()->json(['message' => 'Username or password is incorrect'], 401);
    }

    public function logout()
    {
        auth()->user()->tokens()->delete();
        return response()->json(['message' => 'Logged out'], 200);
    }
}
