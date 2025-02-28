interface DashboardTabsProps {
	activeTab: string;
	setActiveTab: (tab: string) => void;
}

export function DashboardTabs({ activeTab, setActiveTab }: DashboardTabsProps) {
	const tabs = ["overview", "learning", "challenges"];

	return (
		<div className="mb-6 border-b border-gray-800">
			<div className="flex space-x-6">
				{tabs.map((tab) => (
					<button
						key={tab}
						onClick={() => setActiveTab(tab)}
						className={`pb-3 px-1 font-medium text-sm transition-colors ${
							activeTab === tab
								? "text-blue-400 border-b-2 border-blue-400"
								: "text-gray-400 hover:text-white"
						}`}
					>
						{tab.charAt(0).toUpperCase() + tab.slice(1)}
					</button>
				))}
			</div>
		</div>
	);
}