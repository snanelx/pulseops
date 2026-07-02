import { computed, ref } from "vue";
import { demoTenders, type Tender, type TenderStage } from "../lib/api";

const tenders = ref<Tender[]>(demoTenders);
const selectedTender = ref<Tender | null>(demoTenders[0]);

export function useTenders() {
  const forecast = computed(() =>
    tenders.value.reduce((sum, tender) => sum + tender.budget * (tender.probability / 100), 0)
  );

  const byStage = computed(() => {
    return tenders.value.reduce<Record<TenderStage, Tender[]>>(
      (groups, tender) => {
        groups[tender.stage].push(tender);
        return groups;
      },
      {
        discovery: [],
        qualification: [],
        proposal: [],
        negotiation: [],
        won: [],
        lost: []
      }
    );
  });

  function selectTender(tender: Tender) {
    selectedTender.value = tender;
  }

  return {
    tenders,
    selectedTender,
    forecast,
    byStage,
    selectTender
  };
}
