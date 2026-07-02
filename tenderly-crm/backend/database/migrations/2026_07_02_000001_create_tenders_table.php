<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('tenders', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('buyer');
            $table->string('stage')->index();
            $table->unsignedBigInteger('budget_cents');
            $table->unsignedTinyInteger('probability')->default(0);
            $table->timestamp('deadline_at')->index();
            $table->string('owner_name');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('tenders');
    }
};
