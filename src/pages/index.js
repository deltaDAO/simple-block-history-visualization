import * as React from "react";
import ChartData from "../ChartData";
import HeroSection from "../HeroSection";
import TotalTransactions from "../TotalTransactions";

export default function IndexPage() {
  return (
    <main className="container mx-auto px-4">
      <title>Gaia-X Test Network Hackathon Visualization</title>
      <HeroSection />
      <TotalTransactions />
      <ChartData />
    </main>
  );
}
