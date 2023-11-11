<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateEventRequest extends FormRequest
{

    public function authorize()
    {
        return true;
    }


    public function rules()
    {
        $eventId = $this->route('id');
        return [
            'name' => 'required|unique:events,name,' . $eventId,
            'date' => 'required',
            'description' => 'sometimes',
            'image' => 'sometimes|image|mimes:jpeg,png,jpg,gif,svg|max:2048',

        ];
    }
}
