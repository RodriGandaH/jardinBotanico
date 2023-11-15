<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreCategoryRequest extends FormRequest
{

    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        $categoryId = $this->route('id');
        return [
            'name' => 'required|unique:categories,name,' . $categoryId,
        ];
    }
}
