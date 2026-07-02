<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreTenderRequest;
use App\Models\Tender;
use App\Services\TenderPipelineService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class TenderController
{
    public function __construct(private readonly TenderPipelineService $pipeline)
    {
    }

    public function index(): JsonResponse
    {
        $tenders = Tender::query()
            ->withCount('proposals')
            ->latest('deadline_at')
            ->get();

        return response()->json([
            'data' => $tenders,
            'forecast_cents' => $this->pipeline->forecastValue($tenders),
        ]);
    }

    public function store(StoreTenderRequest $request): JsonResponse
    {
        $tender = Tender::query()->create([
            ...$request->validated(),
            'stage' => 'discovery',
        ]);

        return response()->json(['data' => $tender], 201);
    }

    public function moveStage(Request $request, Tender $tender): JsonResponse
    {
        $request->validate([
            'stage' => ['required', 'string'],
        ]);

        return response()->json([
            'data' => $this->pipeline->moveToStage($tender, (string) $request->input('stage')),
        ]);
    }
}
