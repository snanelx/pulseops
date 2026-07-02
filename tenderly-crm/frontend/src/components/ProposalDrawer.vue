<script setup lang="ts">
import { CalendarClock, UserRound } from "lucide-vue-next";
import type { Tender } from "../lib/api";

defineProps<{
  tender: Tender | null;
}>();

const money = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0
});
</script>

<template>
  <aside class="rounded-lg border border-graphite/10 bg-white p-4 shadow-panel">
    <template v-if="tender">
      <p class="text-xs font-semibold uppercase text-teal">Selected tender</p>
      <h2 class="mt-2 text-xl font-semibold">{{ tender.title }}</h2>
      <p class="mt-1 text-sm text-graphite/55">{{ tender.buyer }}</p>

      <dl class="mt-5 space-y-3 text-sm">
        <div class="flex items-center justify-between gap-3">
          <dt class="text-graphite/55">Budget</dt>
          <dd class="font-semibold">{{ money.format(tender.budget) }}</dd>
        </div>
        <div class="flex items-center justify-between gap-3">
          <dt class="text-graphite/55">Probability</dt>
          <dd class="font-semibold">{{ tender.probability }}%</dd>
        </div>
        <div class="flex items-center justify-between gap-3">
          <dt class="text-graphite/55">Proposals</dt>
          <dd class="font-semibold">{{ tender.proposalsCount }}</dd>
        </div>
      </dl>

      <div class="mt-5 space-y-3 rounded-md bg-mist p-3 text-sm">
        <div class="flex items-center gap-2">
          <UserRound :size="16" class="text-teal" />
          <span>{{ tender.ownerName }}</span>
        </div>
        <div class="flex items-center gap-2">
          <CalendarClock :size="16" class="text-amber" />
          <span>{{ tender.deadlineAt }}</span>
        </div>
      </div>
    </template>
  </aside>
</template>
