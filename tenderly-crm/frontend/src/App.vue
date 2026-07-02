<script setup lang="ts">
import { computed } from "vue";
import MetricsStrip from "./components/MetricsStrip.vue";
import ProposalDrawer from "./components/ProposalDrawer.vue";
import TenderBoard from "./components/TenderBoard.vue";
import { useTenders } from "./stores/tenders";

const { tenders, selectedTender, forecast, byStage, selectTender } = useTenders();

const averageProbability = computed(() =>
  Math.round(tenders.value.reduce((sum, tender) => sum + tender.probability, 0) / tenders.value.length)
);

const proposalsCount = computed(() =>
  tenders.value.reduce((sum, tender) => sum + tender.proposalsCount, 0)
);
</script>

<template>
  <main class="min-h-screen bg-mist">
    <header class="border-b border-graphite/10 bg-white">
      <div class="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <div>
          <p class="text-xs font-semibold uppercase text-teal">Tenderly CRM</p>
          <h1 class="text-xl font-semibold">Tender command workspace</h1>
        </div>
        <button class="rounded-md bg-graphite px-4 py-2 text-sm font-medium text-white" type="button">
          New tender
        </button>
      </div>
    </header>

    <div class="mx-auto grid max-w-7xl gap-5 px-4 py-6 sm:px-6 lg:grid-cols-[1fr_320px] lg:px-8">
      <section class="space-y-5">
        <MetricsStrip
          :active-count="tenders.length"
          :average-probability="averageProbability"
          :forecast="forecast"
          :proposals-count="proposalsCount"
        />
        <TenderBoard :groups="byStage" @select="selectTender" />
      </section>

      <ProposalDrawer :tender="selectedTender" />
    </div>
  </main>
</template>
