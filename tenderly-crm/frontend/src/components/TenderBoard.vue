<script setup lang="ts">
import type { Tender, TenderStage } from "../lib/api";

defineProps<{
  groups: Record<TenderStage, Tender[]>;
}>();

const emit = defineEmits<{
  select: [tender: Tender];
}>();

const stages: TenderStage[] = ["discovery", "qualification", "proposal", "negotiation", "won", "lost"];
</script>

<template>
  <section class="rounded-lg border border-graphite/10 bg-white p-4 shadow-panel">
    <div class="flex items-center justify-between">
      <h2 class="text-base font-semibold">Tender pipeline</h2>
      <span class="text-xs font-medium text-graphite/50">Demo workspace</span>
    </div>

    <div class="mt-4 grid gap-3 lg:grid-cols-6">
      <div v-for="stage in stages" :key="stage" class="min-h-52 rounded-md bg-mist p-3">
        <div class="flex items-center justify-between">
          <h3 class="text-xs font-semibold uppercase text-graphite/55">{{ stage }}</h3>
          <span class="rounded-full bg-white px-2 py-0.5 text-xs text-graphite/60">{{ groups[stage].length }}</span>
        </div>

        <button
          v-for="tender in groups[stage]"
          :key="tender.id"
          class="mt-3 w-full rounded-md border border-graphite/10 bg-white p-3 text-left shadow-sm transition hover:border-teal/50"
          type="button"
          @click="emit('select', tender)"
        >
          <p class="text-sm font-semibold">{{ tender.title }}</p>
          <p class="mt-1 text-xs text-graphite/50">{{ tender.buyer }}</p>
          <div class="mt-3 h-1.5 rounded-full bg-graphite/10">
            <div class="h-1.5 rounded-full bg-teal" :style="{ width: `${tender.probability}%` }" />
          </div>
        </button>
      </div>
    </div>
  </section>
</template>
