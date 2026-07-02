import { Suspense } from "react";
import { ListingsView } from "@/components/ListingsView";

export const metadata = {
  title: "Listings — Kassora",
  description: "Browse the full Kassora portfolio of estates, penthouses, homes and land.",
};

export default function ListingsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen" />}>
      <ListingsView />
    </Suspense>
  );
}
