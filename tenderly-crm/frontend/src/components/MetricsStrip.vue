<script setup lang="ts">
import { BriefcaseBusiness, CircleDollarSign, Percent, Send } from "lucide-vue-next";

defineProps<{
  activeCount: number;
  forecast: number;
  averageProbability: number;
  proposalsCount: number;
}>();

const money = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0
});
</script>

<template>
  <section class="grid gap-4 md:grid-cols-4">
    <article class="rounded-lg border border-graphite/10 bg-white p-4 shadow-panel">
      <BriefcaseBusiness class="text-teal" :size="20" />
      <p class="mt-4 text-sm text-graphite/55">Active tenders</p>
      <strong class="mt-1 block text-3xl font-semibold">{{ activeCount }}</strong>
    </article>
    <article class="rounded-lg border border-graphite/10 bg-white p-4 shadow-panel">
      <CircleDollarSign class="text-cobalt" :size="20" />
      <p class="mt-4 text-sm text-graphite/55">Weighted forecast</p>
      <strong class="mt-1 block text-3xl font-semibold">{{ money.format(forecast) }}</strong>
    </article>
    <article class="rounded-lg border border-graphite/10 bg-white p-4 shadow-panel">
      <Percent class="text-amber" :size="20" />
      <p class="mt-4 text-sm text-graphite/55">Avg probability</p>
      <strong class="mt-1 block text-3xl font-semibold">{{ averageProbability }}%</strong>
    </article>
    <article class="rounded-lg border border-graphite/10 bg-white p-4 shadow-panel">
      <Send class="text-rose" :size="20" />
      <p class="mt-4 text-sm text-graphite/55">Proposals</p>
      <strong class="mt-1 block text-3xl font-semibold">{{ proposalsCount }}</strong>
    </article>
  </section>
</template>
