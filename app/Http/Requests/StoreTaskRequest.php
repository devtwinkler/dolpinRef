<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreTaskRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            "name" => ['required', 'max:255'],
            'description' => ["nullable",'string'],
            'due_date' => ['nullable', 'date'],
            'status' => ['required', Rule::in(['pending','in_progress','completed','cancelled'])],
            'priority' =>  ['required', Rule::in(['low','medium','high'])],
            'project_id' => ['required',Rule::exists('projects','id')],
            'assigned_user_id' => ['nullable', Rule::exists('users','id')],
            'image' => ['nullable', 'image','mimes:jpeg,png,jpg,gif,svg'],
        ];
    }
}
