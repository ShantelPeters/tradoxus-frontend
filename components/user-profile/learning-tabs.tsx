"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"

export default function LearningTabs() {
  const [activeTab, setActiveTab] = useState("learning")

  const tabs = [
    { id: "learning", label: "Learning Progress" },
    { id: "trading", label: "Trading Performance" },
    { id: "achievements", label: "Achievements" },
  ]

  return (
    <div className="inline-flex bg-[#1a2234] rounded-md">
      {tabs.map((tab) => (
        // biome-ignore lint/a11y/useButtonType: <explanation>
<button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={cn(
            "px-4 py-2 text-sm font-medium transition-colors rounded-md",
            activeTab === tab.id ? "bg-green-900/50 text-green-400" : "text-gray-400 hover:text-gray-300",
          )}
        >
          {tab.label}
        </button>
      ))}
    </div>
  )
}

