<?php

namespace App\Services;

use App\Models\Tender;
use Illuminate\Validation\ValidationException;

class TenderPipelineService
{
    private const STAGES = [
        'discovery',
        'qualification',
        'proposal',
        'negotiation',
        'won',
        'lost',
    ];

    public function moveToStage(Tender $tender, string $stage): Tender
    {
        if (! in_array($stage, self::STAGES, true)) {
            throw ValidationException::withMessages([
                'stage' => 'Unknown tender stage.',
            ]);
        }

        if ($tender->stage === 'lost' || $tender->stage === 'won') {
            throw ValidationException::withMessages([
                'stage' => 'Closed tenders cannot be moved.',
            ]);
        }

        $tender->forceFill(['stage' => $stage])->save();

        return $tender->refresh();
    }

    public function forecastValue(iterable $tenders): int
    {
        $total = 0;

        foreach ($tenders as $tender) {
            $total += (int) round($tender->budget_cents * ($tender->probability / 100));
        }

        return $total;
    }
}
