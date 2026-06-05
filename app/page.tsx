"use client";

import dynamic from "next/dynamic";

const HomeContent = dynamic(
  () => import("@/components/HomeContent").then((mod) => mod.HomeContent)
);

export default function Home() {
  return <HomeContent />;
}
