import { type LucideIcon } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface ActionCardProps {
	title: string;
	description: string;
	icon: LucideIcon;
	variant: "primary" | "secondary";
	href?: string;
}

export function ActionCard({ 
	title, 
	description, 
	icon: Icon, 
	variant, 
	href = "#" 
}: ActionCardProps) {
	return (
		<Link href={href} className="block">
			<div
				className={cn(
					"h-full rounded-lg border overflow-hidden transition-colors",
					variant === "primary"
						? "bg-blue-600 hover:bg-blue-700 border-blue-500"
						: "bg-gray-900 hover:bg-gray-800 border-gray-800"
				)}
			>
				<div className="p-4">
					<div className="flex items-center gap-2 mb-1">
						<Icon
							className={cn(
								"h-5 w-5",
								variant === "primary" ? "text-white" : "text-blue-400"
							)}
						/>
						<span className="font-medium text-white">{title}</span>
					</div>
					<span
						className={cn(
							"text-xs",
							variant === "primary" ? "text-blue-200" : "text-gray-400"
						)}
					>
						{description}
					</span>
				</div>
			</div>
		</Link>
	);
}