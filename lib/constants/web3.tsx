import {
	BarChart3,
	CheckCircle,
	Database,
	Gift,
	Key,
	Lightbulb,
	Link,
	Network,
	Users,
} from "lucide-react";

import type { Benefit, Feature } from "../types/web3.type";

export const features: Feature[] = [
	{
		id: "feature-1",
		title: "Transparent Progress Tracking",
		description:
			"Your learning progress and achievements are recorded on the blockchain, ensuring transparency and immutability.",
		icon: <BarChart3 className="h-6 w-6 text-blue-400" />,
		bgColor: "bg-blue-900/30",
		borderColor: "hover:border-blue-500",
	},
	{
		id: "feature-2",
		title: "Token and NFT Rewards",
		description:
			"Earn real crypto tokens and educational NFTs as you complete courses and achieve milestones.",
		icon: <Gift className="h-6 w-6 text-purple-400" />,
		bgColor: "bg-purple-900/30",
		borderColor: "hover:border-purple-500",
	},
	{
		id: "feature-3",
		title: "On-Chain Data Access",
		description:
			"Gain insights from real blockchain data for advanced analysis and decision-making in your trading strategies.",
		icon: <Database className="h-6 w-6 text-green-400" />,
		bgColor: "bg-green-900/30",
		borderColor: "hover:border-green-500",
	},
	{
		id: "feature-4",
		title: "DeFi Protocol Integration",
		description:
			"Practice with simulated integrations of real DeFi protocols to understand complex trading scenarios.",
		icon: <Network className="h-6 w-6 text-amber-400" />,
		bgColor: "bg-amber-900/30",
		borderColor: "hover:border-amber-500",
	},
];

export const benefits: Benefit[] = [
	{
		id: "benefit-1",
		title: "Authenticity",
		description: "Learn with real-world data and scenarios.",
		icon: <CheckCircle className="h-6 w-6 text-green-400" />,
		bgColor: "bg-green-900/20",
	},
	{
		id: "benefit-2",
		title: "Interoperability",
		description:
			"Skills and credentials that can be recognized across the crypto ecosystem.",
		icon: <Link className="h-6 w-6 text-blue-400" />,
		bgColor: "bg-blue-900/20",
	},
	{
		id: "benefit-3",
		title: "Community",
		description:
			"Participate in a decentralized learning community governed by its members.",
		icon: <Users className="h-6 w-6 text-purple-400" />,
		bgColor: "bg-purple-900/20",
	},
	{
		id: "benefit-4",
		title: "Ownership",
		description: "True ownership of your educational achievements and rewards.",
		icon: <Key className="h-6 w-6 text-amber-400" />,
		bgColor: "bg-amber-900/20",
	},
	{
		id: "benefit-5",
		title: "Innovation",
		description:
			"Stay at the forefront of blockchain technology and its applications in finance.",
		icon: <Lightbulb className="h-6 w-6 text-cyan-400" />,
		bgColor: "bg-cyan-900/20",
	},
];
