<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreTenderRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'title' => ['required', 'string', 'min:4', 'max:160'],
            'buyer' => ['required', 'string', 'min:2', 'max:120'],
            'budget_cents' => ['required', 'integer', 'min:10000'],
            'probability' => ['required', 'integer', 'min:0', 'max:100'],
            'deadline_at' => ['required', 'date'],
            'owner_name' => ['required', 'string', 'min:2', 'max:80'],
        ];
    }
}
