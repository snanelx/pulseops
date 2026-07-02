<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Tender extends Model
{
    protected $fillable = [
        'title',
        'buyer',
        'stage',
        'budget_cents',
        'probability',
        'deadline_at',
        'owner_name',
    ];

    protected $casts = [
        'deadline_at' => 'datetime',
        'probability' => 'integer',
    ];

    public function proposals(): HasMany
    {
        return $this->hasMany(Proposal::class);
    }

    protected function budget(): Attribute
    {
        return Attribute::get(fn () => round($this->budget_cents / 100, 2));
    }
}
