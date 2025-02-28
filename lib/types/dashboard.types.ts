import { LucideIcon } from "lucide-react";

export interface Metric {
    title: string;
    value: string;
    description: string;
    icon: LucideIcon;
    color: string;
}

export interface Module {
    name: string;
    completed: boolean;
}

export interface LearningPath {
    title: string;
    description: string;
    progress: number;
    status: "completed" | "in-progress" | "locked";
    modules: Module[];
}

export interface Action {
    title: string;
    description: string;
    icon: LucideIcon;
    variant: "primary" | "secondary";
    href?: string;
}

export interface Challenge {
    title: string;
    description: string;
    icon: LucideIcon;
    startDate: string;
    reward: string;
    status: "active" | "upcoming" | "completed";
}