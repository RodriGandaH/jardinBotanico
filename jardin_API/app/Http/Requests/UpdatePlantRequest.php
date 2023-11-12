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
            'scientific_name' => 'sometimes|nullable',
            'description' => 'required',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048|nullable',
            'category_id' => 'required|exists:categories,id',
        ];
    }
}
