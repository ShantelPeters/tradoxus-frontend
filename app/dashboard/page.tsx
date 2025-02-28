"use client";

import { useState } from "react";
import { DashboardHeader } from "@/components/dashboard/dashboard-header"; 
import { DashboardTabs } from "@/components/dashboard/dashboard-tabs";
import { OverviewTab } from "@/components/dashboard/tabs/overview-tab"; 
import { LearningTab } from "@/components/dashboard/tabs/learning-tab";
import { ChallengesTab } from "@/components/dashboard/tabs/challenges-tab";

export default function DashboardPage() {
	const [activeTab, setActiveTab] = useState("overview");

	return (
		<main className="container mx-auto px-4 py-6">
			<DashboardHeader />
			<DashboardTabs activeTab={activeTab} setActiveTab={setActiveTab} />
			
			{activeTab === "overview" && <OverviewTab />}
			{activeTab === "learning" && <LearningTab />}
			{activeTab === "challenges" && <ChallengesTab />}
		</main>
	);
}