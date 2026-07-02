<?php

use App\Http\Controllers\TenderController;
use Illuminate\Support\Facades\Route;

Route::prefix('tenders')->group(function () {
    Route::get('/', [TenderController::class, 'index']);
    Route::post('/', [TenderController::class, 'store']);
    Route::patch('/{tender}/stage', [TenderController::class, 'moveStage']);
});
