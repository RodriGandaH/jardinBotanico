<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StorePlantRequest extends FormRequest
{

    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'name' => 'required|unique:plants,name',
            'description' => 'required',

            'category_id' => 'nullable|exists:categories,id',
        ];
    }
}
