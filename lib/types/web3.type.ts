import type { ReactElement } from "react";

export interface Feature {
	id: string;
	title: string;
	description: string;
	icon: ReactElement;
	bgColor: string;
	borderColor: string;
}

export interface Benefit {
	id: string;
	title: string;
	description: string;
	icon: ReactElement;
	bgColor: string;
}
