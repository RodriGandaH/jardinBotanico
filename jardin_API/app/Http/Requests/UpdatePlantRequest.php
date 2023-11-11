<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdatePlantRequest extends FormRequest
{


    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        $plantId = $this->route('id');
        return [
            'name' => 'required|unique:plants,name,' . $plantId,
            'description' => 'sometimes',
            'image' => 'sometimes|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'category_id' => 'sometimes|exists:categories,id',
        ];
    }
}
