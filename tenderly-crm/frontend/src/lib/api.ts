export type TenderStage = "discovery" | "qualification" | "proposal" | "negotiation" | "won" | "lost";

export interface Tender {
  id: number;
  title: string;
  buyer: string;
  stage: TenderStage;
  budget: number;
  probability: number;
  deadlineAt: string;
  ownerName: string;
  proposalsCount: number;
}

export const demoTenders: Tender[] = [
  {
    id: 101,
    title: "Fleet telemetry platform",
    buyer: "Northline Logistics",
    stage: "proposal",
    budget: 184000,
    probability: 62,
    deadlineAt: "2026-07-18",
    ownerName: "Mira",
    proposalsCount: 2
  },
  {
    id: 102,
    title: "Municipal service portal",
    buyer: "CityWorks Group",
    stage: "qualification",
    budget: 96000,
    probability: 44,
    deadlineAt: "2026-07-26",
    ownerName: "Alex",
    proposalsCount: 1
  },
  {
    id: 103,
    title: "Procurement analytics suite",
    buyer: "Aster Manufacturing",
    stage: "negotiation",
    budget: 241000,
    probability: 78,
    deadlineAt: "2026-08-04",
    ownerName: "Nina",
    proposalsCount: 3
  },
  {
    id: 104,
    title: "Vendor onboarding automation",
    buyer: "Helio Retail",
    stage: "discovery",
    budget: 72000,
    probability: 31,
    deadlineAt: "2026-08-11",
    ownerName: "Roman",
    proposalsCount: 0
  }
];
